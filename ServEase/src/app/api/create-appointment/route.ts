// app/api/create-appointment/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import React from 'react';

// Import your beautiful React email components
import { ClientBookingPending } from '../../emails/ClientBookingPending'; 
import { ProviderBookingNotification } from '../../emails/ProviderBookingNotification';

// --- NODEMAILER SETUP ---
// This uses your Gmail App Password to create a secure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Supabase client for secure database access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// Helper function to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
};


// The main function that runs when your booking page calls this API
export async function POST(request: Request) {
  try {
    // 1. Get data from the client
    const { providerId, clientId, date, time, services } = await request.json();

    if (!providerId || !clientId || !date || !time || !services) {
      return NextResponse.json({ error: 'Missing required booking information.' }, { status: 400 });
    }

    // 2. Securely fetch data from Supabase
    const [providerProfileRes, clientProfileRes, providerAuthRes, clientAuthRes] = await Promise.all([
      supabaseAdmin.from('profiles').select('business_name, address, contact_number').eq('id', providerId).single(),
      supabaseAdmin.from('profiles').select('full_name').eq('id', clientId).single(),
      supabaseAdmin.auth.admin.getUserById(providerId),
      supabaseAdmin.auth.admin.getUserById(clientId)
    ]);
    
    // Error handling
    if (providerProfileRes.error) throw new Error(`Provider profile fetch failed: ${providerProfileRes.error.message}`);
    if (clientProfileRes.error) throw new Error(`Client profile fetch failed: ${clientProfileRes.error.message}`);
    if (providerAuthRes.error || !providerAuthRes.data.user) throw new Error('Provider auth user not found.');
    if (clientAuthRes.error || !clientAuthRes.data.user) throw new Error('Client auth user not found.');

    const providerProfile = providerProfileRes.data;
    const clientProfile = clientProfileRes.data;
    const providerEmail = providerAuthRes.data.user.email;
    const clientEmail = clientAuthRes.data.user.email;

    if (!providerEmail || !clientEmail) {
        throw new Error('Could not retrieve email for provider or client.');
    }

    // 3. Prepare data for the database
    const serviceNames = services.map((s: { name: string }) => s.name);
    const totalPrice = services.reduce((sum: number, s: { price: number }) => sum + s.price, 0);

    // 4. Create the appointment in the database
    const { error: insertError } = await supabaseAdmin
      .from("appointments")
      .insert({
        client_id: clientId,
        provider_id: providerId,
        date: date,
        time: time,
        status: "pending",
        price: totalPrice,
        services: serviceNames,
        address: providerProfile.address,
      });

    if (insertError) {
      throw new Error(`Failed to create appointment: ${insertError.message}`);
    }

    // --- 5. SEND EMAILS USING NODEMAILER ---

     const clientEmailComponent = React.createElement(ClientBookingPending, {
        clientName: clientProfile.full_name,
        providerName: providerProfile.business_name,
        address: providerProfile.address,
        contactNumber: providerProfile.contact_number,
        date: new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        time: time,
        services: services,
        totalPrice: formatCurrency(totalPrice),
    });

    const providerEmailComponent = React.createElement(ProviderBookingNotification, {
        providerName: providerProfile.business_name,
        clientName: clientProfile.full_name,
        clientEmail: clientEmail,
        date: new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        time: time,
        services: services,
        totalPrice: formatCurrency(totalPrice),
    });

    // Now, render the elements to HTML. The `render` function will be happy with this.
    const clientEmailHtml = render(clientEmailComponent);
    const providerEmailHtml = render(providerEmailComponent);
    const providerEmailHtml = render(
        ProviderBookingNotification({
            providerName: providerProfile.business_name,
            clientName: clientProfile.full_name,
            clientEmail: clientEmail,
            date: new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            time: time,
            services: services,
            totalPrice: formatCurrency(totalPrice),
        })
    );

    // Send the two emails
    const sendClientEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: clientEmail, // Can be any email address
      subject: 'Your Booking Request is Awaiting Approval',
      html: clientEmailHtml,
    });

    const sendProviderEmailPromise = transporter.sendMail({
      from: `"Servease" <${process.env.GMAIL_EMAIL}>`,
      to: providerEmail, // Can be any email address
      subject: `New Booking Request from ${clientProfile.full_name}`,
      html: providerEmailHtml,
    });
    
    // Log the results
    Promise.allSettled([sendClientEmailPromise, sendProviderEmailPromise]).then(results => {
      console.log("Email sending results:", results);
    });

    // 6. Return a success message to the booking page
    return NextResponse.json({ success: true, message: 'Appointment request submitted. Awaiting provider confirmation.' });

  } catch (error: any) {
    console.error("Create Appointment API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
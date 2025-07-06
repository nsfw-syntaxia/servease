// app/api/create-appointment/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { ReactElement } from 'react';
// --- FIX: Corrected the import path (removed extra slash) ---
import { ClientBookingPending } from '../../emails/ClientBookingPending'; 
import { ProviderBookingNotification } from '../../emails/ProviderBookingNotification';


interface ProviderBookingNotificationProps {
  providerName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  services: { name: string; price: number }[];
}

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
};

export async function POST(request: Request) {
  try {
    const { providerId, clientId, date, time, services } = await request.json();

    if (!providerId || !clientId || !date || !time || !services) {
      return NextResponse.json({ error: 'Missing required booking information.' }, { status: 400 });
    }

    const [providerProfileRes, clientProfileRes, providerAuthRes, clientAuthRes] = await Promise.all([
      supabaseAdmin.from('profiles').select('business_name, address, contact_number').eq('id', providerId).single(),
      supabaseAdmin.from('profiles').select('full_name').eq('id', clientId).single(),
      supabaseAdmin.auth.admin.getUserById(providerId),
      supabaseAdmin.auth.admin.getUserById(clientId)
    ]);
    
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

    // --- FIX: Corrected the TypeScript type syntax ---
    const serviceNames = services.map((s: { name: string }) => s.name);
    const totalPrice = services.reduce((sum: number, s: { price: number }) => sum + s.price, 0);

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

    Promise.allSettled([
        resend.emails.send({
            from: 'servease <onboarding@resend.dev>',
            to: [clientEmail],
            subject: 'Your Booking Request is Awaiting Approval',
            react: ClientBookingPending({
                clientName: clientProfile.full_name,
                providerName: providerProfile.business_name,
                address: providerProfile.address,
                contactNumber: providerProfile.contact_number,
                date: new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                time: time,
                services: services, // The full array with name and price
                totalPrice: formatCurrency(totalPrice),
            }) as ReactElement,
        }),
        resend.emails.send({
            from: 'New Booking Request <onboarding@resend.dev>',
            to: [providerEmail],
            subject: `New Booking Request from ${clientProfile.full_name}`,
            react: ProviderBookingNotification({
                providerName: providerProfile.business_name,
                clientName: clientProfile.full_name,
                clientEmail: clientEmail,
                date: new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                time: time,
                services: services,
            } as ProviderBookingNotificationProps) as ReactElement,
        })
    ]).then(results => {
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(`Failed to send email ${index === 0 ? 'to client' : 'to provider'}:`, result.reason);
            }
        });
    });

    return NextResponse.json({ success: true, message: 'Appointment request submitted. Awaiting provider confirmation.' });

  } catch (error: any) {
    console.error("Create Appointment API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
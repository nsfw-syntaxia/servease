import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase/server'; // Using the standard server helper
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import React from 'react';

// Import your two cancellation email components
import AppointmentCancelledNotice from '../../emails/AppointmentCancelledNotice';
import ClientCancellationConfirmation from '../../emails/ClientCancellationConfirmation'; 

// Set up the Nodemailer transporter using your Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { 
      appointmentId, 
      providerName,
      clientName,
      clientEmail,
      providerEmail,
      date,
      time,
      services
    } = await req.json();

    // Validate the incoming payload
    if (!appointmentId || !providerEmail || !clientEmail || !clientName || !Array.isArray(services)) {
      return NextResponse.json({ error: 'Missing required cancellation details.' }, { status: 400 });
    }
    
    // Use the standard server client for the update operation
    const supabase = await createClient();
    
    // Update the appointment status to 'canceled' in the database
    const { error: dbError } = await supabase
      .from('appointments')
      .update({ status: 'canceled' })
      .eq('id', appointmentId);

    if (dbError) {
      console.error('Database cancellation error:', dbError);
      throw new Error(`Failed to update appointment in the database: ${dbError.message}`);
    }

    // --- Prepare both emails using React.createElement and render ---

    // 1. Prepare the email for the PROVIDER
    const providerEmailComponent = React.createElement(AppointmentCancelledNotice, {
      providerName,
      clientName,
      date,
      time,
      services,
    });
    
    // 2. Prepare the email for the CLIENT
    const clientEmailComponent = React.createElement(ClientCancellationConfirmation, {
      clientName,
      providerName,
      date,
      time,
      services,
    });
    
    // Render both components to HTML strings
    const providerEmailHtml = await render(providerEmailComponent);
    const clientEmailHtml = await render(clientEmailComponent);

    // --- Send both emails in parallel ---

    const sendProviderEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: providerEmail,
      subject: `Appointment Cancellation: ${clientName}`,
      html: providerEmailHtml,
    });
    
    const sendClientEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: clientEmail,
      subject: 'Your Appointment Cancellation Confirmation',
      html: clientEmailHtml,
    });

    // Use Promise.allSettled to ensure both emails attempt to send, even if one fails.
    Promise.allSettled([sendProviderEmailPromise, sendClientEmailPromise]).then(results => {
      results.forEach((result, index) => {
        const recipient = index === 0 ? 'Provider' : 'Client';
        if (result.status === 'rejected') {
          console.error(`Failed to send cancellation email to ${recipient}:`, result.reason);
        } else {
          console.log(`Cancellation email successfully sent to ${recipient}.`);
        }
      });
    });

    return NextResponse.json({ success: true, message: 'Appointment successfully cancelled.' });

  } catch (error: any) {
    console.error("Cancellation API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
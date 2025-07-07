import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '../../lib/supabase/server'; // Adjust path
import AppointmentCancelledNotice from '../../emails/AppointmentCancelledNotice';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    // 1. Destructure 'services' from the request body
    const { 
      appointmentId, 
      providerName,
      clientName,
      providerEmail,
      date,
      time,
      services // <-- ADD THIS
    } = await req.json();

    // Add services to the validation
    if (!appointmentId || !providerEmail || !clientName || !Array.isArray(services)) {
      return NextResponse.json({ error: 'Missing required cancellation details.' }, { status: 400 });
    }

    // Database update remains the same
    const { error: dbError } = await supabase
      .from('appointments')
      .update({ status: 'canceled' })
      .eq('id', appointmentId);

    if (dbError) {
      console.error('Database cancellation error:', dbError);
      return NextResponse.json({ error: 'Failed to update appointment in the database.' }, { status: 500 });
    }

    // 2. Pass 'services' to the email component
    const { data, error: emailError } = await resend.emails.send({
      // IMPORTANT: Use a verified domain, not a public email address.
      from: 'Servease <notify@your-verified-domain.com>', 
      to: [providerEmail],
      subject: `Appointment Cancellation: ${clientName}`,
      react: AppointmentCancelledNotice({
        providerName,
        clientName,
        date,
        time,
        services, // <-- PASS THE SERVICES ARRAY
      }) as React.ReactElement,
    });

    if (emailError) {
      console.error('Resend email sending error:', emailError);
    }

    return NextResponse.json({ message: 'Appointment successfully cancelled.' }, { status: 200 });

  } catch (error) {
    console.error('Cancellation API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
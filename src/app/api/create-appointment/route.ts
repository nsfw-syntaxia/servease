// app/api/create-appointment/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";

import { ClientBookingPending } from "../../emails/ClientBookingPending";
import { ProviderBookingNotification } from "../../emails/ProviderBookingNotification";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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
    const {
      providerId,
      clientId,
      date,
      time,
      services,
      providerName,
      providerAddress,
      providerContact,
      clientName,
    } = await request.json();

    if (
      !providerId ||
      !clientId ||
      !date ||
      !time ||
      !services ||
      !providerName ||
      !clientName
    ) {
      return NextResponse.json(
        { error: "Missing required booking information from the payload." },
        { status: 400 }
      );
    }

    const [providerAuthRes, clientAuthRes] = await Promise.all([
      supabaseAdmin.auth.admin.getUserById(providerId),
      supabaseAdmin.auth.admin.getUserById(clientId),
    ]);

    if (providerAuthRes.error || !providerAuthRes.data.user)
      throw new Error("Provider auth user not found.");
    if (clientAuthRes.error || !clientAuthRes.data.user)
      throw new Error("Client auth user not found.");

    const providerEmail = providerAuthRes.data.user.email;
    const clientEmail = clientAuthRes.data.user.email;

    if (!providerEmail || !clientEmail) {
      throw new Error("Could not retrieve email for provider or client.");
    }

    const serviceNames = services.map((s: { name: string }) => s.name);
    const totalPrice = services.reduce(
      (sum: number, s: { price: number }) => sum + s.price,
      0
    );

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
        address: providerAddress,
      });

    if (insertError) {
      throw new Error(`Failed to create appointment: ${insertError.message}`);
    }

    const clientEmailComponent = React.createElement(ClientBookingPending, {
      clientName: clientName,
      providerName: providerName,
      address: providerAddress,
      contactNumber: providerContact,
      date: new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: time,
      services: services,
      totalPrice: formatCurrency(totalPrice),
    });

    const providerEmailComponent = React.createElement(
      ProviderBookingNotification,
      {
        providerName: providerName,
        clientName: clientName,
        clientEmail: clientEmail,
        date: new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        time: time,
        services: services,
        totalPrice: formatCurrency(totalPrice),
      }
    );

    const clientEmailHtml = await render(clientEmailComponent);
    const providerEmailHtml = await render(providerEmailComponent);

    const sendClientEmailPromise = transporter.sendMail({
      from: `servease" <${process.env.GMAIL_EMAIL}>`,
      to: clientEmail,
      subject: "Your Booking Request is Awaiting Approval",
      html: clientEmailHtml,
    });

    const sendProviderEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: providerEmail,
      subject: `New Booking Request from ${clientName}`,
      html: providerEmailHtml,
    });

    Promise.allSettled([sendClientEmailPromise, sendProviderEmailPromise]).then(
      (results) => {
        console.log("Email sending results:", results);
      }
    );

    return NextResponse.json({
      success: true,
      message: "Appointment request submitted. Awaiting provider confirmation.",
    });
  } catch (error: any) {
    console.error("Create Appointment API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

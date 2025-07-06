// app/api/confirm-appointment/route.ts
import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { ReactElement } from "react";
import { ClientBookingConfirmation } from "../../../emails/ClientBookingConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in." },
        { status: 401 }
      );
    }

    const { appointmentId } = await request.json();
    if (!appointmentId) {
      return NextResponse.json(
        { error: "Appointment ID is required." },
        { status: 400 }
      );
    }

    // 1. Fetch the appointment to confirm
    const { data: appointment, error: fetchError } = await supabaseAdmin
      .from("appointments")
      .select(
        `*, client:client_id(full_name), provider:provider_id(business_name)`
      )
      .eq("id", appointmentId)
      .single();

    if (fetchError || !appointment) {
      throw new Error("Appointment not found.");
    }

    // 2. SECURITY CHECK: Ensure the logged-in user is the provider for this appointment
    if (appointment.provider_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You are not the provider for this appointment." },
        { status: 403 }
      );
    }

    if (appointment.status !== "pending") {
      return NextResponse.json(
        { error: `Appointment is already ${appointment.status}.` },
        { status: 400 }
      );
    }

    // 3. Update the appointment status to 'confirmed'
    const { error: updateError } = await supabaseAdmin
      .from("appointments")
      .update({ status: "confirmed" })
      .eq("id", appointmentId);

    if (updateError) {
      throw new Error("Failed to update appointment status.");
    }

    // 4. Fetch the client's email securely
    const { data: clientAuthData, error: clientAuthError } =
      await supabaseAdmin.auth.admin.getUserById(appointment.client_id);
    if (clientAuthError || !clientAuthData.user.email) {
      throw new Error("Could not retrieve client email.");
    }
    const clientEmail = clientAuthData.user.email;

    // 5. Send the FINAL confirmation email to the client
    await resend.emails.send({
      from: "Booking Confirmed <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Your Appointment is Confirmed!",
      react: ClientBookingConfirmation({
        clientName: appointment.client.full_name,
        providerName: appointment.provider.business_name,
        date: new Date(appointment.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        time: appointment.time,
        // The 'services' array now only contains names, so we map it for the email
        services: appointment.services.map((name: string) => ({
          name,
          price: 0,
        })), // Price is not stored, adjust if needed
        totalPrice: formatCurrency(appointment.price),
        address: appointment.address,
      }) as ReactElement,
    });

    return NextResponse.json({
      success: true,
      message: "Appointment confirmed successfully.",
    });
  } catch (error: any) {
    console.error("Confirm Appointment API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

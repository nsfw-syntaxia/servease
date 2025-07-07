// app/api/send-booking-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
//import { ClientBookingConfirmation } from "../../emails/ClientBookingConfirmation";
import { ProviderBookingNotification } from "../../emails/ProviderBookingNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientEmail,
      providerEmail,
      clientName,
      providerName,
      date,
      time,
      services,
      totalPrice,
      address,
    } = body;

    if (!clientEmail || !providerEmail) {
      return NextResponse.json(
        { error: "Client or Provider email is missing." },
        { status: 400 }
      );
    }

    // --- Send Email to Client ---
    await resend.emails.send({
      from: "Booking Confirmation <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Your Appointment is Confirmed!",
      react: ClientBookingConfirmation({
        clientName,
        providerName,
        date,
        time,
        services,
        totalPrice,
        address,
      }),
    });

    // --- Send Email to Provider ---
    await resend.emails.send({
      from: "New Booking Notification <onboarding@resend.dev>",
      to: [providerEmail],
      subject: `New Booking from ${clientName} on ${date}`,
      react: ProviderBookingNotification({
        providerName,
        clientName,
        clientEmail,
        date,
        time,
        services,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    // We return success even if emails fail, not to block the user flow.
    // The booking is already made. This is a non-critical error for the user.
    // In a real-world app, you'd log this error to a monitoring service.
    return NextResponse.json(
      { error: "Failed to send emails." },
      { status: 500 }
    );
  }
}

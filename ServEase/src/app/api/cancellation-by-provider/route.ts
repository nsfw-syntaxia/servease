import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { ProviderCancellationNoticeToClient } from "../../emails/CancellationFromProvider";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Basic validation
    if (!payload.clientEmail) {
      return NextResponse.json(
        { error: "Missing client email address." },
        { status: 400 }
      );
    }

    // Also validate that the status is present
    if (!payload.status) {
      return NextResponse.json(
        { error: "Missing appointment status for email subject." },
        { status: 400 }
      );
    }

    // --- THIS IS THE FIX ---
    // Create the dynamic subject line using the status from the payload
    const emailSubject = `ServEase Appointment Update: ${payload.status}`;
    // -----------------------

    // CHANGE: Render the new email template
    const clientEmailHtml = await render(
      React.createElement(ProviderCancellationNoticeToClient, payload)
    );

    // CHANGE: Send only ONE email to the client
    await transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: payload.clientEmail,
      subject: emailSubject,
      html: clientEmailHtml,
    });

    console.log(`Provider cancellation email successfully sent to client.`);
    return NextResponse.json({
      success: true,
      message: "Provider cancellation email sent.",
    });
  } catch (error: any) {
    console.error("Provider Cancel Email API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to send cancellation notification." },
      { status: 500 }
    );
  }
}

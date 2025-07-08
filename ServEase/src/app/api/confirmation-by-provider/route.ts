import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { ConfirmationFromProvider } from "../../emails/ConfirmationFromProvider"; // Adjust path if needed

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

    if (!payload.clientEmail || !payload.status) {
      return NextResponse.json(
        { error: "Missing required payload data for email." },
        { status: 400 }
      );
    }

    const emailSubject = `ServEase Appointment Update: ${payload.status}`;

    // --- THIS IS THE FIX ---
    // We must 'await' the result of the async render function.
    const clientEmailHtml = await render(
      React.createElement(ConfirmationFromProvider, payload)
    );

    await transporter.sendMail({
      from: `"ServEase" <${process.env.GMAIL_EMAIL}>`,
      to: payload.clientEmail,
      subject: emailSubject,
      html: clientEmailHtml, // This is now a string, not a Promise<string>
    });

    console.log(`Provider confirmation email successfully sent to client.`);
    return NextResponse.json({
      success: true,
      message: "Provider confirmation email sent.",
    });
  } catch (error: any) {
    console.error("Provider Confirm Email API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to send confirmation notification." },
      { status: 500 }
    );
  }
}

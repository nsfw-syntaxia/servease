import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { CancellationNoticeToProvider } from "../../emails/CancellationNoticeToProvider";
import { CancellationConfirmationToClient } from "../../emails/CancellationConfirmationToClient";

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
    if (!payload.clientEmail || !payload.providerEmail) {
      return NextResponse.json(
        { error: "Missing recipient email addresses." },
        { status: 400 }
      );
    }

    // Render both email templates with the rich payload data
    const providerEmailHtml = await render(
      React.createElement(CancellationNoticeToProvider, payload)
    );
    const clientEmailHtml = await render(
      React.createElement(CancellationConfirmationToClient, payload)
    );

    // Send emails in parallel
    const sendProviderEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: payload.providerEmail,
      subject: `Appointment Cancellation: ${payload.clientName}`,
      html: providerEmailHtml,
    });

    const sendClientEmailPromise = transporter.sendMail({
      from: `"servease" <${process.env.GMAIL_EMAIL}>`,
      to: payload.clientEmail,
      subject: "ServEase Appointment Cancellation",
      html: clientEmailHtml,
    });

    // Use Promise.allSettled to ensure both emails attempt to send.
    Promise.allSettled([sendProviderEmailPromise, sendClientEmailPromise]).then(
      (results) => {
        results.forEach((result, index) => {
          const recipient = index === 0 ? "Provider" : "Client";
          if (result.status === "rejected") {
            console.error(
              `Failed to send cancellation email to ${recipient}:`,
              result.reason
            );
          } else {
            console.log(
              `Cancellation email successfully sent to ${recipient}.`
            );
          }
        });
      }
    );

    return NextResponse.json({
      success: true,
      message: "Cancellation emails are being sent.",
    });
  } catch (error: any) {
    console.error("Cancel Email API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to process email notifications." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { RegistrationSuccessClient } from "../../emails/RegistrationSuccessClient";
// Import other email components here as needed, e.g.:
// import { ProviderRegistrationSuccess } from "../../emails/ProviderRegistrationSuccess";

// --- CRITICAL FIX 1: Force Node.js Runtime ---
// This ensures nodemailer has the necessary environment and prevents crashes.
export const dynamic = "force-dynamic";

// --- CRITICAL FIX 2: Use Port 587 to avoid ETIMEDOUT errors ---
// This configuration is more reliable on serverless platforms than 'service: "gmail"'.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    // This payload contains the type of email to send and the data for it.
    const { emailType, data } = await req.json();

    if (!emailType || !data) {
      return NextResponse.json(
        { error: "Missing required payload data (emailType or data)." },
        { status: 400 }
      );
    }

    let mailOptions: nodemailer.SendMailOptions;

    // Use a switch to handle different email types flexibly
    switch (emailType) {
      case "clientRegistration": {
        const { clientEmail, clientName } = data;
        if (!clientEmail || !clientName) {
          return NextResponse.json(
            {
              error: "Missing clientEmail or clientName for clientRegistration",
            },
            { status: 400 }
          );
        }

        // Render the correct email component with its data
        const emailHtml = await render(
          React.createElement(RegistrationSuccessClient, { clientName })
        );

        // Set up the specific options for this email
        mailOptions = {
          from: `"ServEase" <${process.env.GMAIL_EMAIL}>`,
          to: clientEmail,
          subject: "Welcome to ServEase!",
          html: emailHtml,
        };
        break;
      }

      // You can add more cases for other emails here later
      // case "providerRegistration": { ... }

      default:
        console.error(`Unknown email type requested: ${emailType}`);
        return NextResponse.json(
          { error: `Unknown email type: ${emailType}` },
          { status: 400 }
        );
    }

    // Send the email using the options configured in the switch block
    await transporter.sendMail(mailOptions);

    console.log(`Email for type '${emailType}' sent successfully.`);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error: any) {
    console.error("Transactional Email API Error:", error.message, error.stack);
    // This will now correctly return a JSON error instead of an HTML page
    return NextResponse.json(
      { error: "Failed to send email notification." },
      { status: 500 }
    );
  }
}

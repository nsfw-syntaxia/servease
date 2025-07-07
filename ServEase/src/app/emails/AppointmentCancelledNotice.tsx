import * as React from "react";

interface AppointmentCancelledNoticeProps {
  providerName: string;
  clientName: string;
  date: string;
  time: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Consistent color palette from your globals
const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",
  textSecondary: "#241f1b",
  textMuted: "#a9a9a9",
  brandPrimary: "#a68465",
  border: "#d9d9d8",
  alert: "#D93025", // A red color for attention-grabbing cancellations
};

// Consistent font settings
const fonts = {
  fontFamily: "'DM Sans', 'Helvetica Neue', 'Arial', sans-serif",
};

// Helper functions to make date and time more readable
const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00"); // Avoid timezone issues
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
};

const formatDisplayTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
};

export const AppointmentCancelledNotice: React.FC<Readonly<AppointmentCancelledNoticeProps>> = ({
  providerName,
  clientName,
  date,
  time,
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>Appointment Cancellation</title>
    </head>
    <body style={{ fontFamily: fonts.fontFamily, backgroundColor: colors.emailBackground, margin: 0, padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: colors.cardBackground, borderRadius: "12px", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
        
        <div style={{ padding: "24px", textAlign: "center", borderBottom: `1px solid ${colors.border}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${baseUrl}/servease-logo.png`} alt="Servease Logo" style={{ maxWidth: "150px", height: "auto" }} />
        </div>

        <div style={{ padding: "30px 40px" }}>
          <h1 style={{ color: colors.alert, fontSize: "24px", fontWeight: 700, margin: "0 0 15px" }}>
            Appointment Cancelled
          </h1>
          <p style={{ color: colors.textSecondary, fontSize: "16px", margin: "0 0 10px", fontWeight: 500 }}>
            Hello {providerName},
          </p>
          <p style={{ color: colors.textSecondary, fontSize: "16px", lineHeight: "1.6", fontWeight: 400 }}>
            This is an automated notification to inform you that an appointment has been cancelled by the client. Your schedule for this time has now been cleared.
          </p>

          <div style={{ marginTop: "30px", padding: "20px", border: `1px solid ${colors.border}`, borderRadius: '8px', backgroundColor: colors.emailBackground }}>
            <h2 style={{ color: colors.textPrimary, fontSize: "18px", fontWeight: 700, margin: "0 0 15px" }}>
              Cancellation Details
            </h2>
            <p style={{ color: colors.textSecondary, fontSize: "16px", margin: "5px 0", fontWeight: 400 }}>
              <strong>Client:</strong> {clientName}
            </p>
            <p style={{ color: colors.textSecondary, fontSize: "16px", margin: "5px 0", fontWeight: 400 }}>
              <strong>Date:</strong> {formatDisplayDate(date)}
            </p>
            <p style={{ color: colors.textSecondary, fontSize: "16px", margin: "5px 0", fontWeight: 400 }}>
              <strong>Time:</strong> {formatDisplayTime(time)}
            </p>
          </div>

          <p style={{ color: colors.textSecondary, fontSize: "16px", lineHeight: "1.6", marginTop: "30px", fontWeight: 400 }}>
            No further action is required from you.
            <br /><br />
            Sincerely,<br />
            The <span style={{ color: colors.brandPrimary, fontWeight: 700 }}>Servease</span> Team
          </p>
        </div>

        <div style={{ backgroundColor: colors.emailBackground, padding: "20px 40px", borderTop: `1px solid ${colors.border}`, textAlign: "center" }}>
          <p style={{ color: colors.textMuted, fontSize: "12px", margin: 0, fontWeight: 400 }}>
            © {new Date().getFullYear()} <span style={{ color: colors.brandPrimary }}>Servease</span>. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
);

export default AppointmentCancelledNotice;
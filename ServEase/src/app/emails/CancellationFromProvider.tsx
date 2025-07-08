import * as React from "react";

// --- CHANGE 1: Add 'status' to the props ---
interface ProviderCancellationNoticeToClientProps {
  clientName: string;
  providerName: string;
  date: string;
  time: string;
  services: { name: string }[];
  status: string; // The status of the appointment, e.g., "Cancelled"
}

const formatDisplayDate = (dateString: string) =>
  new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const formatDisplayTime = (timeString: string) => {
  const [h, m] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(h), parseInt(m));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ProviderCancellationNoticeToClient: React.FC<
  Readonly<ProviderCancellationNoticeToClientProps>
> = ({ clientName, providerName, date, time, services, status }) => {
  // <-- Destructure `status` here
  const serviceListString = services.map((s) => s.name).join(", ");

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
        </style>
        <title>Appointment Cancellation</title>
      </head>
      <body style={styles.body}>
        <div style={styles.mainContainer}>
          <div style={styles.header}>
            <a href={baseUrl} target="_blank" style={styles.link}>
              <div style={styles.logo}>
                <span style={{ fontWeight: 500 }}>serv</span>
                <span style={{ fontWeight: 700 }}>ease</span>
              </div>
            </a>
          </div>

          <div style={styles.content}>
            <h1 style={styles.h1}>Appointment Canceled!</h1>
            <p style={styles.paragraph}>Hi {clientName},</p>
            <p style={styles.paragraph}>
              We regret to inform you that <strong>{providerName}</strong> has
              had to cancel your booked appointment. We sincerely apologize for
              any inconvenience this may cause.
            </p>

            <div style={styles.summarySection}>
              <h2 style={styles.h2}>Appointment Summary</h2>
              <table
                style={styles.detailsTable}
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableLabel}>Service Provider</td>
                    <td style={styles.tableValue}>{providerName}</td>
                  </tr>
                  {/* --- CHANGE 2: Add the new Status row --- */}
                  <tr style={styles.tableRow}>
                    <td style={styles.tableLabel}>Status</td>
                    <td
                      style={{
                        ...styles.tableValue,
                        ...styles.statusCancelled,
                      }}
                    >
                      {status}
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableLabel}>Date</td>
                    <td style={styles.tableValue}>{formatDisplayDate(date)}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableLabel}>Time</td>
                    <td style={styles.tableValue}>{formatDisplayTime(time)}</td>
                  </tr>
                  <tr style={{ ...styles.tableRow, borderBottom: "none" }}>
                    <td style={styles.tableLabel}>Services</td>
                    <td style={styles.tableValue}>{serviceListString}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={styles.paragraph}>
              If you would like to find another provider, please visit our
              platform.
            </p>
            <a href={baseUrl} target="_blank" style={styles.button}>
              Browse Services
            </a>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              © {new Date().getFullYear()} ServEase. All rights reserved.
              <br />
              This is an automated notification. Please do not reply.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

// --- STYLES OBJECT ---
const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",
  textSecondary: "#241f1b",
  brandPrimary: "#a68465",
  border: "#e0d9c9",
  alert: "#D93025", // Red color for cancellations
};

const fonts = {
  fontFamily: "'DM Sans', 'Helvetica Neue', 'Arial', sans-serif",
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    fontFamily: fonts.fontFamily,
    backgroundColor: colors.emailBackground,
    margin: 0,
    padding: "40px 20px",
  },
  mainContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: colors.cardBackground,
    borderRadius: "12px",
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
  },
  header: {
    padding: "24px",
    borderBottom: `1px solid ${colors.border}`,
  },
  link: { textDecoration: "none" },
  logo: {
    color: colors.brandPrimary,
    fontSize: "32px",
    textAlign: "center",
    letterSpacing: "-0.5px",
    margin: "10px 0",
  },
  content: {
    padding: "30px 40px",
  },
  h1: {
    color: colors.textPrimary,
    fontSize: "24px",
    fontWeight: 600,
    margin: "0 0 20px",
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: "16px",
    lineHeight: 1.7,
    margin: "0 0 20px",
  },
  summarySection: {
    padding: "20px",
    marginTop: "25px",
    marginBottom: "30px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    backgroundColor: colors.emailBackground,
  },
  h2: {
    color: colors.textPrimary,
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 15px",
  },
  detailsTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    borderBottom: `1px solid ${colors.border}`,
  },
  tableLabel: {
    color: colors.textSecondary,
    fontWeight: 500,
    padding: "12px 10px 12px 0",
    textAlign: "left",
    width: "100px",
  },
  tableValue: {
    color: colors.textPrimary,
    fontWeight: 400,
    padding: "12px 0 12px 10px",
    textAlign: "left",
  },
  // --- CHANGE 3: Add the new style for the red text ---
  statusCancelled: {
    color: colors.alert,
    fontWeight: 600,
  },
  button: {
    display: "inline-block",
    backgroundColor: colors.brandPrimary,
    color: "#ffffff",
    padding: "12px 25px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "16px",
    textAlign: "center",
    marginTop: "5px",
  },
  footer: {
    backgroundColor: "#fff",
    padding: "20px 40px",
    borderTop: `1px solid ${colors.border}`,
  },
  footerText: {
    color: "#a9a9a9",
    fontSize: "12px",
    margin: 0,
    textAlign: "center",
    lineHeight: 1.5,
  },
};

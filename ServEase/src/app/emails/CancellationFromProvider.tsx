import * as React from "react";

interface ProviderCancellationNoticeToClientProps {
  clientName: string;
  providerName: string;
  date: string;
  time: string;
  status: string;
  services: { name: string; price: number }[];
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
> = ({ clientName, providerName, date, time, status, services }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>Cancellation Confirmed</title>
    </head>
    <body style={styles.body}>
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <a href={baseUrl} target="_blank" style={styles.link}>
            <div style={styles.logo}>
              <span style={{ fontWeight: 500 }}>serv</span>
              <span style={{ fontWeight: 600 }}>ease</span>
            </div>
          </a>
        </div>

        <div style={styles.content}>
          <h1 style={styles.h1}>Appointment Cancellation Notice</h1>
          <p style={styles.paragraph}>Hello {clientName},</p>
          <p style={styles.paragraph}>
            We regret to inform you that <strong>{providerName}</strong> has had
            to cancel your upcoming appointment. We apologize for any
            inconvenience this may cause.
          </p>
          <p style={styles.paragraph}>
            You can browse for other available services on our platform.
          </p>

          <div style={styles.summarySection}>
            <h2 style={styles.h2}>Cancelled Appointment Details</h2>

            <div style={{ marginBottom: "20px" }}>
              <DetailRow
                label="Status: "
                value={status}
                valueColor={colors.alert}
              />
              <DetailRow label="Date: " value={formatDisplayDate(date)} />
              <DetailRow label="Time: " value={formatDisplayTime(time)} />
            </div>

            <div style={styles.divider} />

            {services.map((service, index) => (
              <div key={index} style={styles.serviceRow}>
                <span style={styles.serviceName}>{service.name}:</span>
                <span style={styles.servicePrice}>{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} servease. All rights reserved.
          </p>
          <p style={styles.footerText}>
            This is an automated notification. Please do not reply to this
            email.
          </p>
        </div>
      </div>
    </body>
  </html>
);

const DetailRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      fontSize: "16px",
    }}
  >
    <span
      style={{
        color: "#604c3d",
        fontWeight: 500,
        paddingRight: "16px",
      }}
    >
      {label}
    </span>
    <span
      style={{
        color: valueColor || "#050b20",
        fontWeight: 400,
        textAlign: "right",
      }}
    >
      {value}
    </span>
  </div>
);

const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",
  textSecondary: "#241f1b",
  textMuted: "#a9a9a9",
  brandPrimary: "#a68465",
  border: "#e0d9c9",
  alert: "#D93025",
};

const fonts = {
  fontFamily: "'DM Sans', 'Helvetica Neue', 'Arial', sans-serif",
};

const styles = {
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
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
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
    textAlign: "center" as const,
    letterSpacing: "-0.5px",
    margin: "10px 0",
  },
  content: {
    padding: "40px",
  },
  h1: {
    color: colors.textPrimary,
    fontSize: "24px",
    fontWeight: 600,
    margin: "0 0 24px",
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: "16px",
    lineHeight: 1.6,
    fontWeight: 400,
    margin: "0 0 16px",
  },
  summarySection: {
    paddingTop: "24px",
    borderTop: `1.5px solid ${colors.border}`,
  },
  h2: {
    color: colors.textPrimary,
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 24px",
  },
  divider: {
    height: "1px",
    backgroundColor: colors.border,
    margin: "24px 0",
  },
  h3: {
    color: colors.textPrimary,
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 20px",
  },
  serviceRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "16px",
  },
  serviceName: {
    color: colors.textSecondary,
    paddingRight: "20px",
  },
  servicePrice: {
    color: colors.textPrimary,
    fontWeight: 400,
    whiteSpace: "nowrap" as const,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: `1.5px solid ${colors.border}`,
  },
  totalLabel: {
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: "20px",
    paddingRight: "20px",
  },
  totalPrice: {
    color: colors.brandPrimary,
    fontWeight: 500,
    fontSize: "20px",
    whiteSpace: "nowrap" as const,
  },
  footer: {
    backgroundColor: colors.emailBackground,
    padding: "20px 40px",
    borderTop: `1.5px solid ${colors.border}`,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: "12px",
    margin: "0 0 5px 0",
    fontWeight: 400,
    textAlign: "center" as const,
  },
};

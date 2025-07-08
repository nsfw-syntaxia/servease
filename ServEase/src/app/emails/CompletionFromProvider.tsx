import * as React from "react";

interface CompletionByProviderProps {
  clientName: string;
  providerName: string;
  date: string;
  time: string;
  services: { name: string; price: number }[];
  totalPrice: number;
}

const formatDisplayDate = (dateString: string) =>
  new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    amount
  );

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CompletionFromProvider: React.FC<
  Readonly<CompletionByProviderProps>
> = ({ clientName, providerName, date, services, totalPrice }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>Appointment Completed</title>
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
          <h1 style={styles.h1}>Appointment Completed!</h1>
          <p style={styles.paragraph}>Hi {clientName},</p>
          <p style={styles.paragraph}>
            Thank you for your visit! Your appointment with{" "}
            <strong>{providerName}</strong> on {formatDisplayDate(date)} is now
            complete. We hope you had a great experience.
          </p>

          <div style={styles.summarySection}>
            <h2 style={styles.h2}>Service Summary</h2>
            <table style={styles.detailsTable} cellPadding="0" cellSpacing="0">
              <tbody>
                {/* Services List */}
                {services.map((service, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.serviceNameCell}>{service.name}</td>
                    <td style={styles.servicePriceCell}>
                      {formatCurrency(service.price)}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr style={styles.totalRow}>
                  <td style={styles.totalLabel}>Total Paid</td>
                  <td style={styles.totalPrice}>
                    {formatCurrency(totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={styles.paragraph}>
            We value your feedback. Please take a moment to review your
            experience with <strong>{providerName}</strong>.
          </p>
          <a href={baseUrl} target="_blank" style={styles.button}>
            Leave a Review
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

// --- STYLES OBJECT ---
const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",
  textSecondary: "#241f1b",
  brandPrimary: "#a68465",
  border: "#e0d9c9",
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
  serviceNameCell: {
    color: colors.textPrimary,
    fontWeight: 400,
    padding: "12px 10px 12px 0",
    textAlign: "left",
    width: "100px",
  },
  servicePriceCell: {
    color: colors.textPrimary,
    fontWeight: 400,
    padding: "12px 0 12px 10px",
    textAlign: "right",
  },
  totalRow: {
    border: "none",
    borderTop: `1.5px solid ${colors.border}`,
  },
  totalLabel: {
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: "16px",
    padding: "15px 10px 0 0",
    textAlign: "left",
    width: "100px",
  },
  totalPrice: {
    color: colors.brandPrimary,
    fontWeight: 700,
    fontSize: "18px",
    padding: "15px 0 0 10px",
    textAlign: "right",
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

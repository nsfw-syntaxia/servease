import * as React from "react";

interface RegistrationSuccessClientProps {
  clientName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const RegistrationSuccessClient: React.FC<
  Readonly<RegistrationSuccessClientProps>
> = ({ clientName }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>Welcome to ServEase!</title>
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
          <h1 style={styles.h1}>Welcome to ServEase!</h1>
          <p style={styles.paragraph}>Hi {clientName},</p>
          <p style={styles.paragraph}>
            Thank you for joining ServEase! Your account has been successfully
            created. We are excited to help you find and book the best services
            with ease.
          </p>
          <p style={styles.paragraph}>
            You can now explore your dashboard to manage your profile and start
            booking appointments.
          </p>

          <a
            href={`${baseUrl}/client-dashboard`}
            target="_blank"
            style={styles.button}
          >
            Go to My Dashboard
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

// --- STYLES OBJECT (Standardized) ---
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

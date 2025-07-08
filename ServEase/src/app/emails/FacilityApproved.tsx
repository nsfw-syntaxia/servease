import * as React from "react";

interface FacilityApprovedProps {
  facilityName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const FacilityApproved: React.FC<Readonly<FacilityApprovedProps>> = ({
  facilityName,
}) => (
  <div style={styles.body}>
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
        <h1 style={styles.h1}>You are Now Verified, {facilityName}!</h1>
        <p style={styles.paragraph}>
          Congratulations! Your account on ServEase has been officially
          verified. A verified badge is now visible on your profile to build
          trust with clients and showcase your credibility.
        </p>
        <p style={styles.paragraph}>
          Verified profiles stand out and are more likely to be booked. Head
          over to your dashboard to check it out or make updates to your
          profile.
        </p>

        <a
          href={`${baseUrl}/provider-dashboard`}
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
  </div>
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

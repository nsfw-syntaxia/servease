import * as React from 'react';

// The props are the same as the client's email
interface EmailProps {
  clientName: string;
  providerName: string;
  providerContact: string;
  address: string;
  date: string;
  time: string;
  status: string;
  services: { name: string; price: number }[];
  totalPrice: number;
}

// Re-use the same helper functions
const formatDisplayDate = (dateString: string) => new Date(dateString + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
const formatDisplayTime = (timeString: string) => {
    const [h, m] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(h), parseInt(m));
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};
const formatCurrency = (amount: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CancellationNoticeToProvider: React.FC<Readonly<EmailProps>> = (props) => (
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
                <a href={baseUrl} target="_blank" style={styles.link}><div style={styles.logo}>servease</div></a>
            </div>
            <div style={styles.content}>
                <h1 style={styles.h1}>Appointment Cancellation Notice</h1>
                <p style={styles.paragraph}>Hello {props.providerName},</p>
                <p style={styles.paragraph}>A client has cancelled their appointment with you. Your schedule for this time has been cleared. Below are the details of the cancellation.</p>
                
                <div style={styles.summarySection}>
                    <h2 style={styles.h2}>Cancelled Appointment Summary</h2>
                    <DetailRow label="Client Name:" value={props.clientName} />
                    <DetailRow label="Status:" value={props.status} valueColor={colors.alert} />
                    <DetailRow label="Date:" value={formatDisplayDate(props.date)} />
                    <DetailRow label="Time:" value={formatDisplayTime(props.time)} />
                    
                    <div style={styles.divider} />

                    <h3 style={styles.h3}>Cancelled Services</h3>
                    {props.services.map((service) => (
                      <div key={service.name} style={styles.serviceRow}>
                        <span>{service.name}</span>
                        <span>{formatCurrency(service.price)}</span>
                      </div>
                    ))}
                    <div style={styles.totalRow}>
                      <span style={styles.totalLabel}>Total Value</span>
                      <span>{formatCurrency(props.totalPrice)}</span>
                    </div>
                </div>
            </div>
            <div style={styles.footer}>
                <p style={styles.footerText}>© {new Date().getFullYear()} <a href={baseUrl} target="_blank" style={styles.footerLink}>servease</a>. All rights reserved.</p>
            </div>
        </div>
    </body>
  </html>
);

// Helper and Style objects
const DetailRow = ({ label, value, valueColor }: { label: string; value: string, valueColor?: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "14px", borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ color: "#666", fontWeight: 500, paddingRight: "16px" }}>{label}</span>
        <span style={{ color: valueColor || "#333", fontWeight: 400, textAlign: "right" }}>{value}</span>
    </div>
);
const colors = { emailBackground: "#f4f4f4", cardBackground: "#ffffff", textPrimary: "#333333", textSecondary: "#555555", brandPrimary: "#a68465", border: "#eeeeee", alert: '#D93025' };
const styles = {
    body: { fontFamily: "'DM Sans', sans-serif", backgroundColor: colors.emailBackground, margin: 0, padding: "20px" },
    mainContainer: { maxWidth: "600px", margin: "0 auto", backgroundColor: colors.cardBackground, borderRadius: "8px", border: `1px solid ${colors.border}`, overflow: "hidden" },
    header: { padding: "20px", borderBottom: `1px solid ${colors.border}`, backgroundColor: '#fafafa' },
    link: { textDecoration: 'none' },
    logo: { color: colors.brandPrimary, fontSize: "24px", fontWeight: 'bold', textAlign: "center" as const },
    content: { padding: "20px 30px 40px" },
    h1: { color: colors.textPrimary, fontSize: "22px", margin: "0 0 16px" },
    h2: { color: colors.textPrimary, fontSize: "18px", margin: "0 0 16px", borderBottom: `2px solid ${colors.brandPrimary}`, paddingBottom: '8px' },
    h3: { color: colors.textPrimary, fontSize: "16px", fontWeight: 'bold', margin: "0 0 12px" },
    paragraph: { color: colors.textSecondary, fontSize: "16px", lineHeight: 1.6, margin: "0 0 16px" },
    summarySection: { marginTop: '24px' },
    divider: { height: "1px", backgroundColor: colors.border, margin: "24px 0" },
    serviceRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: colors.textSecondary },
    totalRow: { display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${colors.border}`, fontSize: '18px', fontWeight: 'bold', color: colors.textPrimary },
    totalLabel: {},
    footer: { backgroundColor: '#fafafa', padding: "20px", borderTop: `1px solid ${colors.border}`, textAlign: "center" as const },
    footerText: { color: "#999999", fontSize: "12px", margin: 0 },
    footerLink: { color: colors.brandPrimary, textDecoration: 'none' },
};
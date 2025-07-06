// emails/ProviderBookingNotification.tsx
import * as React from "react";

// --- UPDATED to accept totalPrice ---
interface ProviderBookingNotificationProps {
  providerName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  services: { name: string; price: number }[];
  totalPrice: string;
}

// Reusing the same color and font styles for consistency
const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",
  textSecondary: "#241f1b",
  textLabel: "#604c3d",
  textMuted: "#a9a9a9",
  brandPrimary: "#a68465",
  border: "#e0d9c9",
};

const fonts = {
  fontFamily: "'DM Sans', 'Helvetica Neue', 'Arial', sans-serif",
};

// Reusing the same helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      fontSize: "16px",
    }}
  >
    <span
      style={{ color: colors.textLabel, fontWeight: 500, paddingRight: "16px" }}
    >
      {label}
    </span>
    <span
      style={{ color: colors.textPrimary, fontWeight: 400, textAlign: "right" }}
    >
      {value}
    </span>
  </div>
);

export const ProviderBookingNotification: React.FC<
  Readonly<ProviderBookingNotificationProps>
> = ({
  providerName,
  clientName,
  clientEmail,
  date,
  time,
  services,
  totalPrice,
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}</style>
      <title>New Booking Request</title>
    </head>
    <body
      style={{
        fontFamily: fonts.fontFamily,
        backgroundColor: colors.emailBackground,
        margin: 0,
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: colors.cardBackground,
          borderRadius: "12px",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "24px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              color: colors.brandPrimary,
              fontSize: "32px",
              textAlign: "center",
              letterSpacing: "-0.5px",
              margin: "10px 0",
            }}
          >
            <span style={{ fontWeight: 500 }}>serv</span>
            <span style={{ fontWeight: 600 }}>ease</span>
          </div>
        </div>

        <div style={{ padding: "40px" }}>
          <h1
            style={{
              color: colors.textPrimary,
              fontSize: "24px",
              fontWeight: 600,
              margin: "0 0 24px",
            }}
          >
            You Have a New Booking Request!
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "16px",
              margin: "0 0 16px",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Hello {providerName},
          </p>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "16px",
              lineHeight: 1.6,
              fontWeight: 400,
              margin: "0 0 32px",
            }}
          >
            A new appointment has been requested. Please review the details
            below and confirm or decline the appointment from your dashboard.
          </p>

          <div
            style={{
              paddingTop: "24px",
              borderTop: `1.5px solid ${colors.border}`,
            }}
          >
            <h2
              style={{
                color: colors.textPrimary,
                fontSize: "20px",
                fontWeight: 600,
                margin: "0 0 24px",
              }}
            >
              Appointment Details
            </h2>

            {/* Client Details */}
            <div style={{ marginBottom: "20px" }}>
              <DetailRow label="Client Name: " value={clientName} />
              <DetailRow label="Client Email: " value={clientEmail} />
              <DetailRow label="Date: " value={date} />
              <DetailRow label="Time: " value={time} />
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: colors.border,
                margin: "24px 0",
              }}
            />

            {/* Services */}
            <h3
              style={{
                color: colors.textPrimary,
                fontSize: "18px",
                fontWeight: 600,
                margin: "0 0 20px",
              }}
            >
              Service/s Requested
            </h3>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                <span
                  style={{ color: colors.textSecondary, paddingRight: "20px" }}
                >
                  {service.name}:
                </span>
                <span
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(service.price)}
                </span>
              </div>
            ))}

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: `1.5px solid ${colors.border}`,
              }}
            >
              <span
                style={{
                  color: colors.textPrimary,
                  fontWeight: 500,
                  fontSize: "20px",
                  paddingRight: "20px",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  color: colors.brandPrimary,
                  fontWeight: 500,
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                {totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.emailBackground,
            padding: "20px 40px",
            borderTop: `1.5px solid ${colors.border}`,
          }}
        >
          <p
            style={{
              color: colors.textMuted,
              fontSize: "12px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            © {new Date().getFullYear()} servease. All rights reserved.
          </p>
          <p
            style={{
              color: colors.textMuted,
              fontSize: "12px",
              margin: "5px 0 0",
              fontWeight: 400,
            }}
          >
            This is an automated notification. Please do not reply to this
            email.
          </p>
        </div>
      </div>
    </body>
  </html>
);

import * as React from "react";

interface ClientBookingPendingProps {
  clientName: string;
  providerName: string;
  address: string;
  contactNumber: string;
  date: string;
  time: string;
  services: { name: string; price: number }[];
  totalPrice: string;
}

// Define the color palette
const colors = {
  emailBackground: "#f8f7f3",
  cardBackground: "#fff",
  textPrimary: "#050b20",   // Darker text for values
  textSecondary: "#241f1b", // Slightly lighter for general text
  textLabel: "#604c3d",     // --color-dimgray for labels
  textMuted: "#a9a9a9",
  brandPrimary: "#a68465",
  border: "#efebe2",       // --color-linen, a softer border
};

// Define font settings
const fonts = {
  fontFamily: "'DM Sans', 'Helvetica Neue', 'Arial', sans-serif",
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

export const ClientBookingPending: React.FC<
  Readonly<ClientBookingPendingProps>
> = ({
  clientName,
  providerName,
  address,
  contactNumber,
  date,
  time,
  services,
  totalPrice,
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>Booking Request Pending</title>
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
            textAlign: "center",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://uzkgfzceyjenzqyucmdq.supabase.co/storage/v1/object/public/avatars//Servease%20Logo.svg"
            alt="Servease Logo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>

        <div style={{ padding: "40px" }}>
          <h1
            style={{
              color: colors.textPrimary,
              fontSize: "24px",
              fontWeight: 700,
              margin: "0 0 24px",
            }}
          >
            Your Booking Request is Pending
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
            Hello {clientName},
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
            Thank you for choosing Servease. We have received your booking request and are now waiting for <strong>{providerName}</strong> to confirm the appointment. We will notify you again as soon as it is approved.
          </p>

          {/* --- RESTRUCTURED Booking Summary Section --- */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <h2
              style={{
                color: colors.textPrimary,
                fontSize: "20px",
                fontWeight: 700,
                margin: "0 0 24px",
              }}
            >
              Booking Summary
            </h2>
            
            {/* Details Table using Divs */}
            <div style={{ marginBottom: "20px" }}>
              <DetailRow label="Facility Name" value={providerName} />
              <DetailRow label="Address" value={address} />
              <DetailRow label="Date" value={date} />
              <DetailRow label="Time" value={time} />
            </div>

            <div style={{ height: '1px', backgroundColor: colors.border, margin: '24px 0' }} />

            {/* Services List */}
            <h3 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: 700, margin: "0 0 20px" }}>
              Services Requested
            </h3>
            {services.map((service, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '16px' }}>
                <span style={{ color: colors.textSecondary }}>{service.name}: </span>
                <span style={{ color: colors.textPrimary, fontWeight: 500 }}>
                  {formatCurrency(service.price)}
                </span>
              </div>
            ))}

            <div style={{ height: '1px', backgroundColor: colors.border, margin: '24px 0' }} />
            
            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ color: colors.textPrimary, fontWeight: 700, fontSize: '18px' }}>
                  Total:
                </span>
                <span style={{ color: colors.brandPrimary, fontWeight: 700, fontSize: '22px' }}>
                  {totalPrice}
                </span>
            </div>
          </div>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: "16px",
              lineHeight: 1.6,
              marginTop: "40px",
              fontWeight: 400,
            }}
          >
            Sincerely,
            <br />
            The{" "}
            <span style={{ color: colors.brandPrimary, fontWeight: 700 }}>
              Servease
            </span>{" "}
            Team
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.emailBackground,
            padding: "20px 40px",
            borderTop: `1px solid ${colors.border}`,
            textAlign: "center",
          }}
        >
          <p style={{ color: colors.textMuted, fontSize: "12px", margin: 0, fontWeight: 400 }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: colors.brandPrimary }}>Servease</span>. All rights
            reserved.
          </p>
          <p style={{ color: colors.textMuted, fontSize: "12px", margin: "5px 0 0", fontWeight: 400 }}>
            This is an automated notification. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
  </html>
);

// --- ADDED a helper component for clean, aligned detail rows ---
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '16px' }}>
    <span style={{ color: colors.textLabel, fontWeight: 500, paddingRight: '16px' }}>
      {label}
    </span>
    <span style={{ color: colors.textPrimary, fontWeight: 400, textAlign: 'right' }}>
      {value}
    </span>
  </div>
);
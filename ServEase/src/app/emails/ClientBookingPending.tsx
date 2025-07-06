// emails/ClientBookingPending.tsx
import * as React from "react";

interface ClientBookingPendingProps {
  clientName: string;
  providerName: string;
  date: string;
  time: string;
}

export const ClientBookingPending: React.FC<
  Readonly<ClientBookingPendingProps>
> = ({ clientName, providerName, date, time }) => (
  <div
    style={{
      fontFamily: "sans-serif",
      padding: "20px",
      backgroundColor: "#f4f4f4",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ color: "#333" }}>
        Your Booking Request is Awaiting Approval
      </h1>
      <p>Hello {clientName},</p>
      <p>
        Thank you for your booking request! We are just waiting for{" "}
        <strong>{providerName}</strong> to confirm the appointment.
      </p>
      <p>
        We will send you a final confirmation email as soon as it's approved.
      </p>

      <div
        style={{
          borderTop: "1px solid #eee",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <h2 style={{ color: "#333" }}>Requested Appointment Details</h2>
        <p>
          <strong>Provider:</strong> {providerName}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
      </div>

      <p style={{ marginTop: "30px", fontSize: "12px", color: "#999" }}>
        No action is needed from you at this time.
      </p>
    </div>
  </div>
);

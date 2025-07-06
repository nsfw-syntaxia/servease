import * as React from "react";

interface ProviderBookingNotificationProps {
  providerName: string;
  clientName: string;
  clientEmail: string; // Good to include for contact
  date: string;
  time: string;
  services: { name: string; price: number }[];
}

export const ProviderBookingNotification: React.FC<Readonly<ProviderBookingNotificationProps>> = ({
  providerName,
  clientName,
  clientEmail,
  date,
  time,
  services,
}) => (
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
      <h1 style={{ color: "#333" }}>New Appointment!</h1>
      <p>Hello {providerName},</p>
      <p>You have received a new booking. Here are the details:</p>

      <div
        style={{
          borderTop: "1px solid #eee",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <h2 style={{ color: "#333" }}>Client & Appointment Details</h2>
        <p>
          <strong>Client Name:</strong> {clientName}
        </p>
        <p>
          <strong>Client Email:</strong> {clientEmail}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid #eee",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <h3 style={{ color: "#333" }}>Services Requested</h3>
        <ul>
          {services.map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: "30px", color: "#555" }}>
        Please prepare for the upcoming appointment.
      </p>
    </div>
  </div>
);

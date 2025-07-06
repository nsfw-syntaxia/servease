import * as React from 'react';

interface ClientBookingConfirmationProps {
  clientName: string;
  providerName: string;
  date: string;
  time: string;
  services: { name: string; price: number }[];
  totalPrice: string;
  address: string;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
};

export const ClientBookingConfirmation: React.FC<Readonly<ClientBookingConfirmationProps>> = ({
  clientName,
  providerName,
  date,
  time,
  services,
  totalPrice,
  address,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ color: '#333' }}>Your Booking is Confirmed!</h1>
      <p>Hello {clientName},</p>
      <p>Thank you for booking with us. Here are the details of your upcoming appointment:</p>
      
      <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
        <h2 style={{ color: '#333' }}>Appointment Details</h2>
        <p><strong>Provider:</strong> {providerName}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
      </div>

      <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
        <h3 style={{ color: '#333' }}>Services Booked</h3>
        {services.map((service, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{service.name}</span>
            <span>{formatCurrency(service.price)}</span>
          </div>
        ))}
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total</span>
          <span>{totalPrice}</span>
        </div>
      </div>

      <p style={{ marginTop: '30px', color: '#555' }}>We look forward to seeing you!</p>
      <p style={{ marginTop: '30px', fontSize: '12px', color: '#999' }}>
        If you need to reschedule or cancel, please contact the provider directly.
      </p>
    </div>
  </div>
);
"use client"; // Needs to be a client component to use providers

import { BookingProvider } from "./BookingContext";
import AppointmentBooking from "./appointment-booking-initial"; // Your UI component

export default function Home() {
  return (
    // Wrap your entire booking UI with the BookingProvider
    <BookingProvider>
      <AppointmentBooking />
    </BookingProvider>
  );
}
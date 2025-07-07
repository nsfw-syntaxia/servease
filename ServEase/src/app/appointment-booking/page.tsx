"use client";

import { BookingProvider } from "./BookingContext";
import AppointmentBooking from "./appointment-booking-initial";

export default function Home() {
  return (
    <BookingProvider>
      <AppointmentBooking />
    </BookingProvider>
  );
}

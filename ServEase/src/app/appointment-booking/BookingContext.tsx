"use client";

import { createContext, useState, useContext, ReactNode } from "react";

export interface Service {
  id: number;
  provider_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
}

interface BookingData {
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
}

interface BookingContextType {
  bookingData: BookingData;
  setSelectedServices: (services: Service[]) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  resetBookingData: () => void; // <-- ADDITION: Function to clear the context
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingData: BookingData = {
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  const setSelectedServices = (services: Service[]) => {
    setBookingData((prev) => ({ ...prev, selectedServices: services }));
  };

  const setSelectedDate = (date: Date | null) => {
    setBookingData((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTime = (time: string | null) => {
    setBookingData((prev) => ({ ...prev, selectedTime: time }));
  };

  const resetBookingData = () => {
    setBookingData(initialBookingData);
  };

  const value = {
    bookingData,
    setSelectedServices,
    setSelectedDate,
    setSelectedTime,
    resetBookingData, // <-- ADDITION
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

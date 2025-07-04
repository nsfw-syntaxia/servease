"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// (The Service interface remains the same)
export interface Service {
  id: number;
  provider_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
}

// --- MODIFICATION 1: Add date and time to our shared data ---
interface BookingData {
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
}

// --- MODIFICATION 2: Add setters for date and time to the context type ---
interface BookingContextType {
  bookingData: BookingData;
  setSelectedServices: (services: Service[]) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // --- MODIFICATION 3: Initialize the new state fields ---
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    selectedDate: null, // Start with no date selected
    selectedTime: null, // Start with no time selected
  });

  const setSelectedServices = (services: Service[]) => {
    setBookingData((prev) => ({ ...prev, selectedServices: services }));
  };
  
  // --- MODIFICATION 4: Create the new setter functions ---
  const setSelectedDate = (date: Date | null) => {
    setBookingData((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTime = (time: string | null) => {
    setBookingData((prev) => ({ ...prev, selectedTime: time }));
  };

  // --- MODIFICATION 5: Pass the new setters in the context value ---
  const value = {
    bookingData,
    setSelectedServices,
    setSelectedDate,
    setSelectedTime,
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
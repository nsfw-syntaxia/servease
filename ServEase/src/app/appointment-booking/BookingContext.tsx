"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// The Service interface from your code
export interface Service {
  id: number;
  provider_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
}

// The structure of the data we track across steps
interface BookingData {
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
}

// The full shape of our context, including setters and the new reset function
interface BookingContextType {
  bookingData: BookingData;
  setSelectedServices: (services: Service[]) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  resetBookingData: () => void; // <-- ADDITION: Function to clear the context
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Define the initial state here to reuse it for resetting
const initialBookingData: BookingData = {
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const setSelectedServices = (services: Service[]) => {
    setBookingData((prev) => ({ ...prev, selectedServices: services }));
  };
  
  const setSelectedDate = (date: Date | null) => {
    setBookingData((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTime = (time: string | null) => {
    setBookingData((prev) => ({ ...prev, selectedTime: time }));
  };

  // <-- ADDITION: Implementation of the reset function
  // This is crucial for a good user experience after a booking is complete.
  const resetBookingData = () => {
    setBookingData(initialBookingData);
  };

  // Pass the new reset function in the context value
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

// The hook remains the same, it will now provide access to resetBookingData
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
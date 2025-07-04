"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of a single service and our shared data
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
  // You will add more data here later, e.g.:
  // selectedDate: Date | null;
  // selectedTime: string | null;
}

// Define the shape of the context value
interface BookingContextType {
  bookingData: BookingData;
  setSelectedServices: (services: Service[]) => void;
  // Add other setters here as you build more steps
}

// Create the context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Create the Provider component
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
  });

  // Helper function to update only the selected services
  const setSelectedServices = (services: Service[]) => {
    setBookingData((prev) => ({ ...prev, selectedServices: services }));
  };

  const value = {
    bookingData,
    setSelectedServices,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

// Create a custom hook for easy access
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
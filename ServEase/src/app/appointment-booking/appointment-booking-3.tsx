"use client";
import type { NextPage } from "next";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "../styles/appointment-booking-3.module.css";
import { useBooking } from "./BookingContext"; // Make sure you have this
import { createClient } from "../lib/supabase/client";

// Define your types here or import them
interface ProviderProfile {
  id: string;
  full_name: string;
  facility_name: string;
  address: string;
  phone_number: string;
}

// Helper to format numbers as PHP currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

export default function Booking3({ onNext }: Props) {
  // --- State Hooks ---
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Hooks for data and navigation ---
  const { bookingData, resetBookingData } = useBooking();
  const { selectedServices, selectedDate, selectedTime } = bookingData;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const facilityId = searchParams.get("facilityId");

  // --- Effect to fetch provider data on component mount ---
  useEffect(() => {
    if (!facilityId) {
      setErrorMessage("Facility ID is missing. Please go back and try again.");
      setIsLoading(false);
      return;
    }

    const fetchProviderProfile = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles') // Assuming your table is named 'profiles'
        .select('id, full_name, facility_name, address, phone_number')
        .eq('id', facilityId)
        .single();

      if (error) {
        console.error("Error fetching provider profile:", error);
        setErrorMessage("Could not load provider details. Please try again.");
      } else {
        setProviderProfile(data);
      }
      setIsLoading(false);
    };

    fetchProviderProfile();
  }, [facilityId, supabase]);

  // --- Derived data using useMemo for efficiency ---
  const totalPrice = useMemo(() => {
    if (!selectedServices) return 0;
    return selectedServices.reduce((sum, service) => sum + service.price, 0);
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    if (!selectedServices) return 0;
    return selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0);
  }, [selectedServices]);

  // --- Main Action: Handle Confirmation and Save to DB ---
  const handleConfirmBooking = async () => {
    if (!isAgreed) {
      setErrorMessage("You must agree to the terms before confirming.");
      return;
    }
    if (!selectedDate || !selectedTime || !providerProfile || selectedServices.length === 0) {
      setErrorMessage("Booking details are incomplete. Please go back and check.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found. Please log in.");

      // Combine date and time to create a valid ISO 8601 timestamp
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);

      // Calculate end time
      const endTime = new Date(startTime.getTime() + totalDuration * 60000); // 60000ms in a minute

      // Prepare the data for insertion
      const bookingToInsert = {
        provider_id: providerProfile.id,
        user_id: user.id,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        total_price: totalPrice,
        status: 'confirmed', // or 'upcoming'
        services: selectedServices // Storing selected services as JSON
      };

      // Insert into the 'bookings' table
      const { error: insertError } = await supabase
        .from('bookings') // MAKE SURE YOUR TABLE IS NAMED 'bookings'
        .insert(bookingToInsert);

      if (insertError) {
        throw insertError;
      }
      
      // Success!
      console.log("Booking successfully created.");
      if(resetBookingData) resetBookingData(); // Clear the context for the next booking
      router.push("/booking-success"); // Redirect to a success page

    } catch (error: any) {
      console.error("Failed to confirm booking:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // --- Render Logic ---
  if (isLoading) {
    return <div className={styles.loadingMessage}>Loading booking summary...</div>;
  }

  if (errorMessage && !providerProfile) {
    return <div className={styles.errorbox}>{errorMessage}</div>;
  }

  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.doubleCheckTheDetails}>
          Double-check the details of your booking — selected services, date,
          time, and provider. Once you are ready, confirm your appointment to
          finalize the process.
        </div>
      </div>
      <div className={styles.calendarSelectChangeSize}>
        <div className={styles.facilityNameParent}>
          {/* Provider Details */}
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Facility Name</div>
            <b className={styles.facilityNameCap}>{providerProfile?.facility_name || 'N/A'}</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Provider</div>
            <b className={styles.facilityNameCap}>{providerProfile?.full_name || 'N/A'}</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Address</div>
            <b className={styles.facilityNameCap}>{providerProfile?.address || 'N/A'}</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Phone Number</div>
            <b className={styles.facilityNameCap}>{providerProfile?.phone_number || 'N/A'}</b>
          </div>
          {/* Booking Details */}
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Booking Date</div>
            <b className={styles.facilityNameCap}>
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Booking Time</div>
            <b className={styles.facilityNameCap}>{selectedTime || 'N/A'}</b>
          </div>
        </div>
        <Image className={styles.dividerIcon} width={390} height={1} alt="" src="/Divider1.svg" />
        
        {/* Services Breakdown */}
        <div className={styles.serviceNameParent}>
          {(selectedServices && selectedServices.length > 0) ? (
            selectedServices.map((service) => (
              <div className={styles.rowContainer} key={service.id}>
                <div className={styles.facilityName}>{service.name}</div>
                <b className={styles.facilityNameCap}>{formatCurrency(service.price)}</b>
              </div>
            ))
          ) : (
            <div className={styles.facilityName}>No services selected.</div>
          )}
        </div>
        
        <Image className={styles.dividerIcon1} width={390} height={1} alt="" src="/Divider1.svg" />
        
        {/* Total Price */}
        <div className={styles.rowContainerTotal}>
          <div className={styles.facilityName}>Total</div>
          <b className={styles.facilityNameCap}>{formatCurrency(totalPrice)}</b>
        </div>
      </div>

      <div
        className={styles.confirmSection}
        onClick={() => setIsAgreed(!isAgreed)}
        role="checkbox"
        aria-checked={isAgreed}
        tabIndex={0}
      >
        <div className={styles.header}>
          <div className={`${styles.checkbox} ${isAgreed ? styles.checkboxActive : ""}`}>
            {isAgreed && <Image src="/check.svg" alt="check" width={13} height={13} />}
          </div>
          <div className={styles.name}>I agree to and confirm this booking summary.</div>
        </div>
      </div>

      <div className={styles.messageWrapper}>
        {errorMessage && (
            <div className={`${styles.errorbox} ${styles.visible}`}>
                {errorMessage}
            </div>
        )}
      </div>

      <button
        className={styles.buttoncontainer}
        style={{ opacity: isAgreed && !isSubmitting ? 1 : 0.5, cursor: isAgreed && !isSubmitting ? 'pointer' : 'not-allowed' }}
        onClick={handleConfirmBooking}
        disabled={!isAgreed || isSubmitting}
      >
        <div className={styles.signup}>
          <div className={styles.signupText}>{isSubmitting ? 'Confirming...' : 'Confirm Appointment'}</div>
        </div>
      </button>
    </div>
  );
}
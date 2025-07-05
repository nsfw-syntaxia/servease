"use client";
import type { NextPage } from "next";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "../styles/appointment-booking-2.module.css";
import { Calendar } from "@/components/components/ui/calendar";
import { useBooking } from "./BookingContext";
import { createClient } from "../lib/supabase/client";

type Props = {
  onNext: () => void;
};

export default function AppointmentScheduler({ onNext }: Props) {
  const { bookingData, setSelectedDate, setSelectedTime } = useBooking();
  const { selectedServices, selectedDate, selectedTime } = bookingData;

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);

  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const facilityId = searchParams.get("facilityId");

  // Use ref to prevent multiple simultaneous requests
  const fetchingRef = useRef(false);
  const lastFetchRef = useRef<string>("");

  const prevDateRef = useRef<Date | null>(null);
  const totalBookingDuration = useMemo(() => {
    return selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0);
  }, [selectedServices]);

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  const fetchAvailableSlots = useCallback(async (date: Date, providerId: string) => {
    // Create a unique key for this request
    const requestKey = `${providerId}-${date.toISOString().split('T')[0]}`;
    
    // Prevent duplicate requests
    if (fetchingRef.current || lastFetchRef.current === requestKey) {
      console.log("Already fetching or duplicate request, skipping");
      return;
    }

    fetchingRef.current = true;
    lastFetchRef.current = requestKey;
    setIsFetchingSlots(true);
    setErrorMessage("");

    console.log("Fetching available start times for:", { providerId, date: date.toISOString().split('T')[0] });

    try {
      const { data, error } = await supabase.rpc('get_available_start_times', {
        provider_id_param: providerId,
        selected_date_param: date.toISOString().split('T')[0]
      });

      if (error) {
        console.error("Supabase RPC Error:", error);
        throw new Error("Failed to fetch available slots. Please try again.");
      }
      
      console.log("Received slots:", data);
      
      // Only update if we actually got data
      if (data && Array.isArray(data)) {
        setAvailableTimeslots(data);
      } else {
        setAvailableTimeslots([]);
      }

    } catch (error: any) {
      console.error("Error fetching timeslots:", error);
      setErrorMessage(error.message || "Could not load times. Please try another date.");
      setAvailableTimeslots([]);
    } finally {
      setIsFetchingSlots(false);
      fetchingRef.current = false;
    }
  }, [supabase]);

  useEffect(() => {
    if (!selectedDate || !facilityId || totalBookingDuration === 0) {
      if (totalBookingDuration === 0) {
        setErrorMessage("Please go back and select at least one service.");
        setAvailableTimeslots([]);
      }
      return;
    }

    setErrorMessage("");
    
    // Clear selected time when date changes (but allow keeping it if same date)
    if (selectedTime) {
      setSelectedTime(null);
    }

    const hasDateChanged = prevDateRef.current?.getTime() !== selectedDate?.getTime();
    
    // Only clear the selected time if the date has ACTUALLY changed.
    // This preserves the time on initial load or when navigating back.
    if (hasDateChanged) {
        console.log("Date has changed, clearing selected time.");
        setSelectedTime(null);
    }

    // Fetch slots for the new date
    fetchAvailableSlots(selectedDate, facilityId);

  }, [selectedDate, facilityId, totalBookingDuration, fetchAvailableSlots]);

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (!selectedTime) {
      setErrorMessage("Please select a time slot to proceed.");
      return;
    }

    setErrorMessage("");
    console.log("Proceeding with booking:", { selectedDate, selectedTime, selectedServices });
    onNext();
  };

  const handleDateSelect = (date: Date | undefined | null) => {
    if (date) {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      console.log("Date selected:", normalizedDate);
      
      // Reset the last fetch ref when date changes to allow new fetch
      lastFetchRef.current = "";
      
      setSelectedDate(normalizedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    console.log("Time selected:", time);
    setSelectedTime(time);
    setErrorMessage("");
  };

  // Debug logging
  useEffect(() => {
    console.log("Current booking data:", {
      selectedDate: selectedDate?.toISOString().split('T')[0],
      selectedTime,
      selectedServices: selectedServices.map(s => s.name),
      facilityId
    });
  }, [selectedDate, selectedTime, selectedServices, facilityId]);

  console.log("Rendering with availableTimeslots:", availableTimeslots.length, "slots");

  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.pickAConvenient}>
          Pick a convenient date and time for your appointment. Available slots
          are based on real-time provider availability.
        </div>
      </div>

      <div className={styles.date}>Select a Date</div>
      <div className="flex justify-center items-center">
        <div className="inline-flex rounded-xl border border-neutral-300 shadow-md p-6 bg-white">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
            disabled={{ before: new Date(new Date().setDate(new Date().getDate() - 1)) }}
            className="p-0"
          />
        </div>
      </div>

      <div className={styles.date}>Select a Timeslot</div>
      <div className={styles.buttonContainer}>
        {isFetchingSlots ? (
          <div className={styles.loadingMessage}>Loading available slots...</div>
        ) : availableTimeslots.length > 0 ? (
          availableTimeslots.map((time) => (
            <button
              key={time}
              type="button"
              className={`${styles.button3} ${
                selectedTime === time ? styles.active : styles.inactive
              }`}
              onClick={() => handleTimeSelect(time)}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                userSelect: 'none'
              }}
            >
              {time}
            </button>
          ))
        ) : (
          <div className={styles.loadingMessage}>
            {errorMessage || "No available slots for this day. Please try another date."}
          </div>
        )}
      </div>

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${selectedTime ? styles.visible : styles.hidden}`}
        >
          <div className={styles.timeSection}>
            <Image src="/app_clock.svg" alt="time" width={20} height={20} />
            <span>{selectedTime}</span>
          </div>
          <div className={styles.dateSection}>
            <Image src="/calendar_month.svg" alt="calendar" width={20} height={20}/>
            <span>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric",
                  })
                : "No date selected"}
            </span>
          </div>
        </div>
        {errorMessage && (
             <div className={`${styles.errorbox} ${styles.visible}`}>
                {errorMessage}
            </div>
        )}
      </div>

      <button
        type="button"
        className={`${styles.buttoncontainer} ${buttonClicked ? styles.clicked : ""}`}
        style={{
          opacity: selectedTime ? 1 : 0.5,
          cursor: selectedTime ? 'pointer' : 'not-allowed',
        }}
        onClick={handleNextClick}
        disabled={!selectedTime}
      >
        <div className={styles.signup}>
          <div className={styles.signupText}>Next</div>
        </div>
      </button>
    </div>
  );
}
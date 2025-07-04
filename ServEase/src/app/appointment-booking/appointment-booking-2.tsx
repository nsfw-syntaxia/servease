"use client";
import type { NextPage } from "next";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "../styles/appointment-booking-2.module.css";
import { Calendar } from "@/components/components/ui/calendar";
import { useBooking } from "./BookingContext";
import { createClient } from "../lib/supabase/client";

type Props = {
  onNext: () => void;
};

export default function Booking2({ onNext }: Props) {
  // --- Context state (no changes) ---
  const { bookingData, setSelectedDate, setSelectedTime } = useBooking();
  const { selectedServices, selectedDate, selectedTime } = bookingData;

  // --- Local UI state (no changes) ---
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);

  // --- Hooks (no changes) ---
  const supabase = useMemo(() => createClient(), []); // useMemo ensures the client is created only once. Good practice.
  const searchParams = useSearchParams();

  const newBookingDuration = useMemo(() => {
    return selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0);
  }, [selectedServices]);
  
  // --- FIX: Split useEffect into two for clear responsibilities ---

  // Effect 1: Set the default date ONLY if it's not already set.
  // This runs once when the component first appears.
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);

  // Effect 2: Fetch timeslots whenever the date or total duration changes.
  // This has a minimal, correct dependency array, which prevents the loop.
  useEffect(() => {
    // Don't run the fetch if we don't have the necessary data yet.
    if (!selectedDate || !newBookingDuration) {
      return;
    }
    
    const facilityId = searchParams.get("facilityId");
    if (!facilityId) return;

    const fetchSlots = async () => {
      setIsFetchingSlots(true);
      setAvailableTimeslots([]);
      setSelectedTime(null); // Deselect time when date changes
      setErrorMessage("");

      try {
        const { data, error } = await supabase.functions.invoke('get-available-timeslots', {
          body: { 
            providerId: facilityId,
            selectedDateISO: selectedDate.toISOString(),
            newBookingDuration: newBookingDuration
          },
        });

        if (error) throw error;
        setAvailableTimeslots(data || []);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
        setErrorMessage("Could not load times. Please try another date.");
      } finally {
        setIsFetchingSlots(false);
      }
    };

    fetchSlots();
    // The key is this dependency array. It only includes the *data* that should trigger a refetch.
  }, [selectedDate, newBookingDuration, searchParams, supabase.functions, setSelectedTime]);


  // --- The rest of your component remains exactly the same ---
  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (!selectedTime) {
      setErrorMessage("Please select a time slot to proceed.");
      return;
    }

    setErrorMessage("");
    console.log("Date and Time saved to context:", { selectedDate, selectedTime });
    onNext();
  };

  return (
    <div className={styles.frameGroup}>
      {/* (All your JSX from here down is identical to your last version) */}
      <div className={styles.numberParent}>
        <div className={styles.pickAConvenient}>
          Pick a convenient date and time for your appointment. Available slots
          are based on real-time provider availability to help you schedule with
          ease.
        </div>
        <div className={styles.atLeastChoose}>{`*At least choose one date tayo :> `}</div>
      </div>
      <div className={styles.date}>{`Date`}</div>
      <div className="flex justify-center items-center">
        <div className="inline-flex rounded-xl border border-neutral-300 shadow-md p-6 bg-white justify-center items-center">
          <Calendar
            selected={selectedDate || undefined}
            onSelect={(date) => setSelectedDate(date || null)}
            mode="single"
            disabled={{ before: new Date() }}
          />
        </div>
      </div>

      <div className={styles.date}>{`Timeslot`}</div>
      <div className={styles.buttonContainer}>
        {isFetchingSlots ? (
          <div className={styles.loadingMessage}>Loading available slots...</div>
        ) : availableTimeslots.length > 0 ? (
          availableTimeslots.map((time) => (
            <div
              key={time}
              className={`${styles.button3} ${
                selectedTime === time ? styles.active : styles.inactive
              }`}
              onClick={() => {
                setSelectedTime(time);
                setErrorMessage("");
              }}
            >
              <div className={styles.star} />
              <div className={styles.mondayFriday}>{time}</div>
              <div className={styles.star} />
            </div>
          ))
        ) : (
          <div className={styles.loadingMessage}>No available slots for this day.</div>
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
                    weekday: "short", month: "long", day: "numeric",
                  })
                : "No date selected"}
            </span>
          </div>
        </div>
        <div className={`${styles.errorbox} ${errorMessage ? styles.visible : styles.hidden}`}>
          {errorMessage || "Please select a time slot to proceed."}
        </div>
      </div>
      <div
        className={`${styles.buttoncontainer} ${buttonClicked ? styles.clicked : ""}`}
        style={{
          backgroundColor: "#a68465",
          opacity: selectedTime ? "1" : "0.5",
          transition: "opacity 0.2s ease",
        }}
        onClick={handleNextClick}
      >
        <div className={styles.signup}>
          <div className={styles.signupText}>Next</div>
        </div>
      </div>
    </div>
  );
}
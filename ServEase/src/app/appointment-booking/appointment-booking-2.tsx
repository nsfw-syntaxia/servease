"use client";
import type { NextPage } from "next";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "../styles/appointment-booking-2.module.css";
import { Calendar } from "@/components/components/ui/calendar";
import { useBooking } from "./BookingContext";
import { createClient } from "../lib/supabase/client";

type Props = {
  onNext: () => void;
};

// Helper function to format date consistently and avoid timezone issues
const formatDateForDatabase = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to create a normalized date (removes time component)
const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export default function AppointmentScheduler({ onNext }: Props) {
  const { bookingData, setSelectedDate, setSelectedTime } = useBooking();
  const { selectedServices, selectedDate, selectedTime } = bookingData;

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [operatingHours, setOperatingHours] = useState<{
    start_time: string;
    end_time: string;
  } | null>(null);

  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const facilityId = searchParams.get("facilityId");

  const fetchingRef = useRef(false);
  const lastFetchRef = useRef<string>("");

  const prevDateRef = useRef<Date | null>(null);
  const totalBookingDuration = useMemo(() => {
    return selectedServices.reduce(
      (sum, service) => sum + service.duration_minutes,
      0
    );
  }, [selectedServices]);

  // Generate all possible time slots (8 AM to 6 PM, 30-minute intervals)
  const allTimeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) break; // Stop at 6:00 PM
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  }, []);

  // Fetch operating hours for the provider
  const fetchOperatingHours = useCallback(
    async (providerId: string) => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("start_time, end_time")
          .eq("id", providerId)
          .single();

        if (error) {
          console.error("Error fetching operating hours:", error);
          setOperatingHours({ start_time: "08:00", end_time: "18:00" });
          return;
        }

        if (profile && profile.start_time && profile.end_time) {
          console.log("Operating hours fetched:", profile);
          setOperatingHours({
            start_time: profile.start_time,
            end_time: profile.end_time,
          });
        } else {
          console.log("No operating hours found, using defaults");
          setOperatingHours({ start_time: "08:00", end_time: "18:00" });
        }
      } catch (error) {
        console.error("Error fetching operating hours:", error);
        setOperatingHours({ start_time: "08:00", end_time: "18:00" });
      }
    },
    [supabase]
  );

  useEffect(() => {
    if (facilityId) {
      fetchOperatingHours(facilityId);
    }
  }, [facilityId, fetchOperatingHours]);

  const fetchAvailableSlots = useCallback(
    async (date: Date, providerId: string) => {
      const formattedDate = formatDateForDatabase(date);
      const requestKey = `${providerId}-${formattedDate}`;

      if (fetchingRef.current || lastFetchRef.current === requestKey) {
        console.log("Already fetching or duplicate request, skipping");
        return;
      }

      fetchingRef.current = true;
      lastFetchRef.current = requestKey;
      setIsFetchingSlots(true);
      setErrorMessage("");

      console.log("Fetching appointments for:", {
        providerId,
        date: formattedDate,
      });

      try {
        const { data: appointments, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("provider_id", providerId)
          .eq("date", formattedDate);

        if (error) {
          console.error("Supabase Error details:", error);
          console.log("Error message:", error.message);
          console.log("Error details:", error.details);
          console.log("Error hint:", error.hint);
          throw new Error(`Database error: ${error.message}`);
        }

        console.log("Fetched appointments:", appointments);
        console.log("Number of appointments found:", appointments?.length || 0);

        const bookedTimes = new Set();
        if (appointments && Array.isArray(appointments)) {
          appointments.forEach((appointment) => {
            const timeField =
              appointment.appointment_time ||
              appointment.time ||
              appointment.start_time ||
              appointment.scheduled_time;

            if (timeField) {
              let timeString = timeField;
              if (timeField.includes(":")) {
                timeString = timeField.substring(0, 5);
              }
              bookedTimes.add(timeString);
              console.log("Added booked time:", timeString);
            }
          });
        }

        console.log("All booked times:", Array.from(bookedTimes));

        const availableSlots = allTimeSlots.filter((timeSlot) => {
          return !bookedTimes.has(timeSlot);
        });

        console.log("Available slots:", availableSlots);
        console.log("Total possible slots:", allTimeSlots.length);
        console.log("Booked slots count:", bookedTimes.size);
        console.log("Available slots count:", availableSlots.length);

        if (!appointments || appointments.length === 0) {
          console.log("No appointments found - all slots should be available");
          setAvailableTimeslots(allTimeSlots);
        } else {
          setAvailableTimeslots(availableSlots);
        }
      } catch (error: any) {
        console.error("Error fetching appointments:", error);
        setErrorMessage(
          error.message || "Could not load times. Please try another date."
        );
        setAvailableTimeslots([]);
      } finally {
        setIsFetchingSlots(false);
        fetchingRef.current = false;
      }
    },
    [supabase, allTimeSlots]
  );

  useEffect(() => {
    if (!selectedDate) {
      const today = normalizeDate(new Date());
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  useEffect(() => {
    if (
      !selectedDate ||
      !facilityId ||
      totalBookingDuration === 0 ||
      !operatingHours
    ) {
      if (totalBookingDuration === 0) {
        setErrorMessage("Please go back and select at least one service.");
        setAvailableTimeslots([]);
      } else if (!operatingHours) {
        setErrorMessage("Loading operating hours...");
        setAvailableTimeslots([]);
      }
      return;
    }

    setErrorMessage("");

    if (selectedTime) {
      setSelectedTime(null);
    }

    const hasDateChanged =
      prevDateRef.current?.getTime() !== selectedDate?.getTime();

    if (hasDateChanged) {
      console.log("Date has changed, clearing selected time.");
      setSelectedTime(null);
    }

    fetchAvailableSlots(selectedDate, facilityId);
  }, [
    selectedDate,
    facilityId,
    totalBookingDuration,
    operatingHours,
    fetchAvailableSlots,
  ]);

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (!selectedTime) {
      setErrorMessage("Please select a time slot to proceed.");
      return;
    }

    setErrorMessage("");
    console.log("Proceeding with booking:", {
      selectedDate,
      selectedTime,
      selectedServices,
    });
    onNext();
  };

  const handleDateSelect = (date: Date | undefined | null) => {
    if (date) {
      const normalizedDate = normalizeDate(date);
      console.log("Date selected:", normalizedDate);
      console.log(
        "Formatted date for DB:",
        formatDateForDatabase(normalizedDate)
      );

      lastFetchRef.current = "";

      setSelectedDate(normalizedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    console.log("Time selected:", time);
    setSelectedTime(time);
    setErrorMessage("");
  };

  useEffect(() => {
    console.log("Current booking data:", {
      selectedDate: selectedDate ? formatDateForDatabase(selectedDate) : null,
      selectedTime,
      selectedServices: selectedServices.map((s) => s.name),
      facilityId,
      operatingHours,
    });
  }, [
    selectedDate,
    selectedTime,
    selectedServices,
    facilityId,
    operatingHours,
  ]);

  console.log(
    "Rendering with availableTimeslots:",
    availableTimeslots.length,
    "slots"
  );

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
            disabled={{
              before: new Date(new Date().setDate(new Date().getDate() - 1)),
            }}
            className="p-0"
          />
        </div>
      </div>

      <div className={styles.date}>Select a Timeslot</div>
      <div className={styles.buttonContainer}>
        {isFetchingSlots ? (
          <div className={styles.loadingMessage}>
            Loading available slots...
          </div>
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
                cursor: "pointer",
                pointerEvents: "auto",
                userSelect: "none",
              }}
            >
              {time}
            </button>
          ))
        ) : (
          <div className={styles.loadingMessage}>
            {errorMessage || (
              <div>
                <div>
                  No available slots for this day. Please try another date.
                </div>
                <div
                  style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}
                >
                  Debug: Check browser console for details
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${
            selectedTime ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.timeSection}>
            <Image src="/app_clock.svg" alt="time" width={20} height={20} />
            <span>{selectedTime}</span>
          </div>
          <div className={styles.dateSection}>
            <Image
              src="/calendar_month.svg"
              alt="calendar"
              width={20}
              height={20}
            />
            <span>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
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
        className={`${styles.buttoncontainer} ${
          buttonClicked ? styles.clicked : ""
        }`}
        style={{
          opacity: selectedTime ? 1 : 0.5,
          cursor: selectedTime ? "pointer" : "not-allowed",
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

"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import styles from "../styles/register-client-2.module.css";
import { profile } from "./actions2"; // Assuming you have a separate server action for this step

type Props = {
  onNext: () => void;
};

export default function ClientSignup2({ onNext }: Props) {
  // --- All this internal state is FINE. We will keep it. ---
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const formRef = useRef<HTMLFormElement>(null);

  const formIsFilled = firstName && lastName && selectedMonth && selectedDay && selectedYear;

  const handleNextClick = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    // --- Direct validation inside the click handler ---
    if (!formIsFilled) {
      setErrorMessage("Please fill in all required fields.");
      return; // Stop if validation fails
    }

    setErrorMessage(""); // Clear any old errors

    // --- Server Action Call ---
    // If validation passes, we call the server action.
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      try {
        await profile(formData); // Call your server action for step 2
        onNext(); // Proceed to the next step ONLY on success
      } catch (e) {
        console.error("Server action for profile failed:", e);
        setErrorMessage("Could not save profile. Please try again.");
      }
    }
  };
  
  // --- REMOVED THE FAULTY useEffect BLOCK ---
  // This was the source of the "Maximum update depth exceeded" error.
  // We do not need it.

  // All your other handlers (handleMonthSelect, handleDaySelect, etc.) are fine.
  const handleMonthSelect = (month: { label: string }) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
  };
  const handleDaySelect = (day: { label: string }) => {
    setSelectedDay(day.label);
    setIsDayOpen(false);
  };
  const handleYearSelect = (year: { label: string }) => {
    setSelectedYear(year.label);
    setIsYearOpen(false);
  };
  const handleGenderSelect = (gender: string) => setSelectedGender(gender);
  
  const months = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1).padStart(2, "0"), label: new Date(0, i).toLocaleString("en-US", { month: "long" })}));
  const days = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1)}));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({ value: String(currentYear - i), label: String(currentYear - i)}));

  return (
    // The component is its own form that submits to its own server action
    <form ref={formRef} action={profile}>
      <div className={styles.frameContainer}>
        <div className={styles.numberParent}>
          <div className={styles.tellUsA}>
            Tell us a bit about yourself so we can personalize your experience.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>
        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*First name</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              firstName ? styles.tbxFilled : ""
            } ${errorMessage && !firstName ? styles.errorInput : ""}`}
          >
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>Middle name (as applicable)</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              middleName ? styles.tbxFilled : ""
            }`}
          >
            <input
              type="text"
              name="middle_name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Enter your middle name"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*Last name</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              lastName ? styles.tbxFilled : ""
            } ${errorMessage && !lastName ? styles.errorInput : ""}`}
          >
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.gender}>
        {/* ... your gender selection JSX ... */}
        </div>
      </div>
      <div className={styles.gender}>
        {/* ... your date of birth JSX ... */}
      </div>

      {/* --- Hidden inputs are still needed for this approach --- */}
      <input type="hidden" name="gender" value={selectedGender} />
      <input type="hidden" name="birth_month" value={selectedMonth} />
      <input type="hidden" name="birth_day" value={selectedDay} />
      <input type="hidden" name="birth_year" value={selectedYear} />

      <div className={`${styles.errorMessage} ${errorMessage ? styles.errorDetected : ""}`}>
        {errorMessage}
      </div>

      {/* This button does NOT submit the form directly. It triggers our handler. */}
      <button
        type="button" 
        className={`${styles.button2} ${formIsFilled ? styles.filled : ""} ${isClicked ? styles.clicked : ""}`}
        onClick={handleNextClick}
      >
        <div className={styles.signUpWrapper}>
          <div className={styles.webDesigns}>Next</div>
        </div>
      </button>
    </form>
  );
}
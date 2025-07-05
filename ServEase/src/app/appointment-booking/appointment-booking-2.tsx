"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/appointment-booking-2.module.css";
import { Calendar } from "@/components/components/ui/calendar";

type Props = {
  onNext: () => void;
};
export default function Booking2({ onNext }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const Timeslot = [
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (!selectedTime) {
      setErrorMessage("Please select a time slot to proceed.");
      return;
    }

    setErrorMessage("");
    onNext();
  };

  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.pickAConvenient}>
          Pick a convenient date and time for your appointment. Available slots
          are based on real-time provider availability to help you schedule with
          ease.
        </div>
        <div
          className={styles.atLeastChoose}
        >{`*At least choose one date tayo :> `}</div>
      </div>
      <div className={styles.date}>{`Date`}</div>
      <div className="flex justify-center items-center">
        <div className="inline-flex rounded-xl border border-neutral-300 shadow-md p-6 bg-white justify-center items-center">
          <Calendar
            selected={date}
            onSelect={setDate}
            mode="single"
            disabled={{ before: new Date() }}
          />
        </div>
      </div>

      <div className={styles.date}>{`Timeslots`}</div>
      <div className={styles.buttonContainer}>
        {Timeslot.map((service) => (
          <div
            key={service}
            className={`${styles.button3} ${
              activeIndex === service ? styles.active : styles.inactive
            }`}
            onClick={() => {
              setActiveIndex(service);
              setSelectedTime(service);
              setErrorMessage("");
            }}
          >
            <div className={styles.star} />
            <div className={styles.mondayFriday}>{service}</div>
            <div className={styles.star} />
          </div>
        ))}
      </div>

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${
            activeIndex ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.timeSection}>
            <Image src="/app_clock.svg" alt="time" width={20} height={20} />
            <span>{activeIndex}</span>
          </div>

          <div className={styles.dateSection}>
            <Image
              src="/calendar_month.svg"
              alt="calendar"
              width={20}
              height={20}
            />
            <span>
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  })
                : "No date selected"}
            </span>
          </div>
        </div>

        <div
          className={`${styles.errorbox} ${
            errorMessage ? styles.visible : styles.hidden
          }`}
        >
          Please select a time slot to proceed.
        </div>
      </div>

      <div
        className={`${styles.buttoncontainer} ${
          buttonClicked ? styles.clicked : ""
        }`}
        style={{
          backgroundColor: "#a68465",
          opacity: activeIndex ? "1" : "0.5",
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

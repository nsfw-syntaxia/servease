"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/appointment-booking-3.module.css";

type Props = {
  onNext: () => void;
};

export default function Booking3({ onNext }: Props) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);
    if (!isAgreed) {
      setErrorMessage("You must agree before confirming.");
      return;
    }

    setErrorMessage("");
    console.log("Booking confirmed.");
    router.push("/facility-details");
  };

  const summaryItems = [
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.facilityName,
      priceStyle: styles.php100000,
    },
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.address,
      priceStyle: styles.php1000001,
    },
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.name,
      priceStyle: styles.php1000002,
    },
  ];

  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.doubleCheckTheDetails}>
          Double-check the details of your booking — selected services, date,
          time, and provider. Once you're ready, confirm your appointment to
          finalize the process.
        </div>
      </div>
      <div className={styles.calendarSelectChangeSize}>
        <div className={styles.facilityNameParent}>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Facility Name</div>
            <b className={styles.facilityNameCap}>Barbershop Cut</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Address</div>
            <b className={styles.facilityNameCap}>SM Cebu City</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Name</div>
            <b className={styles.facilityNameCap}>Jane Doe</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Phone Number</div>
            <b className={styles.facilityNameCap}>+63 123 4567 789</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Booking Date</div>
            <b className={styles.facilityNameCap}>June 27, 2025</b>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.facilityName}>Booking Hours</div>
            <b className={styles.facilityNameCap}>10:00 AM</b>
          </div>
        </div>
        <Image
          className={styles.dividerIcon}
          width={390}
          height={1}
          sizes="100vw"
          alt=""
          src="Divider1.svg"
        />
        <div className={styles.serviceNameParent}>
          {summaryItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>{item.label}</div>
                <b className={styles.facilityNameCap}>{item.price}</b>
              </div>
            </React.Fragment>
          ))}
        </div>
        <Image
          className={styles.dividerIcon1}
          width={390}
          height={1}
          sizes="100vw"
          alt=""
          src="Divider1.svg"
        />
        <div className={styles.rowContainerTotal}>
          <div className={styles.facilityName}>Total</div>
          <b className={styles.facilityNameCap}>PHP 1000.00</b>
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
          <div
            className={`${styles.checkbox} ${
              isAgreed ? styles.checkboxActive : ""
            }`}
          >
            {isAgreed && (
              <Image src="/check.svg" alt="check" width={13} height={13} />
            )}
          </div>
          <div className={styles.name}>
            I agree to and confirm this booking summary.
          </div>
        </div>
      </div>

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${
            isAgreed ? styles.visible : styles.hidden
          }`}
        ></div>

        <div
          className={`${styles.errorbox} ${
            !isAgreed && errorMessage ? styles.visible : styles.hidden
          }`}
        >
          You must agree before confirming.
        </div>
      </div>
      <div
        className={`${styles.buttoncontainer} ${
          buttonClicked ? styles.clicked : ""
        }`}
        style={{
          backgroundColor: "#a68465",
          opacity: isAgreed ? "1" : "0.5",
          transition: "opacity 0.2s ease",
        }}
        onClick={handleNextClick}
      >
        <div className={styles.signup}>
          <div className={styles.signupText}>Confirm Appointment</div>
        </div>
      </div>
    </div>
  );
}

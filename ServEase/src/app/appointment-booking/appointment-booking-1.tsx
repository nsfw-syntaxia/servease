"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/appointment-booking-1.module.css";

type Props = {
  onNext: () => void;
};

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
};

const services: Service[] = [
  {
    id: 1,
    name: "Service 1",
    description: "Description 1",
    price: "PHP1000.00",
  },
  {
    id: 2,
    name: "Service 2",
    description: "Description 2",
    price: "PHP1200.00",
  },
  {
    id: 3,
    name: "Service 3",
    description: "Description 3",
    price: "PHP1500.00",
  },
  {
    id: 4,
    name: "Service 4",
    description: "Description 4",
    price: "PHP1800.00",
  },
  {
    id: 5,
    name: "Service 5",
    description: "Description 5",
    price: "PHP2000.00",
  },
];

export default function Booking1({ onNext }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName];

      if (updated.length > 0) {
        setErrorMessage("");
      }
      return updated;
    });
  };

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service to proceed.");
      return;
    }

    setErrorMessage("");
    console.log("Proceeding with services:", selectedServices);
    onNext();
  };

  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.browseAndSelect}>
          Browse and select one or more services you’d like to book from our
          trusted professionals.
        </div>
        <div
          className={styles.atLeastChoose}
        >{`*At least choose one service `}</div>
      </div>
      <div className={styles.container}>
        {services.map((service, index) => {
          const isActive = selectedServices.includes(service.name);

          return (
            <div
              key={index}
              className={`${styles.card} ${isActive ? styles.active : ""} ${
                errorMessage ? styles.errorborder : ""
              }`}
              onClick={() => toggleService(service.name)}
            >
              <div className={styles.header}>
                <div
                  className={`${styles.checkbox} ${
                    isActive ? styles.checkboxActive : ""
                  }`}
                >
                  {isActive && (
                    <Image
                      src="/check.svg"
                      alt="check"
                      width={13}
                      height={13}
                    />
                  )}
                </div>
                <div className={styles.name}>{service.name}</div>
                <div className={styles.price}>{service.price}</div>
              </div>

              <div
                className={`${styles.content} ${
                  isActive ? styles.contentVisible : ""
                }`}
              >
                {service.description}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${
            selectedServices.length > 0 ? styles.visible : styles.hidden
          }`}
        >
          Total: PHP1000.00
        </div>

        <div
          className={`${styles.errorbox} ${
            errorMessage ? styles.visible : styles.hidden
          }`}
        >
          Please select at least one service
        </div>
      </div>

      <div
        className={`${styles.buttoncontainer} ${
          buttonClicked ? styles.clicked : ""
        }`}
        style={{
          backgroundColor: "#a68465",
          opacity: selectedServices.length > 0 ? "1" : "0.5",
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

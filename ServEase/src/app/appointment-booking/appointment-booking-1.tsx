"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase/client"; 
import { useBooking, Service } from "./BookingContext"; 
import styles from "../styles/appointment-booking-1.module.css";

type Props = {
  onNext: () => void;
};

export default function Booking1({ onNext }: Props) {
  const { bookingData, setSelectedServices } = useBooking();
  const { selectedServices } = bookingData;

  const searchParams = useSearchParams();
  const supabase = createClient();

  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const facilityId = searchParams.get("facilityId");
    if (!facilityId) {
      setFetchError("No facility ID provided.");
      setIsLoading(false);
      return;
    }
    const fetchServices = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("provider_id", facilityId);
      if (error) {
        setFetchError("Could not fetch services.");
        console.error(error);
      } else {
        setAllServices(data || []);
      }
      setIsLoading(false);
    };
    fetchServices();
  }, [supabase, searchParams]);

  const toggleService = (serviceToToggle: Service) => {
    const isSelected = selectedServices.some(
      (s) => s.id === serviceToToggle.id
    );
    const updatedServices = isSelected
      ? selectedServices.filter((s) => s.id !== serviceToToggle.id)
      : [...selectedServices, serviceToToggle];
    setSelectedServices(updatedServices);
    if (updatedServices.length > 0) {
      setErrorMessage("");
    }
  };

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);
    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service to proceed.");
      return;
    }
    setErrorMessage("");
    onNext();
  };

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, service) => sum + service.price, 0);
  }, [selectedServices]);

  if (isLoading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        Loading services...
      </div>
    );
  if (fetchError)
    return (
      <div className={`${styles.errorbox} ${styles.visible}`}>{fetchError}</div>
    );

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
        {allServices.map((service) => {
          const isActive = selectedServices.some((s) => s.id === service.id);
          return (
            <div
              key={service.id}
              className={`${styles.card} ${isActive ? styles.active : ""} ${
                errorMessage ? styles.errorborder : ""
              }`}
              onClick={() => toggleService(service)}
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
                <div className={styles.price}>{`PHP${service.price.toFixed(
                  2
                )}`}</div>
              </div>
              <div
                className={`${styles.content} ${
                  isActive ? styles.contentVisible : ""
                }`}
              >
                {service.description || "No description available."}
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
          Total: PHP{totalPrice.toFixed(2)}
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

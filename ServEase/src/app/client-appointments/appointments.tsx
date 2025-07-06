
"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import styles from "../styles/client-appointments.module.css";

export type ServiceDetail = {
  name: string;
  price: number;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  address: string;
  price: number; 
  services: ServiceDetail[]; 
  provider: {
    business_name: string;
    picture_url: string | null;
    contact_number: string | null;
  } | null;
};


const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
};

const formatDisplayTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const AppointmentCard = ({
  appointment,
  onShowDetails,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
}) => {
  const providerName =
    appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";
  const avatarUrl = appointment.provider?.picture_url || "/circle.svg";
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAvailableStatusOptions = (status: string): string[] => {
    if (status === "pending" || status === "confirmed") return ["cancel"];
    return [];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.cardHeader}>
        <Image
          className={styles.cardAvatar}
          width={40}
          height={40}
          alt="Provider Avatar"
          src={avatarUrl}
        />
        <div className={styles.cardHeaderText}>
          <h3 className={styles.serviceFacilityName}>{providerName}</h3>
          <p className={styles.location}>{providerAddress}</p>
        </div>
        <div
          className={styles.viewDetails}
          onClick={onShowDetails}
          style={{ cursor: "pointer" }}
        >
          <span>View Details</span>
          <Image
            className={styles.svgIcon}
            width={17}
            height={16}
            alt="arrow icon"
            src="/SVG.svg"
          />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.infoItem}>
          <Image
            width={24}
            height={24}
            alt="Calendar"
            src="/calendar_month.svg"
          />
          <span>{formatDisplayDate(appointment.date)}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Clock" src="/Vector.svg" />
          <span>{formatDisplayTime(appointment.time)}</span>
        </div>
        <div
          className={styles.infoItem}
          style={{ position: "relative", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
          ref={dropdownRef}
        >
          <span
            className={`${styles.statusButton} ${styles[appointment.status]}`}
          ></span>
          <span>
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </span>
          {(appointment.status === "pending" ||
            appointment.status === "confirmed") && (
            <>
              <Image
                className={styles.dropdownIcon}
                width={24}
                height={24}
                alt="Dropdown"
                src="/arrow_drop_down.svg"
                style={{ cursor: "pointer" }}
              />
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  {getAvailableStatusOptions(appointment.status).map(
                    (item) => (
                      <div
                        key={item}
                        className={`${styles.dropdownItem} ${
                          hovered === item ? styles.active : ""
                        }`}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered("")}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Selected new status:", item);
                          setShowDropdown(false);
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </div>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AppointmentsClient: NextPage<{ initialAppointments: Appointment[] }> = ({
  initialAppointments,
}) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const filteredAppointments = useMemo(() => {
    if (!initialAppointments) return [];
    switch (activeFilter) {
      case "upcoming":
        return initialAppointments.filter(
          (app) => app.status === "pending" || app.status === "confirmed"
        );
      case "completed":
        return initialAppointments.filter((app) => app.status === "completed");
      case "canceled":
        return initialAppointments.filter((app) => app.status === "canceled");
      default:
        return [];
    }
  }, [activeFilter, initialAppointments]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAppointment(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div className={styles.appointmentsPage}>
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>Appointments</h1>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "upcoming" ? styles.active : ""
              }`}
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "completed" ? styles.active : ""
              }`}
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "canceled" ? styles.active : ""
              }`}
              onClick={() => setActiveFilter("canceled")}
            >
              Cancelled
            </button>
          </div>
        </div>

        <div className={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onShowDetails={() => setSelectedAppointment(appointment)}
              />
            ))
          ) : (
            <p className={styles.noAppointments}>
              No {activeFilter} appointments found.
            </p>
          )}
        </div>
      </main>

      {selectedAppointment && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className={styles.calendarSelectChangeSize}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.facilityNameParent}>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Appointment Status</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.status.charAt(0).toUpperCase() +
                    selectedAppointment.status.slice(1)}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Facility Name</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.provider?.business_name || 'N/A'}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Address</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.address}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Contact Number</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.provider?.contact_number || 'Not Provided'}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Date</div>
                <b className={styles.facilityNameCap}>
                  {formatDisplayDate(selectedAppointment.date)}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Hours</div>
                <b className={styles.facilityNameCap}>
                  {formatDisplayTime(selectedAppointment.time)}
                </b>
              </div>

              <Image
                className={styles.dividerIcon}
                width={390}
                height={1}
                sizes="100vw"
                alt=""
                src="/Divider1.svg"
              />

              <div className={styles.serviceNameParent}>
                {selectedAppointment.services && selectedAppointment.services.length > 0 ? (
                  selectedAppointment.services.map((service, index) => (
                    <div className={styles.rowContainer} key={`service-${index}`}>
                      <div className={styles.facilityName}>{service.name}</div>
                      <b className={styles.facilityNameCap}>
                        PHP {service.price.toFixed(2)}
                      </b>
                    </div>
                  ))
                ) : (
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>No services listed</div>
                    <b className={styles.facilityNameCap}>PHP 0.00</b>
                  </div>
                )}
              </div>

              <Image
                className={styles.dividerIcon1}
                width={390}
                height={1}
                sizes="100vw"
                alt=""
                src="/Divider1.svg"
              />

              <div className={styles.rowContainerTotal}>
                <div className={styles.facilityName}>Total</div>
                <b className={styles.facilityNameCap}>
                  PHP {(selectedAppointment.price ?? 0).toFixed(2)}
                </b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsClient;
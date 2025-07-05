// app/appointments/appointments.tsx

"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo } from "react";
import styles from "../styles/appointments.module.css";

export type Appointment = {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  address: string;
  provider: {
    business_name: string;
    picture_url: string | null; 
  } | null;
};


const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
};

const formatDisplayTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const providerName = appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";

  const avatarUrl = appointment.provider?.picture_url || '/circle.svg';

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
        <div className={styles.viewDetails}>
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
          <span>{`${formatDisplayDate(appointment.date)} at ${formatDisplayTime(appointment.time)}`}</span>
        </div>
        <div className={styles.infoItem}>
          <span
            className={`${styles.statusButton} ${styles[appointment.status]}`}
          ></span>
          <span>
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
// This filtering component remains the same
const AppointmentsClient: NextPage<{ initialAppointments: Appointment[] }> = ({
  initialAppointments,
}) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
console.log("Data received by client:", initialAppointments);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

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
              onClick={() => handleFilterChange("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "completed" ? styles.active : ""
              }`}
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "canceled" ? styles.active : ""
              }`}
              onClick={() => handleFilterChange("canceled")}
            >
              Cancelled
            </button>
          </div>
        </div>

        <div className={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p className={styles.noAppointments}>
              No {activeFilter} appointments found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentsClient;
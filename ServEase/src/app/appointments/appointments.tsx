"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/appointments.module.css";
import { type Appointment } from "../lib/supabase/types"; // Import the type

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const appointmentDate = new Date(appointment.start_time);
  const time = appointmentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = appointmentDate.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' });

  const providerName = appointment.provider?.[0]?.business_name || 'Unknown Provider';
  const providerAddress = appointment.provider?.[0]?.address || 'No address provided';
  const status = appointment.status || 'unknown';

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.cardHeader}>
        <Image
          className={styles.cardAvatar}
          width={100}
          height={100}
          alt="Service Provider Avatar"
          src="/circle.svg" 
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
          <Image width={26} height={26} alt="Calendar" src="/calendar_month.svg" />
          <span>{date}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Clock" src="/Vector.svg" />
          <span>{time}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Status" src="/circle.svg" />
          {/* Dynamically set status class for styling */}
          <span className={styles[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};


const AppointmentsClient: NextPage<{ initialAppointments: Appointment[] }> = ({ initialAppointments }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredAppointments = useMemo(() => {
    if (!initialAppointments) return [];
    switch (activeFilter) {
      case 'upcoming':
        return initialAppointments.filter(app => app.status === 'pending' || app.status === 'confirmed');
      case 'completed':
        return initialAppointments.filter(app => app.status === 'completed');
      case 'cancelled':
        return initialAppointments.filter(app => app.status === 'canceled');
      default:
        return [];
    }
  }, [activeFilter, initialAppointments]);

  return (
    <div className={styles.appointmentsPage}>
      <header className={styles.navigation}>
        <div className={styles.navBrand}>
          <Image className={styles.logoIcon} width={40} height={40} alt="Servease Logo" src="/Servease Logo.svg" />
          <div className={styles.logoText}>
            <span className={styles.serv}>serv</span><span className={styles.ease}>ease</span>
          </div>
        </div>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} onClick={() => router.push("/client-dashboard")}>Home</a>
          <a className={styles.navLink}>Discover</a>
          <a className={styles.navLink} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>Contact Us</a>
        </nav>
        <div className={styles.genericAvatar}>
          <Image className={styles.avatarPlaceholderIcon} width={28.2} height={25.6} alt="User Avatar" src="/Avatar.svg" />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>Appointments</h1>
          <div className={styles.filterButtons}>
            <button className={`${styles.filterButton} ${activeFilter === "upcoming" ? styles.active : ""}`} onClick={() => handleFilterChange("upcoming")}>Upcoming</button>
            <button className={`${styles.filterButton} ${activeFilter === "completed" ? styles.active : ""}`} onClick={() => handleFilterChange("completed")}>Completed</button>
            <button className={`${styles.filterButton} ${activeFilter === "cancelled" ? styles.active : ""}`} onClick={() => handleFilterChange("cancelled")}>Cancelled</button>
          </div>
        </div>

        <div className={styles.appointmentsList}>
          {/* --- DYNAMICALLY RENDER a list or a message --- */}
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p className={styles.noAppointments}>No {activeFilter} appointments found.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        {/* ... your footer code remains the same ... */}
      </footer>
    </div>
  );
};

export default AppointmentsClient;
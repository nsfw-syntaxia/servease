'use client'

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/appointments.module.css";

// A single Appointment Card component for reusability
const AppointmentCard = () => (
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
        <h3 className={styles.serviceFacilityName}>
          Service Facility Name
        </h3>
        <p className={styles.location}>Location</p>
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
          width={26}
          height={26}
          alt="Calendar"
          src="/calendar_month.svg"
        />
        <span>Wed, June 30</span>
      </div>
      <div className={styles.infoItem}>
        <Image
          width={21}
          height={21}
          alt="Clock"
          src="/Vector.svg"
        />
        <span>1:00 PM</span>
      </div>
      <div className={styles.infoItem}>
        <Image
          width={21}
          height={21}
          alt="Status"
          src="/circle.svg" 
        />
        <span className={styles.confirmed}>Confirmed</span>
      </div>
    </div>
  </div>
);


const Appointments: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className={styles.appointmentsPage}>
      {/* ===== NAVIGATION BAR ===== */}
       <header className={styles.navigation}>
        {/* New wrapper for logo and brand name */}
        <div className={styles.navBrand}>
            <Image
              className={styles.logoIcon}
              width={40}
              height={40}
              alt="Servease Logo"
              src="/Servease Logo.svg"
            />
            <div className={styles.logoText}>
              <span className={styles.serv}>serv</span>
              <span className={styles.ease}>ease</span>
            </div>
        </div>

        <nav className={styles.navLinks}>
          <a className={styles.navLink}>Home</a>
          <a className={styles.navLink}>Discover</a>
          <a className={styles.navLink}>Contact Us</a>
        </nav>

        <div className={styles.genericAvatar}>
          <Image
            className={styles.avatarPlaceholderIcon}
            width={28.2}
            height={25.6}
            alt="User Avatar"
            src="/Avatar.svg"
          />
        </div>
      </header>

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
                  activeFilter === "cancelled" ? styles.active : ""
                }`}
                onClick={() => handleFilterChange("cancelled")}
              >
                Cancelled
              </button>
            </div>
        </div>

        <div className={styles.appointmentsList}>
          {activeFilter === 'upcoming' && (
            <>
              <AppointmentCard />
              <AppointmentCard />
            </>
          )}
           {activeFilter === 'completed' && (
             <p>No completed appointments yet.</p>
          )}
           {activeFilter === 'cancelled' && (
             <p>No cancelled appointments yet.</p>
          )}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                  <Image
                      className={styles.logoIcon}
                      width={40}
                      height={40}
                      alt="Servease Logo"
                      src="/Servease Logo (Album Cover) (3) 2.png"
                    />
                  <b className={styles.footerTitle}>servease</b>
              </div>
              <p className={styles.yourTrustedPlatform}>
                Your trusted platform to discover, book, and manage local
                services—anytime, anywhere.
              </p>
            </div>
            <div className={styles.footerColumn}>
              <b className={styles.footerTitle}>Quick Links</b>
              <a className={styles.footerLink}>Home</a>
              <a className={styles.footerLink}>Discover</a>
              <a className={styles.footerLink}>Create an Account</a>
            </div>
            <div className={styles.footerColumn}>
              <b className={styles.footerTitle}>Support</b>
              <a className={styles.footerLink}>FAQs</a>
              <a className={styles.footerLink}>Privacy Policy</a>
              <a className={styles.footerLink}>Terms & Conditions</a>
              <a className={styles.footerLink}>About Us</a>
            </div>
            <div className={styles.footerColumn}>
              <b className={styles.footerTitle}>Contact Us</b>
              <a className={styles.footerLink}>support@servease.com</a>
              <a className={styles.footerLink}>+63 996 3175 214</a>
            </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerLine} />
          <p>servease 2025 © All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Appointments;
"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/servicesoffered.module.css";

const mockServices = [
  {
    id: 1,
    name: "service name 1",
    description: "description",
    price: "P500.00",
    duration: "30 min.",
  },
  {
    id: 2,
    name: "service name 1",
    description: "description",
    price: "P500.00",
    duration: "30 min.",
  },
  {
    id: 3,
    name: "service name 1",
    description: "description",
    price: "P500.00",
    duration: "30 min.",
  },
];

const ServiceRow = ({
  service,
  isEditMode,
  onDelete,
}: {
  service: any;
  isEditMode: boolean;
  onDelete: (id: number) => void;
}) => (
  <div
    className={`${styles.serviceRow} ${isEditMode ? styles.editModeRow : ""}`}
  >
    <div className={styles.tableCell}>{service.name}</div>
    <div className={styles.tableCell}>{service.description}</div>
    <div className={styles.tableCell}>{service.price}</div>
    <div className={`${styles.tableCell} ${styles.durationCellContent}`}>
      <span>{service.duration}</span>
      {isEditMode && (
        <div className={styles.rowActions}>
          <Image
            width={20}
            height={20}
            alt="Edit Service"
            src="/edit_black.svg"
            className={styles.actionIcon}
          />
          <Image
            width={20}
            height={20}
            alt="Delete Service"
            src="/delete.svg"
            className={styles.actionIcon}
            onClick={() => onDelete(service.id)}
          />
        </div>
      )}
    </div>
  </div>
);

const ServicesOfferedPage: NextPage = () => {
  const [services, setServices] = useState(mockServices);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleDeleteService = (idToDelete: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== idToDelete)
    );
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.navigation}>
        <div className={styles.navBrand}>
          <Image
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
          <a
            className={styles.navLink}
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            Contact Us
          </a>
        </nav>
        <div className={styles.userAvatar}>
          <Image width={28} height={26} alt="User Avatar" src="/Avatar.svg" />
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.profileTitle}>Profile</h1>

        <div className={styles.servicesHeader}>
          <div className={styles.backArrow}>
            <Image width={26} height={26} alt="Back" src="/Arrow Left.svg" />
          </div>
          <h2 className={styles.servicesTitle}>Services Offered</h2>
        </div>

        <div className={styles.servicesTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Service Name</div>
            <div className={styles.headerCell}>Description</div>
            <div className={styles.headerCell}>Price</div>
            <div className={styles.headerCell}>Duration</div>
          </div>

          <div className={styles.tableBody}>
            {services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                isEditMode={isEditMode}
                onDelete={handleDeleteService}
              />
            ))}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.btn} ${
              isEditMode ? styles.doneButton : styles.editButton
            }`}
            onClick={toggleEditMode}
          >
            <Image
              width={20}
              height={20}
              alt={isEditMode ? "Done" : "Edit"}
              src={isEditMode ? "/check_thin.svg" : "/edit.svg"}
            />
            <span>{isEditMode ? "Done" : "Edit"}</span>
          </button>
          <button className={`${styles.btn} ${styles.addButton}`}>
            <Image width={18} height={18} alt="Add" src="/plus.svg" />
            <span>Add Service</span>
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <Image
                width={40}
                height={40}
                alt="Servease Logo"
                src="/Servease Logo (Album Cover) (3) 2.png"
              />
              <b>servease</b>
            </div>
            <p>
              Your trusted platform to discover, book, and manage local
              services—anytime, anywhere.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <b>Quick Links</b>
            <a className={styles.footerLink}>Home</a>
            <a className={styles.footerLink}>Discover</a>
            <a className={styles.footerLink}>Create an Account</a>
          </div>
          <div className={styles.footerColumn}>
            <b>Support</b>
            <a className={styles.footerLink}>FAQs</a>
            <a className={styles.footerLink}>Privacy Policy</a>
            <a className={styles.footerLink}>Terms & Conditions</a>
            <a className={styles.footerLink}>About Us</a>
          </div>
          <div className={styles.footerColumn}>
            <b>Contact Us</b>
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

export default ServicesOfferedPage;

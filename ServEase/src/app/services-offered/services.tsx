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
    </div>
  );
};

export default ServicesOfferedPage;

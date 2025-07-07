"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import styles from "../styles/facility-appointments.module.css";
import { type Appointment, updateAppointmentStatus } from "./actions";

const capitalize = (s: string) => {
  if (typeof s !== "string" || s.length === 0) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const AppointmentCard = ({
  appointment,
  onShowDetails,
  onStatusChange,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
  onStatusChange: (id: number, newStatus: Appointment["status"]) => void;
}) => {
  const clientName = appointment.service?.[0]?.client_name || "Unknown Client";
  const serviceType =
    appointment.service?.[0]?.service_type || "Unknown Service";
  const clientAvatar = appointment.client_avatar_url || "/avatar.svg";

  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAvailableStatusOptions = (
    status: string
  ): Appointment["status"][] => {
    if (status === "pending") return ["confirmed", "canceled"];
    if (status === "confirmed") return ["completed", "canceled"];
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
          width={100}
          height={100}
          alt="Client Avatar"
          src={clientAvatar} // use the fetched avatar url
        />
        <div className={styles.cardHeaderText}>
          <h3 className={styles.clientName}>{clientName}</h3>
          <p className={styles.serviceType}>{serviceType}</p>
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
            width={26}
            height={26}
            alt="Calendar"
            src="/calendar_month.svg"
          />
          <span>{appointment.display_date}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Clock" src="/Vector.svg" />
          <span>{appointment.display_time}</span>
        </div>
        <div
          className={styles.infoItem}
          style={{ position: "relative" }}
          onClick={(e) => {
            e.stopPropagation();
            if (
              appointment.status === "pending" ||
              appointment.status === "confirmed"
            ) {
              setShowDropdown((prev) => !prev);
            }
          }}
          ref={dropdownRef}
        >
          <span
            className={`${styles.statusButton} ${styles[appointment.status]}`}
          ></span>
          <span>{appointment.display_status}</span>

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
                    (item, index) => (
                      <div
                        key={item}
                        className={`${styles.dropdownItem} ${
                          hovered === item ? styles.active : ""
                        }`}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered("")}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStatusChange(appointment.id, item);
                          setShowDropdown(false);
                        }}
                      >
                        {capitalize(item)}
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

const AppointmentsFacility: NextPage<{
  initialAppointments: Appointment[];
}> = ({ initialAppointments }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAppointment(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleStatusChange = async (
    appointmentId: number,
    newStatus: Appointment["status"]
  ) => {
    const result = await updateAppointmentStatus(appointmentId, newStatus);

    if (result.error) {
      alert(`Error: ${result.error}`);
      return;
    }

    // if the database update succeeds, update the local state to reflect the change instantly
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointmentId
          ? { ...app, status: newStatus, display_status: capitalize(newStatus) } // also update the display status
          : app
      )
    );
  };

  const filteredAppointments = useMemo(() => {
    switch (activeFilter) {
      case "upcoming":
        return appointments.filter((app) => app.status === "confirmed");
      case "pending":
        return appointments.filter((app) => app.status === "pending");
      case "completed":
        return appointments.filter((app) => app.status === "completed");
      case "canceled":
        return appointments.filter((app) => app.status === "canceled");
      default:
        return [];
    }
  }, [activeFilter, appointments]);

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
                activeFilter === "pending" ? styles.active : ""
              }`}
              onClick={() => handleFilterChange("pending")}
            >
              Pending
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
              Canceled
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
                onStatusChange={handleStatusChange}
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
                  {selectedAppointment.display_status}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Client Name</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.service[0].client_name}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Service</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.service[0].service_type}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Phone Number</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.phone_number}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Date</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.display_date}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Hours</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.display_time}
                </b>
              </div>
              <Image
                className={styles.dividerIcon}
                width={390}
                height={1}
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.serviceNameParent}>
                <div className={styles.rowContainer}>
                  <div className={styles.facilityName}>
                    {selectedAppointment.service[0].service_type}
                  </div>
                  <b className={styles.facilityNameCap}>
                    PHP {selectedAppointment.price.toFixed(2)}
                  </b>
                </div>
              </div>
              <Image
                className={styles.dividerIcon1}
                width={390}
                height={1}
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.rowContainerTotal}>
                <div className={styles.facilityName}>Total</div>
                <b className={styles.facilityNameCap}>
                  PHP {selectedAppointment.price.toFixed(2)}
                </b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsFacility;

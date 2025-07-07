"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { createClient } from "../lib/supabase/client";
import styles from "../styles/client-appointments.module.css";

export interface ClientInfo {
  full_name: string;
  email: string;
}
export interface ProviderInfo {
  business_name: string;
  picture_url: string | null;
  contact_number: string | null;
  email: string;
}
export interface ServiceInfo {
  name: string;
  price: number;
}
export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  address: string;
  price: number;
  services: ServiceInfo[];
  provider: ProviderInfo | null;
  client: ClientInfo | null;
}

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
  onStatusUpdate,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
  onStatusUpdate: (appointmentId: string, newStatus: string) => void;
}) => {
  const providerName =
    appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";
  const avatarUrl = appointment.provider?.picture_url || "/circle.svg";
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAvailableStatusOptions = (status: string): string[] => {
    if (status === "pending" || status === "confirmed") return ["canceled"];
    return [];
  };

  const getStatusDisplayText = (status: string): string => {
    return status === "canceled"
      ? "Cancel"
      : status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await onStatusUpdate(appointment.id, newStatus);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    } finally {
      setIsUpdating(false);
    }
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
            if (!isUpdating) {
              setShowDropdown((prev) => !prev);
            }
          }}
          ref={dropdownRef}
        >
          <span
            className={`${styles.statusButton} ${styles[appointment.status]}`}
          ></span>
          <span>
            {isUpdating
              ? "Updating..."
              : appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
          </span>
          {(appointment.status === "pending" ||
            appointment.status === "confirmed") &&
            !isUpdating && (
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
                            handleStatusChange(item);
                          }}
                        >
                          {getStatusDisplayText(item)}
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
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );
  const [isCancelling, setIsCancelling] = useState(false); // For loading state

  const supabase = createClient();

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    switch (activeFilter) {
      case "upcoming":
        return appointments.filter(
          (app) => app.status === "pending" || app.status === "confirmed"
        );
      case "completed":
        return appointments.filter((app) => app.status === "completed");
      case "canceled":
        return appointments.filter((app) => app.status === "canceled");
      default:
        return [];
    }
  }, [activeFilter, appointments]);

  const handleStatusUpdate = (appointmentId: string, newStatus: string) => {
    if (newStatus === "canceled") {
      setAppointmentToCancel(appointmentId);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;

    const appointmentData = appointments.find(
      (apt) => apt.id === appointmentToCancel
    );

    if (
      !appointmentData ||
      !appointmentData.provider ||
      !appointmentData.client
    ) {
      alert(
        "Error: Could not find appointment details. Please refresh the page."
      );
      setShowConfirmDialog(false);
      return;
    }

    setIsCancelling(true);

    try {
      const { error: dbError } = await supabase
        .from("appointments")
        .update({ status: "canceled" })
        .eq("id", appointmentToCancel)
        .select("id, status");

      if (dbError) {
        throw dbError;
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentToCancel ? { ...apt, status: "canceled" } : apt
        )
      );

      const payload = {
        clientName: appointmentData.client.full_name,
        clientEmail: appointmentData.client.email,
        providerName: appointmentData.provider.business_name,
        providerEmail: appointmentData.provider.email,
        providerContact:
          appointmentData.provider.contact_number || "Not Provided",
        address: appointmentData.address,
        date: appointmentData.date,
        time: appointmentData.time,
        status: "Cancelled",
        services: appointmentData.services,
        totalPrice: appointmentData.price,
      };

      fetch("/api/cancel-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((emailError) => {
        console.error("Sending email notifications failed:", emailError);
      });
    } catch (error: any) {
      console.error("Error canceling appointment:", error);
      alert(`Cancellation failed: ${error.message}`);
    } finally {
      setIsCancelling(false);
      setShowConfirmDialog(false);
      setAppointmentToCancel(null);
    }
  };

  const handleCancelCancel = () => {
    setShowConfirmDialog(false);
    setAppointmentToCancel(null);
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAppointment(null);
        if (showConfirmDialog) {
          handleCancelCancel();
        }
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showConfirmDialog]);

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
                onStatusUpdate={handleStatusUpdate}
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
                <div className={styles.facilityName}>Client Name</div>
                <b className={styles.facilityNameCap}>
                  {selectedAppointment.client?.full_name || "N/A"}
                </b>
              </div>
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
                  {selectedAppointment.provider?.business_name || "N/A"}
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
                  {selectedAppointment.provider?.contact_number ||
                    "Not Provided"}
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
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.serviceNameParent}>
                {selectedAppointment.services.map((service, index) => (
                  <div className={styles.rowContainer} key={`service-${index}`}>
                    <div className={styles.facilityName}>{service.name}</div>
                    <b className={styles.facilityNameCap}>
                      PHP {service.price.toFixed(2)}
                    </b>
                  </div>
                ))}
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

      {showConfirmDialog && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmDialog}>
            <h3>Cancel Appointment</h3>
            <p>
              Are you sure you want to cancel this appointment? This action
              cannot be undone and email notifications will be sent.
            </p>
            <div className={styles.confirmButtons}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelCancel}
                disabled={isCancelling}
              >
                Keep Appointment
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmCancel}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsClient;

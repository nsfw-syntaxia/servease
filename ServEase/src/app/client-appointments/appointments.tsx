"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { createClient } from "../lib/supabase/client";
import styles from "../styles/client-appointments.module.css";
import { X, Star } from "lucide-react";

interface ReviewFormData {
  rating: number;
  reviewText: string;
  name: string;
  email: string;
}

interface ReviewFormProps {
  onClose?: () => void;
  onSubmit?: (data: ReviewFormData) => void;
}

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
  onStatusUpdate,
  onShowReview,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
  onShowReview: () => void;
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
      // You might want to show a toast notification here
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
          {appointment.status === "completed" && (
            <>
              <Image
                className={styles.reviewIcon}
                width={24}
                height={24}
                alt="review"
                src="/review.svg"
                style={{ cursor: "pointer" }}
                onClick={onShowReview}
              />
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

  const handleStatusUpdate = async (
    appointmentId: string,
    newStatus: string
  ) => {
    if (newStatus === "canceled") {
      setAppointmentToCancel(appointmentId);
      setShowConfirmDialog(true);
      return;
    }

    await updateAppointmentStatus(appointmentId, newStatus);
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      console.log(
        `Attempting to update appointment ${appointmentId} to status ${newStatus}`
      );

      const { data, error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", appointmentId)
        .select();

      if (error) {
        console.error("Supabase error details:", error);
        throw new Error(`Failed to update appointment: ${error.message}`);
      }

      console.log("Update successful, data:", data);

      // Update local state
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: newStatus as
                  | "pending"
                  | "confirmed"
                  | "completed"
                  | "canceled",
              }
            : apt
        )
      );

      // Update selected appointment if it's the one being updated
      if (selectedAppointment?.id === appointmentId) {
        setSelectedAppointment((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus as
                  | "pending"
                  | "confirmed"
                  | "completed"
                  | "canceled",
              }
            : null
        );
      }

      console.log(
        `Appointment ${appointmentId} status updated to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // Show user-friendly error message
      alert(
        `Failed to update appointment status. Please try again. Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  };

  const handleConfirmCancel = async () => {
    if (appointmentToCancel) {
      try {
        await updateAppointmentStatus(appointmentToCancel, "canceled");
        setShowConfirmDialog(false);
        setAppointmentToCancel(null);
      } catch (error) {
        console.error("Error canceling appointment:", error);
        // Don't close the dialog if there's an error, let user try again
      }
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

  /*review */
  const [selectedAppointmentReview, setSelectedAppointmentReview] =
    useState<Appointment | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && reviewText.trim() && name.trim()) {
      const formData: ReviewFormData = {
        rating,
        reviewText: reviewText.trim(),
        name: name.trim(),
        email: email.trim(),
      };

      setIsSubmitted(true);
      //ichange lang ni to sumbit jd sa datbase poo
      setSelectedAppointmentReview(null);

      // Reset form after a delay
      setTimeout(() => {
        handleCancel();
      }, 2000);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoveredRating(0);
    setReviewText("");
    setName("");
    setEmail("");
    setIsSubmitted(false);
    setSelectedAppointmentReview(null);
  };

  const getRatingText = (rating: number): string => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  const isFormValid = rating > 0 && reviewText.trim() && name.trim();

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
                onShowReview={() => setSelectedAppointmentReview(appointment)}
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

      {/* Appointment Details Modal */}
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
                sizes="100vw"
                alt=""
                src="/Divider1.svg"
              />

              <div className={styles.serviceNameParent}>
                {selectedAppointment.services &&
                selectedAppointment.services.length > 0 ? (
                  selectedAppointment.services.map((service, index) => (
                    <div
                      className={styles.rowContainer}
                      key={`service-${index}`}
                    >
                      <div className={styles.facilityName}>{service.name}</div>
                      <b className={styles.facilityNameCap}>
                        PHP {service.price.toFixed(2)}
                      </b>
                    </div>
                  ))
                ) : (
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>
                      No services listed
                    </div>
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

      {showConfirmDialog && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmDialog}>
            <h3>Cancel Appointment</h3>
            <p>
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </p>
            <div className={styles.confirmButtons}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelCancel}
              >
                Keep Appointment
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmCancel}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/*review form*/}
      {selectedAppointmentReview && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={handleCancel}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className={styles.title}>Write a Review</h2>
            <p className={styles.subtitle}>
              Share your experience at{" "}
              {selectedAppointmentReview.provider?.business_name} to help others
              make informed decisions.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Rating *</label>
                <div className={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={styles.starButton}
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        size={24}
                        className={`${styles.star} ${
                          star <= (hoveredRating || rating)
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        fill={
                          star <= (hoveredRating || rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className={styles.ratingText}>{getRatingText(rating)}</p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="name">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="review">
                  Review *
                </label>
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={styles.textarea}
                  placeholder="Tell us about your experience..."
                  maxLength={500}
                  required
                />
                <p className={styles.charCounter}>
                  {reviewText.length}/500 characters
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButtonReview}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`${styles.submitButton} ${
                    !isFormValid ? styles.submitButtonDisabled : ""
                  }`}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsClient;

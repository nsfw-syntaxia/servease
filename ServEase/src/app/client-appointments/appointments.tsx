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
  client_id: string; 
  provider_id: string; 
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
  onShowReview,
  onStatusUpdate,
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

  /*review */
  const [selectedAppointmentReview, setSelectedAppointmentReview] =
    useState<Appointment | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // RATING SYSTEM CHANGE 2: Add loading state for submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // RATING SYSTEM CHANGE 3: Pre-fill the name when the modal opens for better UX
  useEffect(() => {
    if (selectedAppointmentReview) {
      setName(selectedAppointmentReview.client?.full_name || "");
    }
  }, [selectedAppointmentReview]);

  // RATING SYSTEM CHANGE 4: Implement the review submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedAppointmentReview) {
      alert("Please ensure you have selected a rating and filled all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data for the 'reviews' table based on its fields:
      // client_id, provider_id, rating, comment, client_name
      const reviewPayload = {
        appointment_id : selectedAppointmentReview.id,
        client_id: selectedAppointmentReview.client_id,
        provider_id: selectedAppointmentReview.provider_id,
        service_name: selectedAppointmentReview.services?.[0]?.name || 'Unknown Service', 
        rating: rating,
        comment: reviewText.trim(),
        client_name: name.trim(),
      };

      const { error } = await supabase.from("reviews").insert([reviewPayload]);
      if (error) {
        console.log("Submitting this payload to 'reviews' table:", reviewPayload);

        console.error("Error submitting review:", error);
        alert(`Failed to submit review: ${error.message}`);
      } else {
        // On success, show a confirmation message and then close the modal
        setIsSubmitted(true);
        setTimeout(() => {
          handleCancel(); // This function already resets state and closes the modal
        }, 2000); // Wait 2 seconds before closing
      }
    } catch (err: any) {
      console.error("An unexpected error occurred during review submission:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      // Ensure the submitting state is reset regardless of outcome
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoveredRating(0);
    setReviewText("");
    setName("");
    setEmail("");
    setIsSubmitted(false);
    setIsSubmitting(false); // Also reset submitting state
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
              {selectedAppointmentReview.provider?.business_name || "N/A"} to
              help others make informed decisions.
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
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`${styles.submitButton} ${
                    !isFormValid || isSubmitting
                      ? styles.submitButtonDisabled
                      : ""
                  }`}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isSubmitted
                    ? "Submitted!"
                    : "Submit Review"}
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
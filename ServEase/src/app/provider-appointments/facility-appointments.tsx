/*
dropdown for appointment status management

const Dropdown: NextPage = () => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.image8Wrapper}>
        <div className={styles.image8} />
      </div>
      <div className={styles.image11Parent}>
        <div className={styles.image11} />
        <div className={styles.paraContentWrapper}>
          <div className={styles.paraContent}>
            <div className={styles.confirmed}>Confirmed</div>
          </div>
        </div>
        <div className={styles.paraContentContainer}>
          <div className={styles.paraContent1}>
            <div className={styles.pending}>Pending</div>
          </div>
        </div>
        <div className={styles.paraContentFrame}>
          <div className={styles.paraContent}>
            <div className={styles.pending}>Completed</div>
          </div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.paraContent}>
            <div className={styles.pending}>Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
*/

/*
css for dropdown menu

note:
if upcoming, show "completed" and "canceled"
if pending, show "confirmed" and "canceled"

.image8 {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  	border-radius: var(--br-12);
  	background-color: var(--color-white);
  	width: 186px;
  	height: 255px;
}

.image8Wrapper {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	width: 186px;
  	height: 255px;
}

.image11 {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	border-radius: var(--br-12) var(--br-12) 0px 0px;
  	background-color: var(--color-tan);
  	width: 186px;
  	height: 67.5px;
}

.confirmed {
  	position: relative;
  	line-height: 26px;
  	font-weight: 600;
}
.paraContent {
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}

.paraContentWrapper {
  	position: absolute;
  	top: 19.69px;
  	left: 25px;
  	width: 135.9px;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
  	color: var(--color-white);
}

.pending {
  	position: relative;
  	line-height: 26px;
}

.paraContent1 {
  	width: 128px;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}

.paraContentContainer {
  	position: absolute;
  	top: 81.39px;
  	left: 25px;
  	width: 76.6px;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}

.paraContentFrame {
  	position: absolute;
  	top: 143.09px;
  	left: 25px;
  	width: 135.9px;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}

.frameDiv {
  	position: absolute;
  	top: 204.79px;
  	left: 25px;
  	width: 135.9px;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}

.image11Parent {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	width: 186px;
  	height: 230.8px;
}

.dropdown {
  	width: 100%;
  	position: relative;
  	height: 255px;
  	text-align: left;
  	font-size: var(--font-size-18);
  	color: var(--color-gray);
  	font-family: var(--font-dm-sans);
}
*/

"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/facility-appointments.module.css";
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

// updated appointment type definition
type Appointment = {
  id: number;
  start_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  service: Array<{
    client_name: string;
    service_type: string;
  }>;
};

// updated mock Data with client_name and service_type
const mockAppointments: Appointment[] = [
  {
    id: 1,
    start_time: new Date(2025, 7, 10, 10, 0).toISOString(), // August 10, 2025, 10:00 AM
    status: "pending",
    service: [
      {
        client_name: "John Doe",
        service_type: "Haircut",
      },
    ],
  },
  {
    id: 2,
    start_time: new Date(2025, 7, 15, 14, 30).toISOString(), // August 15, 2025, 2:30 PM
    status: "completed",
    service: [
      {
        client_name: "Jane Smith",
        service_type: "Hair Coloring",
      },
    ],
  },
  {
    id: 3,
    start_time: new Date(2025, 6, 5, 9, 0).toISOString(), // July 5, 2025, 9:00 AM
    status: "canceled",
    service: [
      {
        client_name: "Mike Johnson",
        service_type: "Manicure",
      },
    ],
  },
  {
    id: 4,
    start_time: new Date(2025, 8, 1, 11, 0).toISOString(), // September 1, 2025, 11:00 AM
    status: "pending",
    service: [
      {
        client_name: "Sarah Williams",
        service_type: "Spa Treatment",
      },
    ],
  },
  {
    id: 5,
    start_time: new Date(2025, 7, 20, 16, 0).toISOString(), // August 20, 2025, 4:00 PM
    status: "confirmed",
    service: [
      {
        client_name: "David Brown",
        service_type: "Beard Trim",
      },
    ],
  },
];

const AppointmentCard = ({
  appointment,
  onShowDetails,
  onShowReview,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
  onShowReview: () => void;
}) => {
  const appointmentDate = new Date(appointment.start_time);
  const time = appointmentDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const date = appointmentDate.toLocaleDateString([], {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

  const clientName = appointment.service?.[0]?.client_name || "Unknown Client";
  const serviceType =
    appointment.service?.[0]?.service_type || "Unknown Service";

  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAvailableStatusOptions = (status: string): string[] => {
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
          src="/circle.svg"
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
          <span>{date}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Clock" src="/Vector.svg" />
          <span>{time}</span>
        </div>
        <div
          className={styles.infoItem}
          style={{ position: "relative" }}
          onClick={(e) => {
            e.stopPropagation(); // prevent bubbling to parent
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
                    (item, index) => {
                      const isActive = hovered === item;
                      const isFirst = index === 0;
                      const isLast =
                        index ===
                        getAvailableStatusOptions(appointment.status).length -
                          1;

                      let borderClass = "";
                      if (isActive && isFirst) borderClass = styles.activeTop;
                      else if (isActive && isLast)
                        borderClass = styles.activeBottom;

                      return (
                        <div
                          key={item}
                          className={`${styles.dropdownItem} ${
                            isActive ? styles.active : ""
                          } ${borderClass}`}
                          onMouseEnter={() => setHovered(item)}
                          onMouseLeave={() => setHovered("")}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent click bubbling to parent (and closing)
                            console.log("Selected new status:", item);
                            setShowDropdown(false);
                          }}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </div>
                      );
                    }
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

const AppointmentsFacility: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const router = useRouter();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

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

  const filteredAppointments = useMemo(() => {
    switch (activeFilter) {
      case "upcoming":
        return mockAppointments.filter(
          (app) => app.status === "confirmed" // only confirmed appointments for upcoming
        );
      case "pending":
        return mockAppointments.filter((app) => app.status === "pending");
      case "completed":
        return mockAppointments.filter((app) => app.status === "completed");
      case "canceled":
        return mockAppointments.filter((app) => app.status === "canceled");
      default:
        return [];
    }
  }, [activeFilter]);

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
                onShowReview={() => setSelectedAppointmentReview(appointment)}
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
                <b className={styles.facilityNameCap}>+63 123 4567 789</b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Date</div>
                <b className={styles.facilityNameCap}>
                  {new Date(selectedAppointment.start_time).toLocaleDateString(
                    [],
                    { weekday: "short", month: "long", day: "numeric" }
                  )}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Hours</div>
                <b className={styles.facilityNameCap}>
                  {new Date(selectedAppointment.start_time).toLocaleTimeString(
                    [],
                    { hour: "numeric", minute: "2-digit" }
                  )}
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
                <div className={styles.rowContainer}>
                  <div className={styles.facilityName}>
                    {selectedAppointment.service[0].service_type}
                  </div>
                  <b className={styles.facilityNameCap}>PHP 500.00</b>
                </div>
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
                <b className={styles.facilityNameCap}>PHP 1000.00</b>
              </div>
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
              Share your experience to help others make informed decisions.
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
                <label className={styles.label} htmlFor="email">
                  Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your email"
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

export default AppointmentsFacility;

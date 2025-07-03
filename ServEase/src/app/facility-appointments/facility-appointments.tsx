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
if upcoming, show "completed" and "cancelled"
if pending, show "confirmed" and "cancelled"

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
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/facility-appointments.module.css";

// Updated Appointment type definition
type Appointment = {
  id: number;
  start_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  service: Array<{
    client_name: string;
    service_type: string;
  }>;
};

// Updated mock Data with client_name and service_type
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

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(appointment.status);

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

  const handleStatusClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(
      newStatus as "pending" | "confirmed" | "completed" | "canceled"
    );
    setIsDropdownOpen(false);
    // here you can add logic to update the appointment status in your backend
  };

  const dropdownOptions =
    selectedStatus === "pending"
      ? ["Confirmed", "Cancelled"]
      : selectedStatus === "confirmed"
      ? ["Completed", "Cancelled"]
      : [];

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
          <span>{date}</span>
        </div>
        <div className={styles.infoItem}>
          <Image width={21} height={21} alt="Clock" src="/Vector.svg" />
          <span>{time}</span>
        </div>
        <div className={styles.infoItem}>
          <span
            className={`${styles.statusButton} ${styles[selectedStatus]}`}
          ></span>
          <span onClick={handleStatusClick} style={{ cursor: "pointer" }}>
            {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
          </span>
          <Image
            className={styles.dropdownIcon}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/arrow_drop_down.svg"
            onClick={handleStatusClick}
            style={{ cursor: "pointer" }}
          />
          {isDropdownOpen && dropdownOptions.length > 0 && (
            <div className={styles.dropdown}>
              {dropdownOptions.map((option) => (
                <div
                  key={option}
                  className={styles.dropdownOption}
                  onClick={() => handleStatusChange(option.toLowerCase())}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AppointmentsFacility: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const router = useRouter();

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
      case "cancelled":
        return mockAppointments.filter((app) => app.status === "canceled");
      default:
        return [];
    }
  }, [activeFilter]);

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
                activeFilter === "cancelled" ? styles.active : ""
              }`}
              onClick={() => handleFilterChange("cancelled")}
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

export default AppointmentsFacility;

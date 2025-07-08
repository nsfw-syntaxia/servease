"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-dashboard.module.css";
import {
  type DashboardStats,
  type UpcomingAppointment,
  type PendingAppointment,
} from "./actions";
import { useRouter } from "next/navigation";

type AppointmentProps = {
  clientName: string;
  service: string;
  timeslot: string;
  appointmentDate: string;
};

// update the overview component to accept props
const Overview = ({ stats }: { stats: DashboardStats }) => {
  // fix date display
  // always be the user's current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // make the stats data dynamic
  const statsData = [
    {
      icon: "/facility card.svg",
      value: `Php ${stats.todaysRevenue.toFixed(2)}`, // use real data
      label: "Today's Total Revenue",
      iconBg: styles.iconRevenue,
    },
    {
      icon: "/facility note.svg",
      value: stats.upcomingAppointmentsCount.toString(), // use real data
      label: "Today's Upcoming Appointments",
      iconBg: styles.iconAppointments,
    },
    {
      icon: "/facility heart.svg",
      // format likes to show 'K' for thousands
      value:
        stats.totalLikes > 999
          ? `${(stats.totalLikes / 1000).toFixed(2)}K`
          : stats.totalLikes.toString(),
      label: "Total Likes",
      iconBg: styles.iconLikes,
    },
    {
      icon: "/facility star.svg",
      value: `${stats.rating.toFixed(1)}/5.0`, // use real data
      label: "Ratings",
      iconBg: styles.iconRatings,
    },
  ];

  return (
    <section className={styles.overview}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Overview</h2>
          <p className={styles.dated}>{currentDate}</p>
        </div>
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={`${styles.iconWrapper} ${stat.iconBg}`}>
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={30}
                  height={30}
                />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UpcomingAppointments = ({
  clientName,
  service,
  timeslot,
  appointmentDate,
  avatarUrl,
}) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Image
            src={avatarUrl}
            alt={clientName}
            width={90}
            height={90}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <div className={styles.clientInfo}>
          <h3 className={styles.clientName}>{clientName}</h3>
          <p className={styles.service}>{service}</p>
        </div>
      </div>
      <div className={styles.appointmentDetails}>
        <div className={styles.timeSlot}>
          <span className={styles.clockIcon}>
            <Image
              width={17}
              height={17}
              sizes="100vw"
              alt="Clock icon"
              src="/appClock.svg"
            />
          </span>
          <span className={styles.time}>{timeslot}</span>
        </div>
        <div className={styles.dateInfo}>
          <span className={styles.calendarIcon}>
            <Image
              width={24}
              height={24}
              sizes="100vw"
              alt="Calendar icon"
              src="/appCalendar.svg"
            />
          </span>
          <span className={styles.date}>{appointmentDate}</span>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ clientName, serviceName, time, date }) => {
  return (
    <div className={styles.PappointmentCard}>
      <div className={styles.PclientName}>{clientName}</div>
      <div className={styles.PserviceName}>{serviceName}</div>
      <div className={styles.Ptime}>{time}</div>
      <div className={styles.Pdate}>{date}</div>
    </div>
  );
};

const DashboardFacility: NextPage<{
  initialStats: DashboardStats;
  upcomingAppointments: UpcomingAppointment[];
  pendingAppointments: PendingAppointment[];
}> = ({ initialStats, upcomingAppointments, pendingAppointments }) => {
  const router = useRouter();

  // fetch and display real data here later

  const pendingappointments = [
    {
      clientName: "Shan Michael Raboy",
      serviceName: "Haircut",
      time: "13:00",
      date: "November 1",
    },
    {
      clientName: "John Doe",
      serviceName: "Hair Color",
      time: "14:30",
      date: "November 1",
    },
    {
      clientName: "Jane Smith",
      serviceName: "Trim & Style",
      time: "16:00",
      date: "November 2",
    },
  ];

  return (
    <div className={styles.dashboardFacility}>
      <div className={styles.joinUs}>
        {/*hero Image */}
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImage}>
            <div className={styles.manageYour}>Manage your</div>
            <div className={styles.services}>Services</div>
            <Image
              className={styles.heroImageChild}
              width={95}
              height={15}
              sizes="100vw"
              alt=""
              src="/Group 126.svg"
            />
          </div>
        </div>

        <Overview stats={initialStats} />

        {/* upcoming appointments */}
        <div className={styles.upcomingAppointmentsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.upcomingAppointments}>
              <span className={styles.upcomingAppointmentsTxtContainer}>
                <span>Upcoming</span>
                <span className={styles.appointments}> Appointments</span>
              </span>
            </h2>
          </div>
          <div className={styles.appointmentsContainer}>
            {/* update this map to use the real data */}
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <UpcomingAppointments
                  key={appointment.id} // use the real ID for the key
                  clientName={appointment.clientName}
                  service={appointment.service}
                  timeslot={appointment.time}
                  appointmentDate={appointment.date}
                  avatarUrl={appointment.avatarUrl} // pass the new prop
                />
              ))
            ) : (
              // show a message if there are no appointments
              <p className={styles.noAppointmentsMessage}>
                No upcoming appointments today.
              </p>
            )}
          </div>
        </div>

        <div
          className={styles.button}
          onClick={() => router.push("/facility-appointments")}
        >
          <div className={styles.viewAll}>View All</div>
        </div>

        {/* pending appointments*/}
        <b className={styles.pendingAppointments}>
          <span className={styles.upcomingAppointmentsTxtContainer}>
            <span>Pending</span>
            <span className={styles.appointments}> Appointments</span>
          </span>
        </b>
        <div className={styles.TitlePappointmentCard}>
          <div className={styles.TitlePclientName}>Client Name</div>
          <div className={styles.TitlePserviceName}>Service</div>
          <div className={styles.TitlePtime}>Time</div>
          <div className={styles.TitlePdate}>Date</div>
        </div>
        <div className={styles.PappointmentsContainer}>
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                clientName={appointment.clientName}
                serviceName={appointment.serviceName}
                time={appointment.time}
                date={appointment.date}
              />
            ))
          ) : (
            <p className={styles.noAppointmentsMessage}>
              No pending appointments.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardFacility;

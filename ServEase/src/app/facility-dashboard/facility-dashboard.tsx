import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-dashboard.module.css";
import { DateLib } from "react-day-picker";

type AppointmentProps = {
  clientName: string;
  service: string;
  timeslot: string;
  appointmentDate: string;
};

const Overview = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const statsData = [
    {
      icon: "/facility card.svg",
      value: "Php 15,735.00",
      label: "Today's Total Revenue",
      iconBg: styles.iconRevenue,
    },
    {
      icon: "/facility note.svg",
      value: "5",
      label: "Today's Upcoming Appointments",
      iconBg: styles.iconAppointments,
    },
    {
      icon: "/facility heart.svg",
      value: "4.78K",
      label: "Total Likes",
      iconBg: styles.iconLikes,
    },
    {
      icon: "/facility star.svg",
      value: "4.2/5.0",
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
}) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
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

const DashboardFacility: NextPage = () => {
  const upcomingappointments = [
    {
      index: 1,
      clientName: "Trixie Dolera",
      service: "Opao",
      timeslot: "1:00 PM",
      appointmentDate: "Wed, Jun 30",
    },
    {
      index: 2, // Fixed: should be unique
      clientName: "Shan Michael",
      service: "Haircut",
      timeslot: "2:00 PM",
      appointmentDate: "Wed, Jun 30",
    },
  ];

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
              src="Group 126.svg"
            />
          </div>
        </div>
        <Overview />

        {/*upcoming appointments */}
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
            {upcomingappointments.map((appointment, index) => (
              <UpcomingAppointments
                key={appointment.index || index} // Better key using unique ID
                clientName={appointment.clientName}
                service={appointment.service}
                timeslot={appointment.timeslot}
                appointmentDate={appointment.appointmentDate}
              />
            ))}
          </div>
        </div>

        <div className={styles.button}>
          <div className={styles.viewAll}>View All</div>
        </div>

        {/*pending appointments*/}
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
          {pendingappointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              clientName={appointment.clientName}
              serviceName={appointment.serviceName}
              time={appointment.time}
              date={appointment.date}
            />
          ))}
        </div>
        <div className={styles.button1}>
          <div className={styles.viewAll}>View All</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFacility;

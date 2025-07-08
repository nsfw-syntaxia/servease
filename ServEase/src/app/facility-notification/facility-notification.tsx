"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "../styles/client-notification.module.css";
import { useRouter } from "next/navigation";

export interface Notification {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  type: "new" | "updated";
  icon: string;
  timestamp: string;
  isRead: boolean;
  avatarUrl: string;
}

interface NotificationItemProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
}

const NotificationItem = ({
  notification,
  onToggleRead,
}: NotificationItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleToggleRead = useCallback(() => {
    setIsAnimating(true);
    onToggleRead(notification.id);
    const timer = setTimeout(() => setIsAnimating(false), 150);
    return () => clearTimeout(timer); // Cleanup
  }, [notification.id, onToggleRead]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const existingRipples = button.getElementsByClassName(styles.ripple);
      Array.from(existingRipples).forEach((r) => r.remove());

      const ripple = document.createElement("span");
      ripple.className = styles.ripple;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      const timer = setTimeout(() => ripple.remove(), 600);
      return () => clearTimeout(timer); // Cleanup
    },
    []
  );

  return (
    <article
      className={`${styles.notification} ${
        notification.isRead ? styles.read : ""
      }`}
      aria-live={notification.isRead ? "off" : "polite"}
      onClick={handleToggleRead}
      aria-label={notification.isRead ? "Mark as unread" : "Mark as read"}
    >
      <header className={styles.notificationHeader}>
        <div className={styles.notificationIcon}>
          <span>
            <Image src={notification.icon} width={24} height={24} alt="icon" />
          </span>
        </div>
        <div className={styles.notificationContent}>
          <h3 className={styles.notificationTitle}>{notification.title}</h3>
          <p className={styles.notificationSubtitle}>{notification.subtitle}</p>
        </div>
        <div
          className={`${styles.statusBadge} ${
            notification.type === "new"
              ? styles.statusNew
              : styles.statusUpdated
          }`}
          aria-label={`Status: ${notification.type}`}
        >
          <span className={styles.statusDot} aria-hidden="true"></span>
          {notification.type === "new" ? "New" : "Updated"}
        </div>
      </header>
      <div className={styles.notificationBody}>
        <p>{notification.body}</p>
      </div>
      <footer className={styles.notificationMeta}>
        <div className={styles.notificationTime}>
          <Image
            className={styles.cardAvatar}
            width={20}
            height={20}
            alt={`Avatar for ${notification.title}`}
            src="clock-profile.svg"
          />
          <time>{notification.timestamp}</time>
        </div>
        <div className={styles.notificationActions}>
          <button
            className={`${styles.readIndicator} ${
              notification.isRead ? styles.read : ""
            } ${isAnimating ? styles.animating : ""}`}
            title={notification.isRead ? "Mark as unread" : "Mark as read"}
          />

          <button
            ref={buttonRef}
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={(e) => {
              handleButtonClick(e);
              router.push("/facility-appointments");
            }}
            aria-label={`View details for ${notification.title}`}
          >
            View Details
          </button>
        </div>
      </footer>
    </article>
  );
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Appointment Booked",
      subtitle: "Dr. Sarah Johnson - Consultation ()",
      body: "A new appointment has been scheduled for March 15, 2025 at 2:30 PM. Please prepare to accommodate the client and ensure availability. An automated confirmation has been sent to the client's registered email.",
      type: "new",
      icon: "/calendar_month noti.svg",
      timestamp: "2 minutes ago",
      isRead: false,
      avatarUrl: "/default-avatar.jpg",
    },
    {
      id: "2",
      title: "Appointment Status Updated",
      subtitle: "Appointment Canceled",
      body: "The appointment scheduled for March 18, 2025 at 10:00 AM has been canceled.",
      type: "updated",
      icon: "/autorenew.svg",
      timestamp: "15 minutes ago",
      isRead: true,
      avatarUrl: "/default-avatar.jpg",
    },
    {
      id: "3",
      title: "New Review",
      subtitle: "Dr. Michael Chen - Follow-up",
      body: "Jane left you a star review.",
      type: "new",
      icon: "/star noti.svg",
      timestamp: "15 minutes ago",
      isRead: false,
      avatarUrl: "/default-avatar.jpg",
    },
  ]);

  const handleToggleRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.floatingElements} aria-hidden="true">
        <div className={styles.floatingCircle}></div>
        <div className={styles.floatingCircle}></div>
        <div className={styles.floatingCircle}></div>
      </div>

      <header className={styles.header}>
        <h1>Notifications</h1>
        <p>Stay updated with your latest activities</p>
      </header>

      <main className={styles.notificationContainer}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onToggleRead={handleToggleRead}
          />
        ))}
      </main>
    </div>
  );
};

import Head from "next/head";

const NotificationsPage = () => {
  return (
    <>
      <Head>
        <title>Notifications - Your App</title>
        <meta
          name="description"
          content="Stay updated with your latest activities"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NotificationPage />
    </>
  );
};

export default NotificationsPage;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/header.module.css";
import { type UserRole } from "../layout";

interface HeaderProps {
  avatarUrl: string;
  userRole: UserRole;
  homePath: string;
}

const Header = ({ avatarUrl, userRole, homePath }: HeaderProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setOpen(false);
    setHovered("");
  };

  const handleAccountClick = () => {
    if (userRole === "client") {
      router.push("/client-profile");
    } else if (userRole === "provider") {
      router.push("/facility-profile");
    }
    closeDropdown();
  };

  const handleAppointmentsClick = () => {
    if (userRole === "client") {
      router.push("/client-appointments");
    } else if (userRole === "provider") {
      router.push("/facility-appointments");
    }
    closeDropdown();
  };

  const handleNotificationClick = () => {
    if (userRole === "client") {
      router.push("/client-notification");
    } else if (userRole === "provider") {
      router.push("/facility-notification");
    }
    closeDropdown();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    closeDropdown();
  };

  const items = [
    { label: "My Account", onClick: handleAccountClick },
    { label: "Appointments", onClick: handleAppointmentsClick },
    { label: "Notifications", onClick: handleNotificationClick },
    { label: "Log out", onClick: handleLogout },
  ];

  const hideHeaderRoutes = ["/login", "/signup", "/register-client", "/register-facility"];
  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className={styles.navigation}>
      <div className={styles.navBrand}>
        <Image
          className={styles.logoIcon}
          width={40}
          height={40}
          alt="Servease Logo"
          src="/logo.svg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <div className={styles.logoText}>
          <span className={styles.serv}>serv</span>
          <span className={styles.ease}>ease</span>
        </div>
      </div>
      <nav className={styles.navLinks}>
        {userRole === "guest" && (
          <>
            <a className={styles.navLink} onClick={() => router.push(homePath)}>
              Home
            </a>
            <a
              className={styles.navLink}
              onClick={() => router.push("/discover")}
            >
              Discover
            </a>
          </>
        )}

        {userRole === "client" && (
          <>
            <a className={styles.navLink} onClick={() => router.push(homePath)}>
              Dashboard
            </a>
            <a
              className={styles.navLink}
              onClick={() => router.push("/discover")}
            >
              Discover
            </a>
          </>
        )}

        {userRole === "provider" && (
          <>
            <a className={styles.navLink} onClick={() => router.push(homePath)}>
              Dashboard
            </a>
            <a
              className={styles.navLink}
              onClick={() => router.push("/facility-appointments")}
            >
              Schedule
            </a>
          </>
        )}

        <a
          className={styles.navLink}
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Contact Us
        </a>
      </nav>

      <div className={styles.userActions}>
        {userRole === "guest" ? (
          <button
            className={styles.loginButton}
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>
        ) : (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <div className={styles.avataricon} onClick={() => setOpen(!open)}>
              <Image
                src="/avatar.svg"
                alt="Profile"
                width={40}
                height={40}
                sizes="100vw"
              />
            </div>

            {open && (
              <div className={styles.dropdownMenu}>
                {items.map((item, index) => {
                  const isActive = hovered === item.label;
                  const isFirst = index === 0;
                  const isLast = index === items.length - 1;

                  let borderClass = "";
                  if (isActive && isFirst) {
                    borderClass = styles.activeTop;
                  } else if (isActive && isLast) {
                    borderClass = styles.activeBottom;
                  }

                  return (
                    <div
                      key={item.label}
                      className={`${styles.dropdownItem} ${
                        isActive ? styles.active : ""
                      } ${borderClass}`}
                      onMouseEnter={() => setHovered(item.label)}
                      onMouseLeave={() => setHovered("")}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const items = [
    { label: "My Account", href: "/account" }, //*should have a separate href for account-client and account-facility*/
    { label: "Appointments", href: "/appointments" },
    { label: "Messages", href: "/messages" },
    { label: "Notifications", href: "/notifications" },
    { label: "Log out", href: "/logout" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.navigation}>
      <div className={styles.navBrand}>
        <Image
          className={styles.logoIcon}
          width={40}
          height={40}
          alt="Servease Logo"
          src="/Servease Logo.svg"
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

        {userRole === "provider" && (
          <>
            <a
              className={styles.navLink}
              onClick={() => router.push("/provider/schedule")}
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

      {/* Conditionally render the avatar or a "Login" button */}
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
                    <Link
                      href={item.href}
                      key={item.label}
                      className={`${styles.dropdownItem} ${
                        isActive ? styles.active : ""
                      } ${borderClass}`}
                      onMouseEnter={() => setHovered(item.label)}
                      onMouseLeave={() => setHovered("")}
                    >
                      {item.label}
                    </Link>
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

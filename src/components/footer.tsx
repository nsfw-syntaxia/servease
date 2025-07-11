"use client";

import Image from "next/image";
import styles from "../styles/footer.module.css";
import { type UserRole } from "../app/layout";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userRole: UserRole;
}

const Footer = ({ userRole }: HeaderProps) => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <div className={styles.footerLogo}>
            <Image
              className={styles.logoIcon}
              width={40}
              height={40}
              alt="Servease Logo"
              src="/logo.svg"
            />
            <div
              className={styles.servease}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>serv</span>
              <span className={styles.serv}>ease</span>
            </div>
          </div>
          <p className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </p>
        </div>
        <div className={styles.footerColumn}>
          <b className={styles.footerTitle}>Quick Links</b>
          {userRole === "guest" && (
            <>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/home")}
              >
                Home
              </a>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/login")}
              >
                Discover
              </a>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/login")}
              >
                Create an Account
              </a>
            </>
          )}
          {userRole === "client" && (
            <>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/client-dashboard")}
              >
                Dashboard
              </a>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/discover")}
              >
                Discover
              </a>
            </>
          )}
          {userRole === "provider" && (
            <>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/provider-dashboard")}
              >
                Dashboard
              </a>
              <a
                className={styles.footerLink}
                onClick={() => router.push("/facility-appointments")}
              >
                Schedule
              </a>
            </>
          )}
        </div>
        <div className={styles.footerColumn}>
          <b className={styles.footerTitle}>Support</b>
          <a className={styles.footerLink}>FAQs</a>
          <a className={styles.footerLink}>Privacy Policy</a>
          <a className={styles.footerLink}>Terms & Conditions</a>
          <a className={styles.footerLink}>About Us</a>
        </div>
        <div className={styles.footerColumn}>
          <b className={styles.footerTitle}>Contact Us</b>
          <a className={styles.footerLink}>support@servease.com</a>
          <a className={styles.footerLink}>+63 996 3175 214</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerLine} />
        <p>servease 2025 © All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

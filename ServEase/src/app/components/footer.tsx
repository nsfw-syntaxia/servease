import Image from "next/image";
import styles from "../styles/footer.module.css";

const Footer = () => {
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
              src="/Servease Logo (Album Cover) (3) 2.png"
            />
            <b className={styles.footerTitle}>servease</b>
          </div>
          <p className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </p>
        </div>
        <div className={styles.footerColumn}>
          <b className={styles.footerTitle}>Quick Links</b>
          <a className={styles.footerLink}>Home</a>
          <a className={styles.footerLink}>Discover</a>
          <a className={styles.footerLink}>Create an Account</a>
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

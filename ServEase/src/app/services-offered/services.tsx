'use client'

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/servicesoffered.module.css";

// Mock data to simulate fetching services from an API
const mockServices = [
  { id: 1, name: "service name 1", description: "description", price: "P500.00", duration: "30 min." },
  { id: 2, name: "service name 1", description: "description", price: "P500.00", duration: "30 min." },
  { id: 3, name: "service name 1", description: "description", price: "P500.00", duration: "30 min." },
  // You can add more services here to see the list grow
];

// Reusable component for a single row in the services table
const ServiceRow = ({ service }: { service: any }) => (
    <div className={styles.serviceRow}>
        <div className={styles.tableCell}>{service.name}</div>
        <div className={styles.tableCell}>{service.description}</div>
        <div className={styles.tableCell}>{service.price}</div>
        <div className={styles.tableCell}>{service.duration}</div>
    </div>
);

const ServicesOfferedPage: NextPage = () => {
    const [services, setServices] = useState(mockServices);

    return (
        <div className={styles.pageContainer}>
            {/* ===== HEADER / NAVIGATION ===== */}
            <header className={styles.navigation}>
                <div className={styles.navBrand}>
                    <Image
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
                    <a className={styles.navLink}>Home</a>
                    <a className={styles.navLink}>Discover</a>
                    <a className={styles.navLink}>Contact Us</a>
                </nav>
                <div className={styles.userAvatar}>
                    <Image
                        width={28}
                        height={26}
                        alt="User Avatar"
                        src="/Avatar.svg"
                    />
                </div>
            </header>

            <main className={styles.mainContent}>
                <h1 className={styles.profileTitle}>Profile</h1>
                
                <div className={styles.servicesHeader}>
                  <div className={styles.backArrow}>
                      <Image
                        width={26}
                        height={26}
                        alt="Back"
                        src="/Arrow Left.svg"
                      />
                  </div>
                  <h2 className={styles.servicesTitle}>Services Offered</h2>
                </div>

                <div className={styles.servicesTable}>
                    <div className={styles.tableHeader}>
                        <div className={styles.headerCell}>Service Name</div>
                        <div className={styles.headerCell}>Description</div>
                        <div className={styles.headerCell}>Price</div>
                        <div className={styles.headerCell}>Duration</div>
                    </div>

                    <div className={styles.tableBody}>
                        {services.map((service) => (
                            <ServiceRow key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button className={`${styles.btn} ${styles.editButton}`}>
                        <Image width={20} height={20} alt="Edit" src="/edit.svg" />
                        <span>Edit</span>
                    </button>
                    <button className={`${styles.btn} ${styles.addButton}`}>
                        <Image width={18} height={18} alt="Add" src="/plus.svg" />
                        <span>Add Service</span>
                    </button>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerColumn}>
                        <div className={styles.footerLogo}>
                            <Image
                                width={40}
                                height={40}
                                alt="Servease Logo"
                                src="/Servease Logo (Album Cover) (3) 2.png"
                            />
                            <b>servease</b>
                        </div>
                        <p>Your trusted platform to discover, book, and manage local services—anytime, anywhere.</p>
                    </div>
                    <div className={styles.footerColumn}>
                        <b>Quick Links</b>
                        <a className={styles.footerLink}>Home</a>
                        <a className={styles.footerLink}>Discover</a>
                        <a className={styles.footerLink}>Create an Account</a>
                    </div>
                    <div className={styles.footerColumn}>
                        <b>Support</b>
                        <a className={styles.footerLink}>FAQs</a>
                        <a className={styles.footerLink}>Privacy Policy</a>
                        <a className={styles.footerLink}>Terms & Conditions</a>
                        <a className={styles.footerLink}>About Us</a>
                    </div>
                    <div className={styles.footerColumn}>
                        <b>Contact Us</b>
                        <a className={styles.footerLink}>support@servease.com</a>
                        <a className={styles.footerLink}>+63 996 3175 214</a>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.footerLine} />
                      <p>servease 2025 © All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default ServicesOfferedPage;
"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/dashboard-client.module.css";
import { useState } from "react"; 

const UpcomingAppointmentCard = ({ appointment }: { appointment: any }) => (
  <div className={styles.appointmentCard}>
    <div className={styles.cardContent}>
      <div className={styles.serviceInfo}>
        <div className={styles.serviceAvatar}>
          <Image
            width={60}
            height={60}
            src="/circle.svg"
            alt="Service Provider"
          />
        </div>
        <div className={styles.serviceDetails}>
          <h3 className={styles.serviceName}>{appointment.serviceName}</h3>
          <p className={styles.serviceLocation}>{appointment.location}</p>
        </div>
      </div>
      <div className={styles.appointmentInfo}>
        <div className={styles.timeInfo}>
          <Image width={16} height={16} src="/Vector.svg" alt="Time" />
          <span>{appointment.time}</span>
        </div>
        <div className={styles.dateInfo}>
          <Image width={20} height={20} src="/calendar_month.svg" alt="Date" />
          <span>{appointment.date}</span>
        </div>
      </div>
    </div>
  </div>
);

const DashboardClient: NextPage = () => {
  // --- MOCK DATA ---
  // This array simulates the data you would get from an API.
  // - To see two appointments, keep it as is.
  // - To see one appointment, delete one of the objects.
  // - To see the "no appointments" message, change it to: const [appointments, setAppointments] = useState([]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      serviceName: "Service Facility Name",
      location: "Location",
      time: "1:00 PM",
      date: "Wed, June 30",
    },
    {
      id: 2,
      serviceName: "Another Service Place",
      location: "Another Location",
      time: "4:30 PM",
      date: "Thu, July 1",
    },
  ]);

  return (
    <div className={styles.dashboardClient}>
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImage}
              width={40}
              height={40}
              sizes="100vw"
              alt="Servease Logo"
              src="/Servease Logo (Album Cover) (3) 1.png"
            />
            <div className={styles.brandName}>
              <span className={styles.serv}>serv</span>
              <span className={styles.ease}>ease</span>
            </div>
          </div>

          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              Discover
            </a>
            <a href="#" className={styles.navLink}>
              Contact Us
            </a>
          </div>

          <div className={styles.userAvatar}>
            <Image
              className={styles.avatarIcon}
              width={40}
              height={40}
              sizes="100vw"
              alt="User Avatar"
              src="/Avatar.svg"
            />
          </div>
        </div>
      </nav>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.bookAn}>Book an</span>
              <span className={styles.appointment}>Appointment</span>
            </h1>
          </div>
        </div>
      </section>

      <main className={styles.mainContent}>
        <section className={styles.upcomingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>Upcoming</span>
              <span className={styles.titleAccent}> Appointments</span>
            </h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>

          <div className={styles.appointmentsGrid}>
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <UpcomingAppointmentCard key={app.id} appointment={app} />
              ))
            ) : (
              <p>You have no upcoming appointments.</p>
            )}
          </div>
        </section>

        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>Featured</span>
              <span className={styles.titleAccent}> Services</span>
            </h2>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceCardContent}>
                <div className={styles.serviceProvider}>
                  <div className={styles.providerAvatar}></div>
                  <div className={styles.providerInfo}>
                    <h3 className={styles.providerName}>
                      Service Facility Name
                    </h3>
                    <div className={styles.rating}>
                      <span className={styles.ratingScore}>4.0</span>
                      <div className={styles.stars}>
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 4.svg"
                          alt="Star"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceCardContent}>
                <div className={styles.serviceProvider}>
                  <div className={styles.providerAvatar}></div>
                  <div className={styles.providerInfo}>
                    <h3 className={styles.providerName}>
                      Service Facility Name
                    </h3>
                    <div className={styles.rating}>
                      <span className={styles.ratingScore}>4.0</span>
                      <div className={styles.stars}>
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 4.svg"
                          alt="Star"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceCardContent}>
                <div className={styles.serviceProvider}>
                  <div className={styles.providerAvatar}></div>
                  <div className={styles.providerInfo}>
                    <h3 className={styles.providerName}>
                      Service Facility Name
                    </h3>
                    <div className={styles.rating}>
                      <span className={styles.ratingScore}>4.0</span>
                      <div className={styles.stars}>
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 3.svg"
                          alt="Star"
                        />
                        <Image
                          width={16}
                          height={16}
                          src="/Star 4.svg"
                          alt="Star"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className={styles.nextButton}>
              <Image
                width={28}
                height={28}
                src="/Chevron right.svg"
                alt="Next"
              />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <Image
                width={40}
                height={40}
                src="/Servease Logo (Album Cover) (3) 2.png"
                alt="Servease Logo"
              />
              <h3 className={styles.footerBrand}>servease</h3>
            </div>
            <p className={styles.footerDescription}>
              Your trusted platform to discover, book, and manage local
              services—anytime, anywhere.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Discover</a>
              </li>
              <li>
                <a href="#">Create an Account</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Support</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="mailto:support@servease.com">support@servease.com</a>
              </li>
              <li>
                <a href="tel:+639963175214">+63 996 3175 214</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p>servease 2025 © All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardClient;
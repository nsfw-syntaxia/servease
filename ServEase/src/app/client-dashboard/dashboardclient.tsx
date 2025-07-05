"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/dashboard-client.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ProviderInfo {
  business_name: string;
  picture_url: string | null;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  address: string;
  provider: ProviderInfo | null;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  provider_name: string; 
  provider_picture_url: string | null; 
}

interface DashboardClientProps {
  avatarUrl: string;
  appointments: Appointment[];
  featuredServices: Service[];
}

// Helper functions to format date and time nicely
const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatDisplayTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// --- FIX 2: Update the UpcomingAppointmentCard component ---
const UpcomingAppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const providerName = appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";
  const providerAvatar = appointment.provider?.picture_url || "/circle.svg"; // Fallback avatar

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.cardContent}>
        <div className={styles.serviceInfo}>
          <Image
            className={styles.serviceAvatar}
            src={providerAvatar}
            alt="Provider Avatar"
            width={40}
            height={40}
          />
          <div className={styles.serviceDetails}>
            <h3 className={styles.serviceName}>{providerName}</h3>
            <p className={styles.serviceLocation}>{providerAddress}</p>
          </div>
        </div>
        <div className={styles.appointmentInfo}>
          <div className={styles.timeInfo}>
            <Image width={16} height={16} src="/Vector.svg" alt="Time" />
            <span>{formatDisplayTime(appointment.time)}</span>
          </div>
          <div className={styles.dateInfo}>
            <Image width={20} height={20} src="/calendar_month.svg" alt="Date" />
            <span>{formatDisplayDate(appointment.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FIX 3: Update the FeaturedServiceCard component ---
const FeaturedServiceCard = ({ service }: { service: Service }) => {
  const providerName = service.provider?.business_name || "Unknown Provider";
  const providerAvatar = service.provider?.picture_url || "/avatar.svg"; // Fallback to default avatar

  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceImage}>
        {/* You could put a service image here if you had one */}
      </div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <Image
            className={styles.providerAvatar}
            src={providerAvatar}
            alt="Provider Avatar"
            width={32}
            height={32}
          />
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{providerName}</h3>
            <div className={styles.rating}>
              <div className={styles.stars}>
                <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
                <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
                <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
                <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
                <Image width={16} height={16} src="/Star 4.svg" alt="Star" />
              </div>
              <span className={styles.ratingScore}>4.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// The main component logic and JSX structure remains the same
const DashboardClient: NextPage<DashboardClientProps> = ({
  avatarUrl,
  appointments,
  featuredServices,
}) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleServices = 3;

  const handleNext = () => {
    if (
      featuredServices &&
      currentIndex < featuredServices.length - visibleServices
    ) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slides = [
    { id: 1, image: "/header-image.jpg", alt: "Barber tools" },
    { id: 2, image: "/LandingPageImage2.png", alt: "Salon interior" },
    { id: 3, image: "/LandingPageImage3.png", alt: "Hair clippers" },
    { id: 4, image: "/LandingPageImage4.png", alt: "Styling products" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (slideIndex: number) => setCurrentSlide(slideIndex);

  return (
    <div className={styles.dashboardClient}>
      <section className={styles.heroSection}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.bookAn}>Book an</span>
            <span className={styles.appointment}>Appointment</span>
          </h1>
        </div>
        <div className={styles.slideDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <main className={styles.mainContent}>
        <section className={styles.upcomingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>Upcoming</span>
              <span className={styles.titleAccent}> Appointments</span>
            </h2>
            {appointments && appointments.length >= 2 && (
              <button
                className={styles.viewAllBtn}
                onClick={() => router.push("/appointments")}
              >
                View All
              </button>
            )}
          </div>
          <div className={styles.appointmentsGrid}>
            {appointments && appointments.length > 0 ? (
              appointments.map((app) => (
                <UpcomingAppointmentCard key={app.id} appointment={app} />
              ))
            ) : (
              <p className={styles.none}>You have no upcoming appointments.</p>
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

          <div className={styles.servicesCarousel}>
            {currentIndex > 0 && (
              <button
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={handlePrev}
              >
                <Image
                  width={28}
                  height={28}
                  src="/Chevron right.svg"
                  alt="Previous"
                />
              </button>
            )}
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% / ${visibleServices})))`,
                }}
              >
                {featuredServices &&
                  featuredServices.map((service) => (
                    <FeaturedServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </div>
            {featuredServices &&
              currentIndex < featuredServices.length - visibleServices && (
                <button
                  className={`${styles.carouselButton} ${styles.nextButton}`}
                  onClick={handleNext}
                >
                  <Image
                    width={28}
                    height={28}
                    src="/Chevron right.svg"
                    alt="Next"
                  />
                </button>
              )}
          </div>
        </section>
      </main>

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
    </div>
  );
};

export default DashboardClient;
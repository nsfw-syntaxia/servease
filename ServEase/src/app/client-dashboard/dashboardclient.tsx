"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/dashboard-client.module.css";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ProviderInfo {
  business_name: string;
  picture_url: string | null;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  address: string;
  provider: ProviderInfo | null;
}

export interface Service {
  id: number | null; 
  name: string | null;
  price: number | null;
  provider_name: string; 
  provider_picture_url: string | null; 
  facility_photo_url: string | null;
  provider_address : string | null;
  rating: number | null;
  provider_id: string; 
}

interface DashboardClientProps {
  avatarUrl: string;
  appointments: Appointment[];
  featuredServices: Service[];
}

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

const UpcomingAppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const providerName = appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";
  const providerAvatar = appointment.provider?.picture_url || "/circle.svg"; 
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

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Image key={`star-${i}`} width={16} height={16} src="/Star 3.svg" alt="Full Star" />);
    } else if (rating >= i - 0.5) {
      stars.push(<Image key={`star-${i}`} width={16} height={16} src="/star_half.svg" alt="Half Star" />);
    } else {
      stars.push(<Image key={`star-${i}`} width={16} height={16} src="/Star 4.svg" alt="Empty Star" />);
    }
  }
  return stars;
};

const FeaturedServiceCard = ({ service }: { service: Service }) => {
  const displayRating = useMemo(() => {
    if (service.rating) return service.rating;
    return parseFloat((Math.random() * (5 - 3.7) + 3.7).toFixed(1));
  }, [service.rating]);

  const providerName = service.provider_name || "Unknown Provider";
  const providerAvatar = service.provider_picture_url || "/avatar.svg"; 
  const providerAddress = service.provider_address;
  const facilityPhoto = service.facility_photo_url || "/placeholder-service.jpg";

  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceImage}>
        <Image
          src={facilityPhoto}
          alt={`${providerName} facility photo`}
          layout="fill"
          objectFit="cover"
        />
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
            <h3 className={styles.providerName}>{service.name || providerName}</h3>
            <p className={styles.serviceLocation}>{providerAddress || 'Unknown Location'}</p>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {renderStars(displayRating)}
              </div>
              <span className={styles.ratingScore}>{displayRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


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
                onClick={() => router.push("/client-appointments")}
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

    </div>
  );
};

export default DashboardClient;
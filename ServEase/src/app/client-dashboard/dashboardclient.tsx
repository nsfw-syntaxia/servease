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
  contact_number: string | null; // Added for modal
}

export interface AppointmentService { // New type for services in the modal
  name: string;
  price: number;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  address: string;
  status: "pending" | "confirmed" | "completed" | "canceled"; // Added for modal
  price: number; // Added for modal (total price)
  services: AppointmentService[]; // Added for modal
  provider: ProviderInfo | null;
}

export interface Service {
  id: number | null;
  name: string | null;
  price: number | null;
  provider_name: string;
  provider_picture_url: string | null;
  facility_photo_url: string | null;
  provider_address: string | null;
  rating: number | null;
  provider_id: string;
}

interface DashboardClientProps {
  avatarUrl: string;
  appointments: Appointment[];
  featuredServices: Service[];
}

const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatDisplayTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const UpcomingAppointmentCard = ({
  appointment,
  onShowDetails,
}: {
  appointment: Appointment;
  onShowDetails: () => void;
}) => {
  const providerName =
    appointment.provider?.business_name || "Unknown Provider";
  const providerAddress = appointment.address || "No address provided";
  
  const providerAvatar = useMemo(() => {
    if (appointment.provider?.picture_url) {
      if (appointment.provider.picture_url.startsWith('http')) {
        return appointment.provider.picture_url;
      }
      return appointment.provider.picture_url;
    }
    return "/circle.svg";
  }, [appointment.provider?.picture_url]);
  
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const formattedStatus = appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1);

  return (
    <div className={styles.appointmentCard} onClick={onShowDetails}>
      <div className={styles.cardContent}>
        <div className={styles.serviceInfo}>
          <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
            {!imageError ? (
              <Image
                className={styles.serviceAvatar}
                src={providerAvatar}
                alt={`${providerName} Avatar`}
                width={40}
                height={40}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div 
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#666',
                  border: '1px solid #ddd'
                }}
              >
                {providerName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
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
            <Image
              width={20}
              height={20}
              src="/calendar_month.svg"
              alt="Date"
            />
            <span>{formatDisplayDate(appointment.date)}</span>
          </div>
          <div className={`${styles.statusInfo} ${styles[appointment.status]}`}>
            <span>{formattedStatus}</span>
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
      stars.push(
        <Image
          key={`star-${i}`}
          width={16}
          height={16}
          src="/Star 3.svg"
          alt="Full Star"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <Image
          key={`star-${i}`}
          width={16}
          height={16}
          src="/star_half.svg"
          alt="Half Star"
        />
      );
    } else {
      stars.push(
        <Image
          key={`star-${i}`}
          width={16}
          height={16}
          src="/Star 4.svg"
          alt="Empty Star"
        />
      );
    }
  }
  return stars;
};

const FeaturedServiceCard = ({ service }: { service: Service }) => {
  const displayRating = useMemo(() => {
    if (service.rating) return service.rating;
    return parseFloat((Math.random() * (5 - 3.7) + 3.7).toFixed(1));
  }, [service.rating]);

  const router = useRouter();

  const providerName = service.provider_name || "Unknown Provider";
  const providerAvatar = service.provider_picture_url || "/avatar.svg";
  const providerAddress = service.provider_address;
  const providerid = service.provider_id;
  const facilityPhoto =
    service.facility_photo_url || "/placeholder-service.jpg";

  return (
    <div
      className={styles.serviceCard}
      onClick={() => router.push(`/facility/${providerid}`)}
    >
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
            <h3 className={styles.providerName}>
              {service.name || providerName}
            </h3>
            <p className={styles.serviceLocation}>
              {providerAddress || "Unknown Location"}
            </p>
            <div className={styles.rating}>
              <div className={styles.stars}>{renderStars(displayRating)}</div>
              <span className={styles.ratingScore}>
                {displayRating.toFixed(1)}
              </span>
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

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAppointment(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

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
                <UpcomingAppointmentCard
                  key={app.id}
                  appointment={app}
                  onShowDetails={() => setSelectedAppointment(app)}
                />
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
      {selectedAppointment && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className={styles.calendarSelectChangeSize}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.facilityNameParent}>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Appointment Status</div>
                <b className={styles.facilityNameCap}>
                  {/* DYNAMIC STATUS */}
                  {selectedAppointment.status.charAt(0).toUpperCase() +
                    selectedAppointment.status.slice(1)}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Facility Name</div>
                <b className={styles.facilityNameCap}>
                  {/* DYNAMIC NAME */}
                  {selectedAppointment.provider?.business_name || "N/A"}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Address</div>
                <b className={styles.facilityNameCap}>
                  {/* DYNAMIC ADDRESS */}
                  {selectedAppointment.address}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Phone Number</div>
                <b className={styles.facilityNameCap}>
                  {/* DYNAMIC PHONE */}
                  {selectedAppointment.provider?.contact_number || "Not provided"}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Date</div>
                <b className={styles.facilityNameCap}>
                  {new Date(selectedAppointment.date).toLocaleDateString([], {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  })}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Hours</div>
                <b className={styles.facilityNameCap}>
                  {formatDisplayTime(selectedAppointment.time)}
                </b>
              </div>
              <Image
                className={styles.dividerIcon}
                width={390}
                height={1}
                sizes="100vw"
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.serviceNameParent}>
                {/* DYNAMIC SERVICES LIST */}
                {selectedAppointment.services.map((service) => (
                  <div className={styles.rowContainer} key={service.name}>
                    <div className={styles.facilityName}>{service.name}</div>
                    <b className={styles.facilityNameCap}>
                      PHP {service.price.toFixed(2)}
                    </b>
                  </div>
                ))}
              </div>
              <Image
                className={styles.dividerIcon1}
                width={390}
                height={1}
                sizes="100vw"
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.rowContainerTotal}>
                <div className={styles.facilityName}>Total</div>
                <b className={styles.facilityNameCap}>
                  {/* DYNAMIC TOTAL PRICE */}
                  PHP {selectedAppointment.price.toFixed(2)}
                </b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;

"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/dashboard-client.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// Card for a single featured service
const FeaturedServiceCard = ({ service }: { service: any }) => (
  <div className={styles.serviceCard}>
    <div className={styles.serviceImage}></div>
    <div className={styles.serviceCardContent}>
      <div className={styles.serviceProvider}>
        <div className={styles.providerAvatar}></div>
        <div className={styles.providerInfo}>
          <h3 className={styles.providerName}>{service.providerName}</h3>
          <div className={styles.rating}>
            <div className={styles.stars}>
              <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
              <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
              <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
              <Image width={16} height={16} src="/Star 3.svg" alt="Star" />
              <Image width={16} height={16} src="/Star 4.svg" alt="Star" />
            </div>
            <span className={styles.ratingScore}>{service.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const DashboardClient: NextPage = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([
    { id: 1, serviceName: "Service Facility Name", location: "Location", time: "1:00 PM", date: "Wed, June 30" },
    { id: 2, serviceName: "Another Service Place", location: "Another Location", time: "4:30 PM", date: "Thu, July 1" },
  ]);

  const [featuredServices, setFeaturedServices] = useState([
    { id: 1, providerName: "Glamour Salon", rating: 4.5 },
    { id: 2, providerName: "AutoCare Experts", rating: 4.8 },
    { id: 3, providerName: "HomeClean Pro", rating: 4.2 },
    { id: 4, providerName: "PetPamper Palace", rating: 4.9 },
    { id: 5, providerName: "Tech-Fix It", rating: 4.6 },
    { id: 6, providerName: "GardenScapes", rating: 4.7 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleServices = 3; // How many services are visible at once

  const handleNext = () => {
    // Stop at the last possible slide to not show empty space
    if (currentIndex < featuredServices.length - visibleServices) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    // Stop at the beginning
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const slides = [
    { id: 1, image: "/header-image.jpg", alt: "Barber tools on a slate background" },
    { id: 2, image: "/LandingPageImage2.png", alt: "Another view of barber tools" },
    { id: 3, image: "/LandingPageImage3.png", alt: "Close up of hair clippers" },
    { id: 4, image: "/LandingPageImage4.png", alt: "Hair styling products" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer); 
  }, [slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };


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
              src="/Servease Logo.svg"
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
            <a href="#" 
            className={styles.navLink}
            onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}>
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
              priority={index === 0} // Load the first image faster
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
            <button 
            className={styles.viewAllBtn}
            onClick={() => router.push("/appointments")}
            >View All</button>
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
          
          <div className={styles.servicesCarousel}>
            {/* Show Prev button only if not at the beginning */}
            {currentIndex > 0 && (
              <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={handlePrev}>
                <Image width={28} height={28} src="/Chevron right.svg" alt="Previous" />
              </button>
            )}

            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{
                  // This inline style moves the track one card-width at a time
                  transform: `translateX(calc(-${currentIndex} * (100% / ${visibleServices})))`
                }}
              >
                {featuredServices.map((service) => (
                  <FeaturedServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
            
            {/* Show Next button only if not at the end */}
            {currentIndex < featuredServices.length - visibleServices && (
              <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={handleNext}>
                <Image width={28} height={28} src="/Chevron right.svg" alt="Next" />
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
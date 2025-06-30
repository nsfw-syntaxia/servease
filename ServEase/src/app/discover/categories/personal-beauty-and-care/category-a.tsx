"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/discover-2-a.module.css";

const PopularServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();
  return (
    <div
      className={styles.serviceCard}
      onClick={() => router.push("/facility-details")}
    >
      <div className={styles.serviceImage}></div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}></div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.providerName}</h3>
            <div className={styles.rating}>
              <div className={styles.stars}>
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/Star 3.svg"
                  alt="Star"
                />
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/Star 3.svg"
                  alt="Star"
                />
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/Star 3.svg"
                  alt="Star"
                />
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/Star 3.svg"
                  alt="Star"
                />
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/Star 4.svg"
                  alt="Star"
                />
              </div>
              <span className={styles.ratingScore}>
                {service.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const FeaturedServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();
  return (
    <div
      className={styles.serviceCard}
      onClick={() => router.push("/facility-details")}
    >
      <div className={styles.serviceImage}></div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}></div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.providerName}</h3>
            <div className={styles.rating}>
              <span className={styles.ratingScore}>{service.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const AllServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();
  return (
    <div className={styles.service}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.avatar}>
          <div className={styles.avatar1} />
          <div className={styles.avatar5}>
            <div className={styles.serviceFacilityNameParent}>
              <div className={styles.serviceFacilityName}>{service.name}</div>
              <div className={styles.location}>{service.location}</div>
            </div>
            <div className={styles.avatar2} />
            <div className={styles.avatar3}>
              <div className={styles.groupParent}>
                <div className={styles.parent}>
                  <div className={styles.div}>{service.rating}</div>
                  <Image
                    className={styles.groupChild}
                    width={23.7}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/starFilled.svg"
                  />
                </div>
                <div
                  className={styles.link}
                  onClick={() => router.push("/facility-details")}
                >
                  <div className={styles.viewDetails}>View Details</div>
                  <Image
                    className={styles.svgIcon}
                    width={14}
                    height={14}
                    sizes="100vw"
                    alt=""
                    src="/gs2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PBACS: NextPage = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showPrevNew, setShowPrevNew] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: "My Account", href: "/account" },
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

  const handleNextClick = () => {
    setShowPrev(true);
  };

  const handlePrevClick = () => {
    setShowPrev(false);
  };

  const handleNextClickNew = () => {
    setShowPrevNew(true);
  };

  const handlePrevClickNew = () => {
    setShowPrevNew(false);
  };
  const [popularServices, setPopularServices] = useState([
    { id: 1, providerName: "Glamour Salon", rating: 4.5 },
    { id: 2, providerName: "AutoCare Experts", rating: 4.8 },
    { id: 3, providerName: "HomeClean Pro", rating: 4.2 },
    { id: 4, providerName: "PetPamper Palace", rating: 4.9 },
    { id: 5, providerName: "Tech-Fix It", rating: 4.6 },
    { id: 6, providerName: "GardenScapes", rating: 4.7 },
  ]);
  const [featuredServices, setFeaturedServices] = useState([
    { id: 1, providerName: "Glamour Salon", location: "Cebu City" },
    { id: 2, providerName: "AutoCare Experts", location: "Cebu City" },
    { id: 3, providerName: "HomeClean Pro", location: "Cebu City" },
    { id: 4, providerName: "PetPamper Palace", location: "Cebu City" },
    { id: 5, providerName: "Tech-Fix It", location: "Cebu City" },
    { id: 6, providerName: "GardenScapes", location: "Cebu City" },
  ]);
  const allservices = [
    { id: 1, name: "Service Facility Name", location: "Cebu", rating: 4.0 },
    { id: 2, name: "Nail Spa", location: "Mandaue", rating: 4.2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const visibleServices = 3; // How many services are visible at once
  const visibleServices1 = 3;

  const handleNext = () => {
    // Stop at the last possible slide to not show empty space
    if (currentIndex < popularServices.length - visibleServices) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  const handlePrev = () => {
    // Stop at the beginning
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };
  const handleNext1 = () => {
    // Stop at the last possible slide to not show empty space
    if (currentIndex1 < featuredServices.length - visibleServices1) {
      setCurrentIndex1((prevIndex1) => prevIndex1 + 3);
    }
  };

  const handlePrev1 = () => {
    // Stop at the beginning
    if (currentIndex1 > 0) {
      setCurrentIndex1((prevIndex1) => prevIndex1 - 3);
    }
  };

  const router = useRouter();

  return (
    <div className={styles.pbacs}>
      {/* nav */}
      <div className={styles.nav}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="/logo.svg"
          onClick={() => router.push("/home")}
        />
        <div className={styles.servease1} onClick={() => router.push("/home")}>
          <span className={styles.serv}>serv</span>
          <b>ease</b>
        </div>
        <div className={styles.navChild} />
        <div className={styles.homeParent}>
          <div className={styles.home1} onClick={() => router.push("/home")}>
            Home
          </div>
          <div
            className={styles.home1}
            onClick={() => router.push("/discover")}
          >
            Discover
          </div>
          <div
            className={styles.contactUs1}
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            Contact Us
          </div>
        </div>
        <div className={styles.navChild} />
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
      </div>
      <div className={styles.bg}>
        {/* hero img */}
        <div className={styles.heroImg}>
          <div className={styles.personalBeautyAnd}>
            Personal Beauty and Care Services
          </div>
        </div>

        {/* search */}
        <div className={styles.searchBox}>
          <div className={styles.filtering}>
            <div className={styles.link6}>
              <Image
                className={styles.icon2}
                width={20}
                height={20}
                sizes="100vw"
                alt=""
                src="/filtering.svg"
              />
              <div className={styles.moreFilters}>More Filters</div>
            </div>
          </div>
          <div className={styles.btnfind}>
            <Image
              className={styles.icon3}
              width={15}
              height={15}
              sizes="100vw"
              alt=""
              src="/search.svg"
            />
            <div className={styles.findListing}>Find Listing</div>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles.enterAService}
              placeholder="Enter a Service Name, Category, or Location"
            />
          </div>
        </div>

        {/* icons */}
        <div className={styles.icons}>
          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Barbershops" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.barbershopIcon}
                  src="/barbershop.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Barbershops</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Hair Salons" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.hairSalonIcon}
                  src="/hair salon.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Hair Salons</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Nail Salons" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.nailSalonIcon}
                  src="/nail salon.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Nail Salons</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Spa & Massage Centers" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.spaIcon}
                  src="/spa.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Spa & Massage Centers</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Tattoo & Piercing Parlors" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.piercingIcon}
                  src="/piercing.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Tattoo & Piercing Parlors</div>
            </div>
          </Link>
        </div>
      </div>

      {/* popular services */}
      <div className={styles.popularServices}>
        <b className={styles.allServices1}>
          <span>Popular</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.servicesCarousel}>
          {/* Show Prev button only if not at the beginning */}
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
                // This inline style moves the track one card-width at a time
                transform: `translateX(calc(-${currentIndex} * (100% / ${visibleServices})))`,
              }}
            >
              {popularServices.map((service) => (
                <PopularServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Show Next button only if not at the end */}
          {currentIndex < popularServices.length - visibleServices && (
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
        <div className={styles.line1} />
      </div>

      {/* new services */}
      <div className={styles.newServices}>
        <b className={styles.allServices1}>
          <span>New</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.servicesCarousel}>
          {/* Show Prev button only if not at the beginning */}
          {currentIndex1 > 0 && (
            <button
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrev1}
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
                // This inline style moves the track one card-width at a time
                transform: `translateX(calc(-${currentIndex1} * (100% / ${visibleServices1})))`,
              }}
            >
              {featuredServices.map((service) => (
                <FeaturedServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Show Next button only if not at the end */}
          {currentIndex1 < featuredServices.length - visibleServices1 && (
            <button
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNext1}
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
        <div className={styles.line1} />
      </div>

      {/* all services */}
      <div className={styles.allServices}>
        <b className={styles.allServices1}>
          <span>All</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.allView}>
          <div className={styles.allCards}>
            <div className={styles.cards}>
              {allservices.map((service, id) => (
                <AllServiceCard key={id} service={service} />
              ))}
            </div>
            <div className={styles.cards}>
              {allservices.map((service, id) => (
                <AllServiceCard key={id} service={service} />
              ))}
            </div>
            <div className={styles.cards}>
              {allservices.map((service, id) => (
                <AllServiceCard key={id} service={service} />
              ))}
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.viewAll}>View All</div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.yourTrustedPlatform}>
          Your trusted platform to discover, book, and manage local
          services—anytime, anywhere.
        </div>
        <b className={styles.contactUs}>Contact Us</b>
        <div className={styles.supportserveasecom}>support@servease.com</div>
        <div className={styles.contactNumber}>+63 9XX-XXX-XXXX</div>
        <b className={styles.support}>Support</b>
        <div className={styles.faqs}>FAQs</div>
        <div className={styles.privacyPolicy}>Privacy Policy</div>
        <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
        <div className={styles.aboutUs}>About Us</div>
        <b className={styles.quickLinks}>Quick Links</b>
        <div className={styles.servease} onClick={() => router.push("/home")}>
          <span className={styles.serv}>serv</span>
          <b>ease</b>
        </div>
        <div className={styles.home} onClick={() => router.push("/home")}>
          Home
        </div>
        <div className={styles.discover}>Discover</div>
        <div
          className={styles.createAnAccount}
          onClick={() => router.push("/signup")}
        >
          Create an Account
        </div>
        <div className={styles.lineParent}>
          <div className={styles.lineDiv} />
          <div className={styles.servease2025}>
            servease 2025 © All rights reserved
          </div>
        </div>
        <Image
          className={styles.serveaseLogoAlbumCover31}
          width={40}
          height={40}
          sizes="100vw"
          alt="Servease Logo"
          src="/logo.svg"
          onClick={() => router.push("/home")}
        />
      </div>
    </div>
  );
};

export default PBACS;

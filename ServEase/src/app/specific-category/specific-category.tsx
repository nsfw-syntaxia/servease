"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import styles from "../styles/specific-category.module.css";

const AllServiceCard = ({ service }: { service: any }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const router = useRouter();

  return (
    <div className={styles.service}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.avatar}>
          <div className={styles.avatar1}>
            <Image
              className={styles.icons}
              width={35}
              height={35}
              alt=""
              src="/barbershop.svg"
            />
          </div>
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

const SpecificCategory: NextPage = () => {
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

  const allservices = [
    { id: 1, name: "Service Facility Name", location: "Cebu", rating: 4.0 },
    { id: 2, name: "Nail Spa", location: "Mandaue", rating: 4.2 },
  ];

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
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
          <Image width={1300} height={331} alt="" src={`/${name}.png`} />
          <div className={styles.personalBeautyAnd}>{name}</div>
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

export default SpecificCategory;

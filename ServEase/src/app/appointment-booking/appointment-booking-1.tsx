"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/booking-appointment-1.module.css";

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
};

const services: Service[] = [
  {
    id: 1,
    name: "Service 1",
    description: "Description 1",
    price: "PHP1000.00",
  },
  {
    id: 2,
    name: "Service 2",
    description: "Description 2",
    price: "PHP1200.00",
  },
  {
    id: 3,
    name: "Service 3",
    description: "Description 3",
    price: "PHP1500.00",
  },
  {
    id: 4,
    name: "Service 4",
    description: "Description 4",
    price: "PHP1800.00",
  },
  {
    id: 5,
    name: "Service 5",
    description: "Description 5",
    price: "PHP2000.00",
  },
];

const Booking1: NextPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName];

      if (updated.length > 0) {
        setErrorMessage("");
      }
      return updated;
    });
  };

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service to proceed.");
      return;
    }

    setErrorMessage("");
    console.log("Proceeding with services:", selectedServices);
  };

  return (
    <div className={styles.booking1}>
      <div className={styles.joinUsWrapper}>
        <div className={styles.joinUs}>
          <div className={styles.joinUsChild} />
          <div className={styles.appointmentBookingParent}>
            <b className={styles.appointmentBooking}>Appointment Booking</b>
            <div className={styles.chooseAService}>
              Choose a service, pick a time, and book in just a few clicks.
            </div>
            <div className={styles.stepper}>
              <div className={styles.groupParent}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>1</div>
                </div>
                <div className={styles.service}>Service</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.groupContainer}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>2</div>
                </div>
                <div className={styles.service}>{`Date &Time`}</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.frameDiv}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>3</div>
                </div>
                <div className={styles.service}>Review</div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.numberParent}>
                <div className={styles.number}>
                  <div className={styles.groupDiv}>
                    <div className={styles.bg3} />
                    <div className={styles.div3}>1</div>
                  </div>
                  <div className={styles.chooseServices}>Choose Service(s)</div>
                </div>
                <div className={styles.browseAndSelect}>
                  Browse and select one or more services you’d like to book from
                  our trusted professionals.
                </div>
                <div
                  className={styles.atLeastChoose}
                >{`*At least choose one service `}</div>
              </div>
              <div className={styles.container}>
                {services.map((service, index) => {
                  const isActive = selectedServices.includes(service.name);

                  return (
                    <div
                      key={index}
                      className={`${styles.card} ${
                        isActive ? styles.active : ""
                      } ${errorMessage ? styles.errorborder : ""}`}
                      onClick={() => toggleService(service.name)}
                    >
                      <div className={styles.header}>
                        <div
                          className={`${styles.checkbox} ${
                            isActive ? styles.checkboxActive : ""
                          }`}
                        >
                          {isActive && (
                            <Image
                              src="/Check Square.svg"
                              alt="check"
                              width={24}
                              height={24}
                            />
                          )}
                        </div>
                        <div className={styles.name}>{service.name}</div>
                        <div className={styles.price}>{service.price}</div>
                      </div>

                      <div
                        className={`${styles.content} ${
                          isActive ? styles.contentVisible : ""
                        }`}
                      >
                        {service.description}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.messageWrapper}>
                <div
                  className={`${styles.privacyNotice} ${
                    selectedServices.length > 0 ? styles.visible : styles.hidden
                  }`}
                >
                  Total: PHP1000.00
                </div>

                <div
                  className={`${styles.errorbox} ${
                    errorMessage ? styles.visible : styles.hidden
                  }`}
                >
                  Please select at least one service
                </div>
              </div>

              <div
                className={`${styles.buttoncontainer} ${
                  buttonClicked ? styles.clicked : ""
                }`}
                style={{
                  backgroundColor: "#a68465",
                  opacity: selectedServices.length > 0 ? "1" : "0.5",
                  transition: "opacity 0.2s ease",
                }}
                onClick={handleNextClick}
              >
                <div className={styles.signup}>
                  <div className={styles.signupText}>Next</div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>2</div>
                    </div>
                    <div
                      className={styles.chooseServices}
                    >{`Select Date & Time`}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>3</div>
                    </div>
                    <div className={styles.chooseServices}>Booking Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navigation}>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/landingLogo.svg"
            />
            <div className={styles.servease}>
              <span className={styles.serv}>serv</span>
              <b>ease</b>
            </div>
            <div className={styles.navigationChild} />
            <div className={styles.homeParent}>
              <div className={styles.home}>Home</div>
              <div className={styles.home}>Discover</div>
              <div className={styles.contactUs}>Contact Us</div>
            </div>
            <div className={styles.navigationChild} />
            <Image
              className={styles.avatar}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/avatar.svg"
            />
          </div>
          <div className={styles.footer}>
            <div className={styles.footerChild} />
            <div className={styles.yourTrustedPlatform}>
              Your trusted platform to discover, book, and manage local
              services—anytime, anywhere.
            </div>
            <b className={styles.contactUs1}>Contact Us</b>
            <div className={styles.supportserveasecom}>
              support@servease.com
            </div>
            <div className={styles.contactNumber}>contact number</div>
            <b className={styles.support}>Support</b>
            <div className={styles.faqs}>FAQs</div>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
            <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
            <div className={styles.aboutUs}>About Us</div>
            <b className={styles.quickLinks}>Quick Links</b>
            <div
              className={styles.servease1}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className={styles.serv}>serv</span>
              <b>ease</b>
            </div>
            <div className={styles.home1}>Home</div>
            <div className={styles.discover1}>Discover</div>
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
              alt=""
              src="/landingLogo.svg"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking1;

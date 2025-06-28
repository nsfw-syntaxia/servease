"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/booking-appointment-3.module.css";

const Booking3: NextPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);
    if (!isAgreed) {
      setErrorMessage("You must agree before confirming.");
      return;
    }

    setErrorMessage("");
    console.log("Booking confirmed.");
  };

  const summaryItems = [
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.facilityName,
      priceStyle: styles.php100000,
    },
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.address,
      priceStyle: styles.php1000001,
    },
    {
      label: "Service Name",
      price: "PHP 1000.00",
      style: styles.name,
      priceStyle: styles.php1000002,
    },
  ];

  return (
    <div className={styles.booking3}>
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
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>1</div>
                    </div>
                    <div className={styles.chooseServices}>
                      Choose Service(s)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
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
            <div className={styles.frameGroup}>
              <div className={styles.numberParent}>
                <div className={styles.number}>
                  <div className={styles.groupDiv}>
                    <div className={styles.bg3} />
                    <div className={styles.div3}>3</div>
                  </div>
                  <div className={styles.chooseServices}>Booking Review</div>
                </div>
                <div className={styles.doubleCheckTheDetails}>
                  Double-check the details of your booking — selected services,
                  date, time, and provider. Once you're ready, confirm your
                  appointment to finalize the process.
                </div>
              </div>
              <div className={styles.calendarSelectChangeSize}>
                <div className={styles.facilityNameParent}>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Facility Name</div>
                    <b className={styles.facilityNameCap}>Barbershop Cut</b>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Address</div>
                    <b className={styles.facilityNameCap}>SM Cebu City</b>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Name</div>
                    <b className={styles.facilityNameCap}>Jane Doe</b>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Phone Number</div>
                    <b className={styles.facilityNameCap}>+63 123 4567 789</b>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Booking Date</div>
                    <b className={styles.facilityNameCap}>June 27, 2025</b>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className={styles.facilityName}>Booking Hours</div>
                    <b className={styles.facilityNameCap}>10:00 AM</b>
                  </div>
                </div>
                <Image
                  className={styles.dividerIcon}
                  width={390}
                  height={1}
                  sizes="100vw"
                  alt=""
                  src="Divider1.svg"
                />
                <div className={styles.serviceNameParent}>
                  {summaryItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className={styles.rowContainer}>
                        <div className={styles.facilityName}>{item.label}</div>
                        <b className={styles.facilityNameCap}>{item.price}</b>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <Image
                  className={styles.dividerIcon1}
                  width={390}
                  height={1}
                  sizes="100vw"
                  alt=""
                  src="Divider1.svg"
                />
                <div className={styles.rowContainerTotal}>
                  <div className={styles.facilityName}>Total</div>
                  <b className={styles.facilityNameCap}>PHP 1000.00</b>
                </div>
              </div>

              <div
                className={styles.confirmSection}
                onClick={() => setIsAgreed(!isAgreed)}
                role="checkbox"
                aria-checked={isAgreed}
                tabIndex={0}
              >
                <div className={styles.header}>
                  <div
                    className={`${styles.checkbox} ${
                      isAgreed ? styles.checkboxActive : ""
                    }`}
                  >
                    {isAgreed && (
                      <Image
                        src="/Check Square.svg"
                        alt="check"
                        width={22}
                        height={22}
                      />
                    )}
                  </div>
                  <div className={styles.name}>
                    I agree to and confirm this booking summary.
                  </div>
                </div>
              </div>

              <div className={styles.messageWrapper}>
                <div
                  className={`${styles.privacyNotice} ${
                    isAgreed ? styles.visible : styles.hidden
                  }`}
                ></div>

                <div
                  className={`${styles.errorbox} ${
                    !isAgreed && errorMessage ? styles.visible : styles.hidden
                  }`}
                >
                  You must agree before confirming.
                </div>
              </div>
              <div
                className={`${styles.buttoncontainer} ${
                  buttonClicked ? styles.clicked : ""
                }`}
                style={{
                  backgroundColor: "#a68465",
                  opacity: isAgreed ? "1" : "0.5",
                  transition: "opacity 0.2s ease",
                }}
                onClick={handleNextClick}
              >
                <div className={styles.signup}>
                  <div className={styles.signupText}>Next</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paraContent} />
          <div className={styles.navigation}>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="landingLogo.svg"
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
            <div className={styles.navigationItem} />
            <div className={styles.genericAvatar}>
              <Image
                className={styles.avatar}
                width={40}
                height={40}
                sizes="100vw"
                alt=""
                src="/avatar.svg"
              />
            </div>
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
            <div className={styles.contactNumber}>// contact number</div>
            <b className={styles.support}>Support</b>
            <div className={styles.faqs}>FAQs</div>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
            <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
            <div className={styles.aboutUs}>About Us</div>
            <b className={styles.quickLinks}>Quick Links</b>
            <b className={styles.servease1}>servease</b>
            <div className={styles.home1}>Home</div>
            <div className={styles.discover1}>Discover</div>
            <div className={styles.createAnAccount}>Create an Account</div>
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
              src="landingLogo.svg"
            />
          </div>
          <div className={styles.lightDetailsBookingReviewS} />
        </div>
      </div>
    </div>
  );
};

export default Booking3;

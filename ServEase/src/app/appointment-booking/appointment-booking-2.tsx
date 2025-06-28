"use client";
import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/booking-appointment-2.module.css";
import { Calendar } from "@/components/components/ui/calendar";

const Booking2: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const Timeslot = [
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    if (!selectedTime) {
      setErrorMessage("Please select a time slot to proceed.");
      return;
    }

    setErrorMessage("");
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
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>1</div>
                    </div>
                    <div
                      className={styles.chooseServices}
                    >{`Choose Service(s)`}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameGroup}>
              <div className={styles.numberParent}>
                <div className={styles.number}>
                  <div className={styles.bgParent}>
                    <div className={styles.bg} />
                    <div className={styles.div}>2</div>
                  </div>
                  <div
                    className={styles.selectDate}
                  >{`Select Date & Time`}</div>
                </div>
                <div className={styles.pickAConvenient}>
                  Pick a convenient date and time for your appointment.
                  Available slots are based on real-time provider availability
                  to help you schedule with ease.
                </div>
                <div
                  className={styles.atLeastChoose}
                >{`*At least choose one date tayo :> `}</div>
              </div>
              <div className={styles.date}>{`Date`}</div>
              <div className="flex justify-center items-center">
                <div className="inline-flex rounded-xl border border-neutral-300 shadow-md p-6 bg-white justify-center items-center">
                  <Calendar
                    selected={date}
                    onSelect={setDate}
                    mode="single"
                    disabled={{ before: new Date() }}
                  />
                </div>
              </div>

              <div className={styles.date}>{`Timeslots`}</div>
              <div className={styles.buttonContainer}>
                {Timeslot.map((service) => (
                  <div
                    key={service}
                    className={`${styles.button3} ${
                      activeIndex === service ? styles.active : styles.inactive
                    }`}
                    onClick={() => {
                      setActiveIndex(service);
                      setSelectedTime(service);
                      setErrorMessage("");
                    }}
                  >
                    <div className={styles.star} />
                    <div className={styles.mondayFriday}>{service}</div>
                    <div className={styles.star} />
                  </div>
                ))}
              </div>

              <div className={styles.messageWrapper}>
                <div
                  className={`${styles.privacyNotice} ${
                    activeIndex ? styles.visible : styles.hidden
                  }`}
                >
                  <div className={styles.timeSection}>
                    <Image
                      src="/app_clock.svg"
                      alt="time"
                      width={20}
                      height={20}
                    />
                    <span>{activeIndex}</span>
                  </div>

                  <div className={styles.dateSection}>
                    <Image
                      src="/calendar_month.svg"
                      alt="calendar"
                      width={20}
                      height={20}
                    />
                    <span>
                      {date
                        ? date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                          })
                        : "No date selected"}
                    </span>
                  </div>
                </div>

                <div
                  className={`${styles.errorbox} ${
                    errorMessage ? styles.visible : styles.hidden
                  }`}
                >
                  Please select a time slot to proceed.
                </div>
              </div>

              <div
                className={`${styles.buttoncontainer} ${
                  buttonClicked ? styles.clicked : ""
                }`}
                style={{
                  backgroundColor: "#a68465",
                  opacity: activeIndex ? "1" : "0.5",
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

export default Booking2;

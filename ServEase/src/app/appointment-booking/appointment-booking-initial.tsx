"use client";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../styles/appointment-booking.module.css";
import Booking1 from "./appointment-booking-1";
import Booking2 from "./appointment-booking-2";
import Booking3 from "./appointment-booking-3";

function Stepper({ activeStep }: { activeStep: number }) {
  const getStepClass = (step: number) => {
    if (step === 4) return styles.groupParent1;
    return activeStep === step ? styles.groupParent : styles.groupContainer;
  };

  return (
    <div className={styles.stepper}>
      <div className={getStepClass(1)}>
        <div className={styles.bgParent}>
          <div className={styles.bg} />
          <div className={styles.div}>1</div>
        </div>
        <div className={styles.profile}>Service</div>
      </div>

      <div className={styles.stepperChild} />

      <div className={getStepClass(2)}>
        <div className={styles.bgParent}>
          <div className={styles.bg} />
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.profile}>Date & Time</div>
      </div>

      <div className={styles.stepperChild} />

      <div className={getStepClass(3)}>
        <div className={styles.bgParent}>
          <div className={styles.bg} />
          <div className={styles.div}>3</div>
        </div>
        <div className={styles.profile}>Review</div>
      </div>
    </div>
  );
}

type SectionProps = {
  id: number;
  title: string;
  children: React.ReactNode;
  activeSection: number | null;
  onSectionChange: (id: number | null) => void;
  currentStep: number;
  completedSteps: number[];
};

function ExpandableSection({
  id,
  title,
  children,
  activeSection,
  onSectionChange,
  currentStep,
  completedSteps,
}: SectionProps) {
  const isActive = activeSection === id;

  const handleClick = () => {
    if (id > currentStep) return;
    if (!isActive) {
      onSectionChange(id);
    } else {
      onSectionChange(null);
    }
  };

  return (
    <div className={styles.frameWrapper1}>
      <div
        onClick={handleClick}
        className={styles.frameWrapper2}
        style={{ cursor: id > currentStep ? "not-allowed" : "pointer" }}
      >
        <div className={styles.numberWrapper}>
          <div
            className={styles.number1}
            style={{
              opacity: isActive || completedSteps.includes(id) ? 1 : 0.5,
            }}
          >
            <div className={styles.bgParent1}>
              <div className={styles.bg4} />
              <div className={styles.div4}>{id}</div>
            </div>
            <div className={styles.contactInformation}>{title}</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.scrollContainer}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "16px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const AppointmentBooking: NextPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNextStep = () => {
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setActiveSection(nextStep);
  };

  const router = useRouter();

  const handleBackClick = () => {
    router.push("/landingpage");
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
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Stepper activeStep={activeSection ?? 0} />

            <ExpandableSection
              id={1}
              title="Choose Service(s)"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <Booking1
                onNext={() => {
                  setCurrentStep((prev) => Math.max(prev, 2));
                  handleNextStep();
                }}
              />
            </ExpandableSection>

            <ExpandableSection
              id={2}
              title="Select Date & Time"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <Booking2
                onNext={() => {
                  setCurrentStep((prev) => Math.max(prev, 3));
                  handleNextStep();
                }}
              />
            </ExpandableSection>

            <ExpandableSection
              id={3}
              title="Review Appointment"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <Booking3
                onNext={() => {
                  handleNextStep();
                }}
              />
            </ExpandableSection>
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
              <div className={styles.home} onClick={() => router.push("/home")}>
                Home
              </div>
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
            <div className={styles.home1} onClick={() => router.push("/home")}>
              Home
            </div>
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

export default AppointmentBooking;

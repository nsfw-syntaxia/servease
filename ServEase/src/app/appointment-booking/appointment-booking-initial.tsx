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
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;

"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../styles/register-client.module.css";
import ClientSignup1 from "./registerclientpage1";
import ClientSignup2 from "./registerclientpage2";
import ClientSignup3 from "./registerclientpage3";
import { completeClientRegistration } from "./actions";

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
        <div className={styles.profile}>Login</div>
      </div>

      <div className={styles.stepperChild} />

      <div className={getStepClass(2)}>
        <div className={styles.bgParent}>
          <div className={styles.bg} />
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.profile}>Profile</div>
      </div>

      <div className={styles.stepperChild} />

      <div className={getStepClass(3)}>
        <div className={styles.bgParent}>
          <div className={styles.bg} />
          <div className={styles.div}>3</div>
        </div>
        <div className={styles.profile}>Contacts</div>
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

// Define the form data structure
interface FormData {
  // Step 1 - Login
  email: string;
  password: string;
  
  // Step 2 - Profile
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  
  // Step 3 - Contact
  contact: string;
}

const ClientSignup: NextPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Store all form data in state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    contact: ''
  });

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

  // Update form data from individual steps
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  return (
    <div className={styles.facilitySignup1}>
      <div className={styles.headerNav}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="Servease Logo.svg"
        />

        <div className={styles.link1} onClick={handleBackClick}>
          <Image
            className={styles.outlineArrowsArrowLeft}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="Arrow Left.svg"
          />
          <div className={styles.getStarted}>Back</div>
        </div>
      </div>

      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>
              Sign up and get connected with trusted professionals.
            </div>
          </div>
          
          <form action={completeClientRegistration} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Hidden inputs to store all form data */}
            <input type="hidden" name="email" value={formData.email} />
            <input type="hidden" name="password" value={formData.password} />
            <input type="hidden" name="first_name" value={formData.firstName} />
            <input type="hidden" name="middle_name" value={formData.middleName} />
            <input type="hidden" name="last_name" value={formData.lastName} />
            <input type="hidden" name="gender" value={formData.gender} />
            <input type="hidden" name="birth_month" value={formData.birthMonth} />
            <input type="hidden" name="birth_day" value={formData.birthDay} />
            <input type="hidden" name="birth_year" value={formData.birthYear} />
            <input type="hidden" name="contact" value={formData.contact} />
            
            <Stepper activeStep={activeSection ?? 0} />

            <ExpandableSection
              id={1}
              title="Login"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <ClientSignup1 
                onNext={handleNextStep} 
                onDataChange={updateFormData}
                initialData={{ email: formData.email, password: formData.password }}
              />
            </ExpandableSection>

            <ExpandableSection
              id={2}
              title="Profile"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <ClientSignup2 
                onNext={handleNextStep} 
                onDataChange={updateFormData}
                initialData={{
                  firstName: formData.firstName,
                  middleName: formData.middleName,
                  lastName: formData.lastName,
                  gender: formData.gender,
                  birthMonth: formData.birthMonth,
                  birthDay: formData.birthDay,
                  birthYear: formData.birthYear
                }}
              />
            </ExpandableSection>

            <ExpandableSection
              id={3}
              title="Contact Information"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentStep={currentStep}
              completedSteps={completedSteps}
            >
              <ClientSignup3 
                onDataChange={updateFormData}
                initialData={{ contact: formData.contact }}
              />
            </ExpandableSection>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;
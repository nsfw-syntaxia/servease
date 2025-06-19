'use client'

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/RegisterPage1.module.css";

const ClientSignup4: NextPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  const handleMonthSelect = (month: { value: string; label: string }) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
  };

  const handleDaySelect = (day: { value: string; label: string }) => {
    setSelectedDay(day.label);
    setIsDayOpen(false);
  };

  const handleYearSelect = (year: { value: string; label: string }) => {
    setSelectedYear(year.label);
    setIsYearOpen(false);
  };

  return (
    <div className={styles.clientSignup4}>
      <div className={styles.headerNavParent}>
        <div className={styles.headerNav}>
          <Image
            className={styles.serveaseLogoAlbumCover3}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/servease logo.svg"
          />
          <div className={styles.links}>
            <div className={styles.home}>Home</div>
            <div className={styles.webDesigns}>Web designs</div>
            <div className={styles.webDesigns}>Mobile designs</div>
            <div className={styles.webDesigns}>Design principles</div>
            <div className={styles.webDesigns}>Illustrations</div>
          </div>
          <div className={styles.loginSignUp}>
            <div className={styles.dropdown} />
            <div className={styles.button} />
            <div className={styles.button} />
          </div>
          <div className={styles.divider} />
          <Image
            className={styles.outlineArrowsArrowLeft}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/Arrow Left.svg"
          />
          <div className={styles.back}>Back</div>
        </div>
        <div className={styles.joinUs}>
          <div className={styles.joinUsChild} />
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>
              Sign up and get connected with trusted professionals.
            </div>
            <div className={styles.stepper}>
              <div className={styles.groupParent}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>1</div>
                </div>
                <div className={styles.profile}>Profile</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.groupContainer}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>2</div>
                </div>
                <div className={styles.profile}>Contacts</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.frameDiv}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>3</div>
                </div>
                <div className={styles.profile}>Login</div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.frameContainer}>
                <div className={styles.numberParent}>
                  <div className={styles.number}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>1</div>
                    </div>
                    <div className={styles.contactInformation}>Profile</div>
                  </div>
                  <div className={styles.tellUsA}>
                    Tell us a bit about yourself so we can personalize your
                    experience.
                  </div>
                  <div className={styles.allFieldsRequired}>
                    *All fields required unless noted.
                  </div>
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*First name</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>
                      Middle name (as applicable)
                    </div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Last name</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.gender}>
                  <div className={styles.webDesigns}>What's your date of birth?</div>
                  <div className={styles.textFieldParent}>
                    {/* Month Dropdown */}
                    <div className={styles.textField6}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Month</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div 
                          className={`${styles.textField2} ${isMonthOpen ? styles.dropdownOpen : ''}`}
                          onClick={() => setIsMonthOpen(!isMonthOpen)}
                        >
                          <div className={styles.month}>
                            <span>{selectedMonth || "Select month"}</span>
                          </div>
                          <div className={styles.icons}>
                            <Image 
                              className={`${styles.vectorIcon7} ${isMonthOpen ? styles.rotated : ''}`}
                              width={12} 
                              height={7.4} 
                              sizes="100vw" 
                              alt="" 
                              src="/icons.svg" 
                            />
                          </div>
                        </div>
                        {isMonthOpen && (
                          <div className={styles.dropdownMenu}>
                            {months.map((month) => (
                              <div
                                key={month.value}
                                className={styles.dropdownItem}
                                onClick={() => handleMonthSelect(month)}
                              >
                                {month.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Day Dropdown */}
                    <div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Day</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div 
                          className={`${styles.textField2} ${isDayOpen ? styles.dropdownOpen : ''}`}
                          onClick={() => setIsDayOpen(!isDayOpen)}
                        >
                          <div className={styles.day}>
                            <span>{selectedDay || "Select day"}</span>
                          </div>
                          <div className={styles.icons}>
                            <Image 
                              className={`${styles.vectorIcon7} ${isDayOpen ? styles.rotated : ''}`}
                              width={12} 
                              height={7.4} 
                              sizes="100vw" 
                              alt="" 
                              src="/icons.svg" 
                            />
                          </div>
                        </div>
                        {isDayOpen && (
                          <div className={styles.dropdownMenu}>
                            {days.map((day) => (
                              <div
                                key={day.value}
                                className={styles.dropdownItem}
                                onClick={() => handleDaySelect(day)}
                              >
                                {day.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Year Dropdown */}
                    <div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Year</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div 
                          className={`${styles.textField2} ${isYearOpen ? styles.dropdownOpen : ''}`}
                          onClick={() => setIsYearOpen(!isYearOpen)}
                        >
                          <div className={styles.year}>
                            <span>{selectedYear || "Select year"}</span>
                          </div>
                          <div className={styles.icons}>
                            <Image 
                              className={`${styles.vectorIcon7} ${isYearOpen ? styles.rotated : ''}`}
                              width={12} 
                              height={7.4} 
                              sizes="100vw" 
                              alt="" 
                              src="/icons.svg" 
                            />
                          </div>
                        </div>
                        {isYearOpen && (
                          <div className={styles.dropdownMenu}>
                            {years.map((year) => (
                              <div
                                key={year.value}
                                className={styles.dropdownItem}
                                onClick={() => handleYearSelect(year)}
                              >
                                {year.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.button2}>
                <div className={styles.signUpWrapper}>
                  <div className={styles.webDesigns}>Next</div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameWrapper1}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>2</div>
                    </div>
                    <div className={styles.contactInformation}>
                      Contact Information
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameWrapper1}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>3</div>
                    </div>
                    <div className={styles.contactInformation}>Login</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup4;
"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/RegisterFacilityPage1.module.css";

const FacilitySignup1: NextPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const Categories = [
    {
      value: "01",
      label: "Personal Care & Beauty Services",
      subcategories: [
        "Barbershops",
        "Hair Salons",
        "Nail Salons",
        "Spa & Massage Centers",
        "Tattoo and Piercing Parlors",
      ],
    },
    {
      value: "02",
      label: "Health & Medical Services",
      subcategories: [
        "Animal Clinics",
        "Dentists",
        "Dermatologists",
        "Hospitals",
        "Laboratories",
        "Pharmacies",
        "Psychologists",
      ],
    },
    {
      value: "03",
      label: "Fitness & Sports Services",
      subcategories: ["Dance Studios", "Gyms", "Sports Centers"],
    },
    {
      value: "04",
      label: "Education & Tutoring Services",
      subcategories: [
        "Schools (Daycare, Nursery, Elementary, High Schools, Colleges)",
        "Tutoring Centers",
      ],
    },
    {
      value: "05",
      label: "Repair & Technical Services",
      subcategories: [
        "Appliance Repair",
        "Car Wash",
        "Car/Motorcycle Repair Shops",
        "Electronics Repair",
      ],
    },
    {
      value: "06",
      label: "Food & Beverages Services",
      subcategories: [
        "Bakeries",
        "Bars",
        "Cafes & Coffee Shops",
        "Mini Mart",
        "Restaurants",
        "Supermarkets / Grocery Stores",
      ],
    },
    {
      value: "07",
      label: "Miscellaneous Services",
      subcategories: [
        "Funeral Homes",
        "Hotels",
        "Laundry Shops",
        "Tailoring Services",
      ],
    },
  ];

  const handleCategorySelect = (category: { value: string; label: string }) => {
    setSelectedCategory(category.label);
    setSelectedSubcategory("");
    setIsCategoryOpen(false);
  };

  const selectedCategoryObject = Categories.find(
    (c) => c.label === selectedCategory
  );
  const subcategories = selectedCategoryObject?.subcategories || [];

  //WORKING DAYS
  const workingDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getLabel = () => {
    if (selectedDays.length === 7) return "Everyday";
    if (selectedDays.length === 0) return "None selected";
    return `Selected: ${selectedDays.join(", ")}`;
  };

  const isDaySelected = (day: string) => selectedDays.includes(day);

  //TIMERPICKER

  const generateTimeOptions = () => {
    const times: string[] = [];

    const periods = ["AM", "PM"];

    periods.forEach((period) => {
      for (let hour = 1; hour <= 12; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
          const h = hour.toString().padStart(2, "0");
          const m = minute.toString().padStart(2, "0");
          times.push(`${h}:${m} ${period}`);
        }
      }
    });

    return times;
  };

  const handleTimeSelect = (time: string, isStart: boolean) => {
    if (isStart) {
      setSelectedStartTime(time);
      setIsStartTimeOpen(false);
    } else {
      setSelectedEndTime(time);
      setIsEndTimeOpen(false);
    }
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
        <Image
          className={styles.outlineArrowsArrowLeft}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="Arrow Left.svg"
        />
        <div className={styles.back}>Back</div>
      </div>
      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>
              Sign up and get connected with the clients.
            </div>
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
              <div className={styles.profile}>Documents</div>
            </div>
            <div className={styles.stepperChild} />
            <div className={styles.groupContainer}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>3</div>
              </div>
              <div className={styles.profile}>Contacts</div>
            </div>
            <div className={styles.stepperChild} />
            <div className={styles.groupParent1}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>4</div>
              </div>
              <div className={styles.profile}>Login</div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.frameContainer}>
                <div className={styles.numberParent}>
                  <div className={styles.number}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>1</div>
                    </div>
                    <div className={styles.contactInformation}>Profile</div>
                  </div>
                  <div className={styles.provideKeyDetails}>
                    Provide key details about your service facility that will be
                    visible to clients browsing and booking services through the
                    platform.
                  </div>
                  <div className={styles.allFieldsRequired}>
                    *All fields required unless noted.
                  </div>
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Owner name</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Facility Name</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Location</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.frameWrapper}>
                  <div className={styles.textFieldParent}>
                    {/*<div className={styles.textField6}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>*Category</div>
                      </div>
                      <div className={styles.textField33}>
                        <div className={styles.inputs}></div>
                        <div className={styles.icons}>
                          <Image
                            className={styles.vectorIcon}
                            width={12}
                            height={7.4}
                            sizes="100vw"
                            alt=""
                            src="/icons.svg"
                          />
                        </div>
                      </div>
                    </div>*/}
                    <div className={styles.textField6}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>*Category</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div
                          className={`${styles.textField2} ${
                            isCategoryOpen ? styles.dropdownOpen : ""
                          }`}
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                          <div className={styles.category}>
                            <span>{selectedCategory || "Select category"}</span>
                          </div>
                          <div className={styles.icons}>
                            <Image
                              className={`${styles.vectorIcon7} ${
                                isCategoryOpen ? styles.rotated : ""
                              }`}
                              width={12}
                              height={7.4}
                              sizes="100vw"
                              alt=""
                              src="/icons.svg"
                            />
                          </div>
                        </div>
                        {isCategoryOpen && (
                          <div className={styles.dropdownMenu}>
                            {Categories.map((category) => (
                              <div
                                key={category.value}
                                className={styles.dropdownItem}
                                onClick={() => handleCategorySelect(category)}
                              >
                                {category.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/*<div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>*Specific Category</div>
                      </div>
                      <div className={styles.textField33}>
                        <div className={styles.inputs}>
                          <div className={styles.webDesigns1}>
                            Enter your Specific Category name please
                          </div>
                          <div className={styles.inputsItem} />
                        </div>
                        <div className={styles.icons}>
                          <Image
                            className={styles.vectorIcon}
                            width={12}
                            height={7.4}
                            sizes="100vw"
                            alt=""
                            src="/icons.svg"
                          />
                        </div>
                      </div>
                    </div>*/}
                    <div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>*Specific Category</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div
                          className={`${styles.textField2} ${
                            isSubcategoryOpen ? styles.dropdownOpen : ""
                          }`}
                          onClick={() =>
                            setIsSubcategoryOpen(!isSubcategoryOpen)
                          }
                        >
                          <div className={styles.sub}>
                            <span>
                              {selectedSubcategory ||
                                "Select specific category"}
                            </span>
                          </div>
                          <div className={styles.icons}>
                            <Image
                              className={`${styles.vectorIcon7} ${
                                isSubcategoryOpen ? styles.rotated : ""
                              }`}
                              width={12}
                              height={7.4}
                              sizes="100vw"
                              alt=""
                              src="/icons.svg"
                            />
                          </div>
                        </div>
                        {isSubcategoryOpen && selectedCategory && (
                          <div className={styles.dropdownMenu}>
                            {Categories.find(
                              (c) => c.label === selectedCategory
                            )?.subcategories.map((sub) => (
                              <div
                                key={sub}
                                className={styles.dropdownItem}
                                onClick={() => {
                                  setSelectedSubcategory(sub);
                                  setIsSubcategoryOpen(false);
                                }}
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*<div className={styles.textField10}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Working Days</div>
                    <div className={styles.passwordHideSee}>
                      <div className={styles.icon}>
                        <Image
                          className={styles.iconChild}
                          width={18.2}
                          height={16}
                          sizes="100vw"
                          alt=""
                          src="Group 1.svg"
                        />
                      </div>
                      <div className={styles.hide}>Hide</div>
                    </div>
                  </div>
                  <div className={styles.labelGroup}>
                    <div className={styles.label}>Monday - Friday</div>
                    <div className={styles.passwordHideSee}>
                      <div className={styles.icon}>
                        <Image
                          className={styles.iconChild}
                          width={18.2}
                          height={16}
                          sizes="100vw"
                          alt=""
                          src="Group 1.svg"
                        />
                      </div>
                      <div className={styles.hide}>Hide</div>
                    </div>
                  </div>
                  <div className={styles.textField11}>
                    <div className={styles.inputs}>
                      <div className={styles.webDesigns}>123456</div>
                      <div className={styles.inputsChild} />
                    </div>
                    <div className={styles.icons2} />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.contentLightMode}>
                      <div className={styles.mo}>Mo</div>
                    </div>
                    <div className={styles.contentLightMode}>
                      <div className={styles.mo}>Tu</div>
                    </div>
                    <div className={styles.contentLightMode}>
                      <div className={styles.mo}>We</div>
                    </div>
                    <div className={styles.contentLightMode}>
                      <div className={styles.mo}>Th</div>
                    </div>
                    <div className={styles.contentLightMode}>
                      <div className={styles.mo}>Fr</div>
                    </div>
                    <div className={styles.contentLightMode5}>
                      <div className={styles.mo}>Sa</div>
                    </div>
                    <div className={styles.contentLightMode5}>
                      <div className={styles.mo}>Su</div>
                    </div>
                  </div>
                  <div className={styles.errorMessage}>Error message</div>
                </div>*/}
                <div className={styles.textField10}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Working Days</div>
                  </div>

                  <div className={styles.labelGroup}>
                    <div className={styles.label}>{getLabel()}</div>
                  </div>

                  <div className={styles.row}>
                    {workingDaysList.map((day) => (
                      <div
                        key={day}
                        className={
                          isDaySelected(day)
                            ? styles.contentLightModeSelected
                            : styles.contentLightMode
                        }
                        onClick={() => toggleDay(day)}
                      >
                        <div className={styles.mo}>{day}</div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.errorMessage}>Error message</div>
                </div>
                <div className={styles.textFieldGroup}>
                  {/*<div className={styles.textField12}>
                    <div className={styles.webDesigns}>*Working Hours</div>
                    <div className={styles.labelGroup}>
                      <div className={styles.label}>*Start Time</div>
                      <div className={styles.passwordHideSee}>
                        <div className={styles.icon}>
                          <Image
                            className={styles.iconChild}
                            width={18.2}
                            height={16}
                            sizes="100vw"
                            alt=""
                            src="Group 1.svg"
                          />
                        </div>
                        <div className={styles.hide}>Hide</div>
                      </div>
                    </div>
                    <div className={styles.textField13}>
                      <div className={styles.inputs}>
                        <div className={styles.webDesigns1}></div>
                        <div className={styles.inputsItem} />
                      </div>
                      <div className={styles.icons}>
                        <Image
                          className={styles.vectorIcon}
                          width={12}
                          height={7.4}
                          sizes="100vw"
                          alt=""
                          src="/icons.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.errorMessage}>Error message</div>
                  </div>*/}
                  <div className={styles.textField12}>
                    <div className={styles.webDesigns}>*Working Hours</div>
                    <div className={styles.labelGroup}>
                      <div className={styles.label}>*Start Time</div>
                      <div className={styles.passwordHideSee}>
                        <div className={styles.icon}>
                          <Image
                            className={styles.iconChild}
                            width={18.2}
                            height={16}
                            sizes="100vw"
                            alt=""
                            src="Group 1.svg"
                          />
                        </div>
                        <div className={styles.hide}>Hide</div>
                      </div>
                    </div>
                    <div className={styles.dropdownContainer}>
                      <div
                        className={`${styles.textField2} ${
                          isStartTimeOpen ? styles.dropdownOpen : ""
                        }`}
                        onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
                      >
                        <div className={styles.category}>
                          <span>
                            {selectedStartTime || "Select start time"}
                          </span>
                        </div>
                        <div className={styles.icons}>
                          <Image
                            className={`${styles.vectorIcon7} ${
                              isStartTimeOpen ? styles.rotated : ""
                            }`}
                            width={12}
                            height={7.4}
                            sizes="100vw"
                            alt=""
                            src="/icons.svg"
                          />
                        </div>
                      </div>

                      {isStartTimeOpen && (
                        <div className={styles.dropdownMenu}>
                          {generateTimeOptions().map((time) => (
                            <div
                              key={time}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setSelectedStartTime(time);
                                setIsStartTimeOpen(false);
                              }}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.textField14}>
                    <div className={styles.labelParent2}>
                      <div className={styles.label}>to</div>
                      <div className={styles.passwordHideSee}>
                        <div className={styles.icon}>
                          <Image
                            className={styles.iconChild}
                            width={18.2}
                            height={16}
                            sizes="100vw"
                            alt=""
                            src="Group 1.svg"
                          />
                        </div>
                        <div className={styles.hide}>Hide</div>
                      </div>
                    </div>
                    <div className={styles.textField15}>
                      <div className={styles.inputs}>
                        <div className={styles.webDesigns1}>
                          Enter your profile name
                        </div>
                        <div className={styles.inputsItem} />
                      </div>
                      <div className={styles.icons}>
                        <Image
                          className={styles.vectorIcon}
                          width={12}
                          height={7.4}
                          sizes="100vw"
                          alt=""
                          src="/icons.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.errorMessage2}>Error message</div>
                  </div>
                  <div className={styles.textField16}>
                    <div className={styles.labelGroup}>
                      <div className={styles.label}>*End Time</div>
                      <div className={styles.passwordHideSee}>
                        <div className={styles.icon}>
                          <Image
                            className={styles.iconChild}
                            width={18.2}
                            height={16}
                            sizes="100vw"
                            alt=""
                            src="Group 1.svg"
                          />
                        </div>
                        <div className={styles.hide}>Hide</div>
                      </div>
                    </div>
                    <div className={styles.dropdownContainer}>
                      <div
                        className={`${styles.textField2} ${
                          isEndTimeOpen ? styles.dropdownOpen : ""
                        }`}
                        onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
                      >
                        <div className={styles.category}>
                          <span>{selectedEndTime || "Select End time"}</span>
                        </div>
                        <div className={styles.icons}>
                          <Image
                            className={`${styles.vectorIcon7} ${
                              isEndTimeOpen ? styles.rotated : ""
                            }`}
                            width={12}
                            height={7.4}
                            sizes="100vw"
                            alt=""
                            src="/icons.svg"
                          />
                        </div>
                      </div>

                      {isEndTimeOpen && (
                        <div className={styles.dropdownMenu}>
                          {generateTimeOptions().map((time) => (
                            <div
                              key={time}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setSelectedEndTime(time);
                                setIsEndTimeOpen(false);
                              }}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/*<div className={styles.textField16}>
                    <div className={styles.webDesigns}>*Working Hours</div>
                    <div className={styles.labelGroup}>
                      <div className={styles.label}>*End Time</div>

                      <div className={styles.passwordHideSee}>
                        <div className={styles.icon}>
                          <Image
                            className={styles.iconChild}
                            width={18.2}
                            height={16}
                            sizes="100vw"
                            alt=""
                            src="Group 1.svg"
                          />
                        </div>

                        <div className={styles.hide}>Hide</div>
                      </div>
                    </div>
                    <div className={styles.textField13}>
                      <div className={styles.inputs}>
                        <div className={styles.webDesigns1}></div>
                        <div className={styles.inputsItem} />
                      </div>

                      <div className={styles.icons}>
                        <Image
                          className={styles.vectorIcon}
                          width={12}
                          height={7.4}
                          sizes="100vw"
                          alt=""
                          src="/icons.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.errorMessage}>Error message</div>
                  </div>*/}
                </div>
              </div>
              <div className={styles.button2}>
                <div className={styles.signUpWrapper}>
                  <div className={styles.webDesigns}>Next</div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>2</div>
                    </div>
                    <div className={styles.contactInformation}>Documents</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>3</div>
                    </div>
                    <div className={styles.contactInformation}>
                      Contact Information
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>4</div>
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

export default FacilitySignup1;

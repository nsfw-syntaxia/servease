"use client";

import React, { useState, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-profile.module.css";

const ProfileFacility: NextPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Service Facility Name",
    email: "email@email.com",
    address: "Address",
    contactNumber: "+639XX XXXX XXX",
    category: "Category",
    specificCategory: "Specific Category",
    profileImage: "/avatar.svg",
  });

  const [editData, setEditData] = useState({ ...profileData });
  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (contactNumber: string) => {
    const phoneRegex = /^\+63\d{3}\s\d{4}\s\d{3}$/;
    return phoneRegex.test(contactNumber);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setErrors({ email: "", contactNumber: "" });
  };

  const handleSave = () => {
    const newErrors = { email: "", contactNumber: "" };
    if (!validateEmail(editData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!validateContactNumber(editData.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number.";
    }
    setErrors(newErrors);
    if (!newErrors.email && !newErrors.contactNumber) {
      setProfileData({ ...editData });
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // clear error when user starts typing
    if (field === "email" && errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (field === "contactNumber" && errors.contactNumber) {
      setErrors((prev) => ({ ...prev, contactNumber: "" }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG or JPG image file.");
    }
  };
  const triggerFileUpload = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={styles.profileFacility}>
      <div className={styles.background} />
      <div className={styles.content}>
        <div className={styles.pfpContainer} />
        <Image
          className={styles.pfpCoverIcon}
          width={1032}
          height={148}
          sizes="100vw"
          alt=""
          src="/profile-cover.png"
        />
        <div className={styles.profileInfo}>
          <div className={styles.servicefacilityemailcom}>
            servicefacility@email.com
          </div>
          <div className={styles.verifiedFaci}>
            <div className={styles.serviceFacilityName}>
              Service Facility Name
            </div>
            <div className={styles.verifiedProfile}>
              <div className={styles.verified}>
                <div className={styles.verified1}>Verified</div>
              </div>
              <Image
                className={styles.verifiedAccIcon}
                width={26}
                height={26}
                sizes="100vw"
                alt=""
                src="/verified acc.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.tags}>
          <div className={styles.contactNumTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Tags</div>
        </div>
        <div className={styles.tags2}>Tags</div>
        <div className={styles.emailAdd}>
          <div className={styles.contactNumTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Email Address</div>
        </div>
        <div className={styles.emailAddress1}>Email Address</div>
        <div className={styles.specCategory}>
          <div className={styles.contactNumTbx} />
          <div className={styles.emailAddress}>Specific Category</div>
        </div>
        <div className={styles.specificCategory1}>Specific Category</div>
        <div className={styles.address}>
          <div className={styles.contactNumTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Address</div>
        </div>
        <div className={styles.address2}>Address</div>
        <div className={styles.contactNum}>
          <div className={styles.contactNumTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>+63 9XX XXXX XXX</div>
        </div>
        <div className={styles.contactNumber}>Contact Number</div>
        <div className={styles.category}>
          <div className={styles.contactNumTbx} />
          <div className={styles.emailAddress}>Category</div>
        </div>
        <div className={styles.category2}>Category</div>
        <div className={styles.name}>
          <div className={styles.contactNumTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Service Facility Name</div>
        </div>
        <div className={styles.serviceFacilityName2}>Service Facility Name</div>
        <div className={styles.pfp}>
          <Image
            className={styles.avatarIcon}
            width={70.5}
            height={64.1}
            sizes="100vw"
            alt=""
            src="/avatar.svg"
          />
        </div>
        <div className={styles.saveProfileBtn}>
          <div className={styles.editLabel}>
            <div className={styles.save}>Save</div>
          </div>
          <Image
            className={styles.checkIcon}
            width={20}
            height={20}
            sizes="100vw"
            alt=""
            src="/check_thin.svg"
          />
        </div>
        <div className={styles.editProfileBtn}>
          <div className={styles.editLabel}>
            <div className={styles.save}>Edit</div>
          </div>
          <Image
            className={styles.checkIcon}
            width={20}
            height={20}
            sizes="100vw"
            alt=""
            src="/edit-white.svg"
          />
        </div>
        <div className={styles.circleEditPfp} />
        <Image
          className={styles.editPfpIcon}
          width={19}
          height={19}
          sizes="100vw"
          alt=""
          src="/edit-profile.svg"
        />
        <div className={styles.faciPhotos} />
        <div className={styles.photosDisplay}>
          <div className={styles.addPhotos}>
            <Image
              className={styles.addContainerIcon}
              width={108}
              height={200}
              sizes="100vw"
              alt=""
              src="/add container.svg"
            />
            <div className={styles.plus}>
              <Image
                className={styles.iconplus}
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/plus icon.svg"
              />
            </div>
          </div>
          <Image
            className={styles.photoContainerIcon}
            width={200}
            height={200}
            sizes="100vw"
            alt=""
            src="/photo container.svg"
          />
        </div>
        <div className={styles.photos}>Photos</div>
        <div className={styles.moreActions} />
        <div className={styles.passLabel}>
          <div className={styles.password}>Password</div>
        </div>
        <div className={styles.changePassBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Change Password</div>
        </div>
        <div className={styles.circlePassword} />
        <Image
          className={styles.lockIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/change-pass.svg"
        />
        <div className={styles.notifLabel}>
          <div className={styles.password}>Notifications</div>
        </div>
        <div className={styles.enableBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Enable</div>
        </div>
        <div className={styles.circleNotif} />
        <Image
          className={styles.notificationIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/notification-enable.svg"
        />
        <div className={styles.accountLabel}>
          <div className={styles.password}>Account</div>
        </div>
        <div className={styles.deleteAccBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Delete Account</div>
        </div>
        <div className={styles.circleSetting} />
        <Image
          className={styles.settingIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/setting-client.svg"
        />
        <div className={styles.servicesOfferedLabel}>
          <div className={styles.password}>Services Offered</div>
        </div>
        <div className={styles.viewServicesBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>View</div>
        </div>
        <div className={styles.servicesCircle} />
        <Image
          className={styles.briefcaseIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/briefcase.svg"
        />
        <div className={styles.appointmentLabel}>
          <div className={styles.password}>Appointment Timeslots</div>
        </div>
        <div className={styles.viewAppointmentsBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>View</div>
        </div>
        <div className={styles.appointmentsCircle} />
        <Image
          className={styles.clockIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/clock-profile.svg"
        />
      </div>
      <b className={styles.profile}>Profile</b>
    </div>
  );
};

export default ProfileFacility;

"use client";

import React, { useState, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-profile.module.css";
import { type FacilityProfileDataType } from "./actions";
import { updateUserProfile, updateUserEmail } from "./actions";
import { createClient } from "../utils/supabase/client";

const ProfileFacility: NextPage<{ initialData: FacilityProfileDataType }> = ({
  initialData,
}) => {
  const placeholders = {
    name: "Service Facility Name",
    address: "Address",
    email: "email@email.com",
    contactNumber: "+639XX XXXX XXX",
    category: "Category",
    specificCategory: "Specific Category",
    tags: "Tags",
  };

  const [profileData, setProfileData] = useState({
    name: initialData.name,
    email: initialData.email,
    address: initialData.address,
    contactNumber: initialData.contactNumber,
    category: initialData.category,
    specificCategory: initialData.specificCategory,
    tags: initialData.tags,
    profileImage: initialData.profileImage,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isVerified, setIsVerified] = useState(initialData.isVerified);

  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
    name: "",
    address: "",
    tags: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [pfpFile, setPfpFile] = useState<File | null>(null);

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
    setErrors({
      email: "",
      contactNumber: "",
      name: "",
      address: "",
      tags: "",
    });
  };

  const handleSave = async () => {
    const trimmedData = {
      name: editData.name.trim(),
      address: editData.address.trim(),
      contactNumber: editData.contactNumber.trim(),
      email: editData.email.trim(),
      tags: editData.tags.trim(),
    };

    // validation block
    const newErrors = {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      tags: "",
    };

    // check for empty or placeholder values
    if (!trimmedData.name || trimmedData.name === placeholders.name) {
      newErrors.name = "Facility name cannot be empty.";
    }
    if (!trimmedData.address || trimmedData.address === placeholders.address) {
      newErrors.address = "Address cannot be empty.";
    }
    if (
      !trimmedData.contactNumber ||
      trimmedData.contactNumber === placeholders.contactNumber
    ) {
      newErrors.contactNumber = "Contact number cannot be empty.";
    }
    if (!trimmedData.email) {
      newErrors.email = "Email address cannot be empty.";
    }

    // check formatting if the field isn't already marked with an error
    if (!newErrors.email && !validateEmail(trimmedData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (
      !newErrors.contactNumber &&
      !validateContactNumber(trimmedData.contactNumber)
    ) {
      newErrors.contactNumber = "Invalid contact number.";
    }

    // update the errors state
    setErrors(newErrors);

    // if any error message exists, stop the save process
    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    // save if no errors
    setIsSaving(true);
    let newPfpUrl: string | undefined = undefined;

    // file upload
    if (pfpFile) {
      const supabase = createClient();
      const filePath = `public/${initialData.email}-avatar`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, pfpFile, { upsert: true });

      if (uploadError) {
        alert("Error uploading profile picture: " + uploadError.message);
        setIsSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      newPfpUrl = urlData.publicUrl;
    }

    // email address update
    if (editData.email !== initialData.email) {
      const { error: emailError } = await updateUserEmail(editData.email);
      if (emailError) {
        alert("Email Update Failed: " + emailError);
      } else {
        alert("A confirmation link has been sent to your new email address.");
      }
    }

    // profile data update
    const payload = {
      full_name: trimmedData.name,
      address: trimmedData.address,
      contact_number: trimmedData.contactNumber,
      ...(newPfpUrl && { picture_url: newPfpUrl }),
    };

    const { error: profileError } = await updateUserProfile(payload);

    if (profileError) {
      alert("Error saving profile: " + profileError);
    } else {
      setProfileData({
        ...editData,
        profileImage: newPfpUrl || editData.profileImage,
      });
      setIsEditing(false);
      setPfpFile(null);
    }

    setIsSaving(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    // clear error for the specific field when user types
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
            {profileData.email}
          </div>
          <div className={styles.verifiedFaci}>
            <div className={styles.serviceFacilityName}>{profileData.name}</div>
            {isVerified && (
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
            )}
          </div>
        </div>

        {/* tags */}
        <div className={styles.tags2}>Tags</div>
        <div className={styles.tags}>
          <div className={styles.contactNumTbx} />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt="edit"
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={styles.profileInput}
              value={editData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="Tags"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.tags}</div>
          )}
        </div>

        {/* email address */}
        <div className={styles.emailAddress1}>Email Address</div>
        <div className={styles.emailAdd}>
          <div
            className={`${styles.contactNumTbx} ${
              errors.email ? styles.tbxError : ""
            }`}
          />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt="edit"
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="email"
              className={`${styles.profileInput} ${
                errors.email ? styles.inputError : ""
              }`}
              value={editData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@email.com"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.email}</div>
          )}
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}
        </div>

        {/* specific category*/}
        <div className={styles.specificCategory1}>Specific Category</div>
        <div className={styles.specCategory}>
          <div className={styles.contactNumTbx} />
          <div className={styles.profileDataText}>
            {profileData.specificCategory}
          </div>
        </div>

        {/* address */}
        <div className={styles.address2}>Address</div>
        <div className={styles.address}>
          <div className={styles.contactNumTbx} />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt="edit"
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={styles.profileInput}
              value={editData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.address}</div>
          )}
        </div>

        {/* contact num */}
        <div className={styles.contactNumber}>Contact Number</div>
        <div className={styles.contactNum}>
          <div
            className={`${styles.contactNumTbx} ${
              errors.contactNumber ? styles.tbxError : ""
            }`}
          />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt="edit"
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={`${styles.profileInput} ${
                errors.contactNumber ? styles.inputError : ""
              }`}
              value={editData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              placeholder="+63 9XX XXXX XXX"
            />
          ) : (
            <div className={styles.profileDataText}>
              {profileData.contactNumber}
            </div>
          )}
          {errors.contactNumber && (
            <div className={styles.errorMessage}>{errors.contactNumber}</div>
          )}
        </div>

        {/* category */}
        <div className={styles.category2}>Category</div>
        <div className={styles.category}>
          <div className={styles.contactNumTbx} />
          <div className={styles.profileDataText}>{profileData.category}</div>
        </div>

        {/* faci name */}
        <div className={styles.serviceFacilityName2}>Service Facility Name</div>
        <div className={styles.name}>
          <div className={styles.contactNumTbx} />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt="edit"
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={styles.profileInput}
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Service Facility Name"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.name}</div>
          )}
        </div>

        {/* pfp or logo */}
        <div className={styles.pfp}>
          <Image
            className={styles.avatarIcon}
            layout="fill"
            objectFit="cover"
            alt="Profile Picture"
            src={isEditing ? editData.profileImage : profileData.profileImage}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/png,image/jpeg"
          onChange={handleFileUpload}
        />
        {isEditing && (
          <>
            <div className={styles.circleEditPfp} onClick={triggerFileUpload} />
            <Image
              className={styles.editPfpIcon}
              width={19}
              height={19}
              sizes="100vw"
              alt="Edit PFP"
              src="/edit-profile.svg"
              onClick={triggerFileUpload}
            />
          </>
        )}

        {/* edit or save btns */}
        {isEditing ? (
          <div className={styles.saveProfileBtn} onClick={handleSave}>
            <div className={styles.editLabel}>
              <div className={styles.save}>Save</div>
            </div>
            <Image
              className={styles.checkIcon}
              width={20}
              height={20}
              sizes="100vw"
              alt="save"
              src="/check_thin.svg"
            />
          </div>
        ) : (
          <div className={styles.editProfileBtn} onClick={handleEdit}>
            <div className={styles.editLabel}>
              <div className={styles.save}>Edit</div>
            </div>
            <Image
              className={styles.checkIcon}
              width={20}
              height={20}
              sizes="100vw"
              alt="edit"
              src="/edit-white.svg"
            />
          </div>
        )}

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

"use client";

import React, { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-profile.module.css";
import { type FacilityProfileDataType } from "./actions";
import { updateUserProfile, updateUserEmail } from "./actions";
import { createClient } from "../utils/supabase/client";

const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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
    name: capitalizeWords(initialData.name) || placeholders.name,
    email: initialData.email || placeholders.email,
    address: capitalizeWords(initialData.address) || placeholders.address,
    contactNumber: initialData.contactNumber || placeholders.contactNumber,
    category: initialData.category || placeholders.category,
    specificCategory:
      initialData.specificCategory || placeholders.specificCategory,
    tags: initialData.tags || "",
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
  const tagInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [pfpFile, setPfpFile] = useState<File | null>(null);

  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState("");

  useEffect(() => {
    setEditData((prev) => ({ ...prev, tags: tagsArray.join(", ") }));
  }, [tagsArray]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (contactNumber: string) => {
    const phoneRegex = /^\+63\d{3}\s\d{4}\s\d{3}$/;
    return phoneRegex.test(contactNumber);
  };

  const validateTags = (tags: string) => {
    if (!tags.trim()) return true;
    const tagsRegex = /^[a-zA-Z0-9\s]+(,\s*[a-zA-Z0-9\s]+)*$/;
    return tagsRegex.test(tags);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    const initialTags =
      profileData.tags && profileData.tags.length > 0
        ? profileData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [placeholders.tags];
    setTagsArray(initialTags);

    setErrors({
      email: "",
      contactNumber: "",
      name: "",
      address: "",
      tags: "",
    });
  };

  const handleSave = async () => {
    const lastInput = tagInputValue.trim();
    let finalTagsArray = [...tagsArray];
    if (lastInput && !finalTagsArray.includes(lastInput)) {
      finalTagsArray.push(lastInput);
    }

    if (lastInput) {
      setTagsArray(finalTagsArray);
      setTagInputValue("");
    }

    const trimmedData = {
      name: editData.name.trim(),
      address: editData.address.trim(),
      contactNumber: editData.contactNumber.trim(),
      email: editData.email.trim(),
    };

    const newErrors = {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      tags: "",
    };

    if (!trimmedData.name || trimmedData.name === placeholders.name) {
      newErrors.name = "Service facility name cannot be empty.";
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

    if (!newErrors.email && !validateEmail(trimmedData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (
      !newErrors.contactNumber &&
      !validateContactNumber(trimmedData.contactNumber)
    ) {
      newErrors.contactNumber = "Invalid contact number.";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    setIsSaving(true);
    let newPfpUrl: string | undefined = undefined;

    if (pfpFile) {
      const supabase = createClient();
      const filePath = `public/${initialData.email}-avatar`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, pfpFile, { upsert: true });

      if (uploadError) {
        alert("Error uploading picture: " + uploadError.message);
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

    const cleanedTagsArray = finalTagsArray.filter(
      (tag) =>
        tag.trim() && tag.toLowerCase() !== placeholders.tags.toLowerCase()
    );
    const tagsToSave =
      cleanedTagsArray.length > 0 ? cleanedTagsArray.join(", ") : null;

    const payload = {
      business_name: trimmedData.name,
      address: trimmedData.address,
      contact_number: trimmedData.contactNumber,
      tags: tagsToSave,
      ...(newPfpUrl && { picture_url: newPfpUrl }),
    };

    const { error: profileError } = await updateUserProfile(payload);

    if (profileError) {
      alert("Error saving profile: " + profileError);
    } else {
      setProfileData({
        ...editData,
        tags: tagsToSave || "",
        profileImage: newPfpUrl || editData.profileImage,
      });
      setIsEditing(false);
      setPfpFile(null);
    }

    setIsSaving(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ",") {
      e.preventDefault();
      const newTag = tagInputValue.trim();
      if (newTag && !tagsArray.includes(newTag)) {
        setTagsArray([...tagsArray, newTag]);
      }
      setTagInputValue("");
    } else if (e.key === "Backspace" && tagInputValue === "") {
      setTagsArray(tagsArray.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTagsArray(tagsArray.filter((_, index) => index !== indexToRemove));
  };

  const displayTags =
    profileData.tags && profileData.tags.length > 0
      ? profileData.tags.split(",").map((t) => t.trim())
      : [placeholders.tags];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setPfpFile(file);

      const reader = new FileReader();
      reader.onload = (e) =>
        setEditData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG or JPG image file.");
    }
  };

  const triggerFileUpload = () => {
    if (isEditing) fileInputRef.current?.click();
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

        <div className={styles.tags2}>Tags</div>
        <div className={styles.tags}>
          <div
            className={`${styles.contactNumTbx} ${
              errors.tags ? styles.tbxError : ""
            }`}
            // clicking the container focuses the input field
            onClick={() => isEditing && tagInputRef.current?.focus()}
          >
            {isEditing ? (
              // edit
              <div className={styles.tagsInputContainer}>
                {tagsArray.map((tag, index) => (
                  <div key={index} className={styles.tagPill}>
                    {tag}
                    <button
                      onClick={() => removeTag(index)}
                      className={styles.tagRemoveBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  ref={tagInputRef}
                  type="text"
                  className={styles.tagInputField}
                  value={tagInputValue}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tagsArray.length === 0 ? placeholders.tags : ""}
                />
              </div>
            ) : (
              // view
              <div className={styles.tagsContainer}>
                {displayTags.map((tag, index) => (
                  <div key={index} className={styles.tagItem}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.tags && (
            <div className={styles.errorMessage}>{errors.tags}</div>
          )}
        </div>

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

        <div className={styles.specificCategory1}>Specific Category</div>
        <div className={styles.specCategory}>
          <div className={styles.contactNumTbx} />
          <div className={styles.profileDataText}>
            {profileData.specificCategory}
          </div>
        </div>

        <div className={styles.address2}>Address</div>
        <div className={styles.address}>
          <div
            className={`${styles.contactNumTbx} ${
              errors.address ? styles.tbxError : ""
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
                errors.address ? styles.inputError : ""
              }`}
              value={editData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.address}</div>
          )}
          {errors.address && (
            <div className={styles.errorMessage}>{errors.address}</div>
          )}
        </div>

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
              placeholder="+639XX XXXX XXX"
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

        <div className={styles.category2}>Category</div>
        <div className={styles.category}>
          <div className={styles.contactNumTbx} />
          <div className={styles.profileDataText}>{profileData.category}</div>
        </div>

        <div className={styles.serviceFacilityName2}>Service Facility Name</div>
        <div className={styles.name}>
          <div
            className={`${styles.contactNumTbx} ${
              errors.name ? styles.tbxError : ""
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
                errors.name ? styles.inputError : ""
              }`}
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Service Facility Name"
            />
          ) : (
            <div className={styles.profileDataText}>{profileData.name}</div>
          )}
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name}</div>
          )}
        </div>

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

        {isEditing && (
          <div className={styles.saveProfileBtn} onClick={handleSave}>
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
        )}

        {!isEditing && (
          <div className={styles.editProfileBtn} onClick={handleEdit}>
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

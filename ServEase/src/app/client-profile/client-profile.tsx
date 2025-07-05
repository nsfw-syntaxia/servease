"use client";

import React, { useState, useRef } from "react"; // No useEffect needed anymore
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/client-profile.module.css";
import { type ProfileDataType } from "./actions"; // Only the type is needed now

// Helper function to format the text as requested
const capitalizeWords = (str: string): string => {
  if (!str) return ""; // Handle null or empty strings gracefully
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// The component now accepts the `initialData` prop
const ProfileClient: NextPage<{ initialData: ProfileDataType }> = ({
  initialData,
}) => {
  // The state is now initialized directly from the prop, with formatting applied.
  const [profileData, setProfileData] = useState({
    // Apply formatting and provide fallbacks
    name: capitalizeWords(initialData.name) || "Name",
    email: initialData.email || "Email Address",

    // --- SPECIAL HANDLING FOR ADDRESS ---
    // As requested, if the address from the database is empty, show the placeholder.
    address: capitalizeWords(initialData.address) || "Address",

    contactNumber: initialData.contactNumber || "Contact Number",
    gender: capitalizeWords(initialData.gender) || "Gender",
    birthdate: initialData.birthdate || "Birthdate",
    profileImage: initialData.profileImage || "/avatar.svg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
    name: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // The useEffect for fetching data is now REMOVED.
  // This is why the flicker is gone.

  // ----- NO LOGIC OR UI (JSX) CHANGES BELOW THIS LINE -----

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (contactNumber: string) => {
    // This new regex matches the format +63XXX XXXX XXX (e.g., +63917 1234 567)
    const phoneRegex = /^\+63\d{3}\s\d{4}\s\d{3}$/;
    return phoneRegex.test(contactNumber);
  };

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setErrors({ email: "", contactNumber: "", name: "" });
  };

  const handleSave = () => {
    const newErrors = { email: "", contactNumber: "", name: "" };

    if (!validateEmail(editData.email))
      newErrors.email = "Invalid email address.";
    if (!validateContactNumber(editData.contactNumber))
      newErrors.contactNumber = "Invalid contact number.";
    if (!validateName(editData.name))
      newErrors.name = "Name must contain only letters.";

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.contactNumber && !newErrors.name) {
      setProfileData({ ...editData });
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    if (field === "email" && errors.email)
      setErrors((prev) => ({ ...prev, email: "" }));
    if (field === "contactNumber" && errors.contactNumber)
      setErrors((prev) => ({ ...prev, contactNumber: "" }));
    if (field === "name" && errors.name)
      setErrors((prev) => ({ ...prev, name: "" }));
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
    if (isEditing) fileInputRef.current?.click();
  };

  return (
    <div className={styles.profileClient}>
      <div className={styles.background} />
      <div className={styles.content}>
        <div className={styles.pfpContainer} />
        <Image
          className={styles.pfpCoverIcon}
          width={1032}
          height={148}
          sizes="100vw"
          alt=""
          src="/client-cover.png"
        />
        <div className={styles.profileInfo}>
          <div className={styles.clientemailcom}>{profileData.email}</div>
          <div className={styles.clientName}>{profileData.name}</div>
        </div>
        <div className={styles.emailAdd}>
          <div
            className={`${styles.emailAddTbx} ${
              errors.email ? styles.tbxError : ""
            }`}
          />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt=""
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="email"
              className={`${styles.emailAddressInput} ${
                errors.email ? styles.inputError : ""
              }`}
              value={editData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@email.com"
            />
          ) : (
            <div className={styles.emailAddress}>{profileData.email}</div>
          )}
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}
        </div>
        <div className={styles.emailAddress1}>Email Address</div>
        <div className={styles.birthdate}>
          <div className={styles.emailAddTbx} />
          <div className={styles.emailAddress}>{profileData.birthdate}</div>
        </div>
        <div className={styles.dateOfBirth}>Date of Birth</div>
        <div className={styles.address}>
          <div className={styles.emailAddTbx} />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt=""
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={styles.emailAddressInput}
              value={editData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
            />
          ) : (
            <div className={styles.emailAddress}>{profileData.address}</div>
          )}
        </div>
        <div className={styles.address2}>Address</div>
        <div className={styles.contactNum}>
          <div
            className={`${styles.emailAddTbx} ${
              errors.contactNumber ? styles.tbxError : ""
            }`}
          />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt=""
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={`${styles.emailAddressInput} ${
                errors.contactNumber ? styles.inputError : ""
              }`}
              value={editData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              placeholder="+63 9XX XXXX XXX"
            />
          ) : (
            <div className={styles.emailAddress}>
              {profileData.contactNumber}
            </div>
          )}
          {errors.contactNumber && (
            <div className={styles.errorMessage}>{errors.contactNumber}</div>
          )}
        </div>
        <div className={styles.contactNumber}>Contact Number</div>
        <div className={styles.gender}>
          <div className={styles.emailAddTbx} />
          <div className={styles.emailAddress}>{profileData.gender}</div>
        </div>
        <div className={styles.gender2}>Gender</div>
        <div className={styles.name}>
          <div
            className={`${styles.emailAddTbx} ${
              errors.name ? styles.tbxError : ""
            }`}
          />
          {isEditing && (
            <Image
              className={styles.icon}
              width={18}
              height={18}
              sizes="100vw"
              alt=""
              src="/edit-gray.svg"
            />
          )}
          {isEditing ? (
            <input
              type="text"
              className={`${styles.emailAddressInput} ${
                errors.name ? styles.inputError : ""
              }`}
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Name"
            />
          ) : (
            <div className={styles.emailAddress}>{profileData.name}</div>
          )}
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name}</div>
          )}
        </div>
        <div className={styles.name2}>Name</div>
        <div className={styles.pfp}>
          <Image
            className={styles.avatarIcon}
            width={70.5}
            height={64.1}
            sizes="100vw"
            alt=""
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

        {isEditing && (
          <div className={styles.circleEditPfp} onClick={triggerFileUpload} />
        )}
        {isEditing && (
          <Image
            className={styles.editPfpIcon}
            width={19}
            height={19}
            sizes="100vw"
            alt=""
            src="/edit-profile.svg"
            onClick={triggerFileUpload}
          />
        )}

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
      </div>
      <b className={styles.profile}>Profile</b>
    </div>
  );
};

export default ProfileClient;

/*

change password

const ChangePassword: NextPage = () => {
  return (
    <div className={styles.changePassword}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.xWrapper}>
            <Image
              className={styles.xIcon}
              width={30}
              height={30}
              sizes="100vw"
              alt=""
              src="x.svg"
            />
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.changeYourPasswordWrapper}>
              <b className={styles.changeYourPassword}>Change your password</b>
            </div>
            <div className={styles.enterYourCurrent}>
              Enter your current password and new password.
            </div>
          </div>
        </div>
        <Image
          className={styles.frameChild}
          width={471}
          height={1}
          sizes="100vw"
          alt=""
          src="Line 261.svg"
        />
        <div className={styles.frameDiv}>
          <div className={styles.frameItem} />
          <div className={styles.frameParent1}>
            <div className={styles.currentPasswordWrapper}>
              <div className={styles.changeYourPassword}>Current Password</div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.changeYourPassword}>New Password</div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.currentPasswordWrapper}>
              <div className={styles.changeYourPassword}>
                Confirm New Password
              </div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.button}>
            <div className={styles.buttonInner}>
              <div className={styles.buttonInner}>
                <div className={styles.updatePassword}>Update Password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

*/

/*

delete account

const DeleteAccount: NextPage = () => {
  return (
    <div className={styles.deleteAccount}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.xWrapper}>
            <Image
              className={styles.xIcon}
              width={30}
              height={30}
              sizes="100vw"
              alt=""
              src="x.svg"
            />
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.deleteAccountWrapper}>
              <b className={styles.password}>Delete Account</b>
            </div>
            <div className={styles.areYouSure}>
              Are you sure you want to delete your account? This will
              immediately log you out of your account and you will not be able
              to log in again.
            </div>
          </div>
        </div>
        <Image
          className={styles.frameChild}
          width={471}
          height={1}
          sizes="100vw"
          alt=""
          src="Line 261.svg"
        />
        <div className={styles.frameDiv}>
          <div className={styles.frameItem} />
          <div className={styles.frameParent1}>
            <div className={styles.passwordWrapper}>
              <div className={styles.password}>Password</div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.groupParent}>
          <div className={styles.groupWrapper}>
            <div className={styles.groupWrapper}>
              <div className={styles.button}>
                <div className={styles.buttonInner}>
                  <div className={styles.cancelWrapper}>
                    <div className={styles.cancel}>Cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.groupContainer}>
            <div className={styles.buttonContainer}>
              <div className={styles.button1}>
                <div className={styles.buttonChild}>
                  <div className={styles.cancelWrapper}>
                    <div className={styles.cancel}>Delete Account</div>
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

export default DeleteAccount;

*/

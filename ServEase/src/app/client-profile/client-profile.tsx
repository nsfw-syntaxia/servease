"use client";

import React, { useState, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/client-profile.module.css";
import { type ProfileDataType } from "./actions";
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

const ProfileClient: NextPage<{ initialData: ProfileDataType }> = ({
  initialData,
}) => {
  const placeholders = {
    name: "Name",
    address: "Address",
    email: "email@email.com",
    contactNumber: "+639XX XXXX XXX",
    gender: "Gender",
    birthdate: "Birthdate",
  };

  const [profileData, setProfileData] = useState({
    name: capitalizeWords(initialData.name),
    email: initialData.email,
    address: capitalizeWords(initialData.address),
    contactNumber: initialData.contactNumber,
    gender: capitalizeWords(initialData.gender),
    birthdate: initialData.birthdate,
    profileImage: initialData.profileImage,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
    name: "",
    address: "",
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

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setErrors({ email: "", contactNumber: "", name: "", address: "" });
  };

  const handleSave = async () => {
    const trimmedData = {
      name: editData.name.trim(),
      address: editData.address.trim(),
      contactNumber: editData.contactNumber.trim(),
      email: editData.email.trim(),
    };

    // validation block
    const newErrors = {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
    };

    // check for empty or placeholder values
    if (!trimmedData.name || trimmedData.name === placeholders.name) {
      newErrors.name = "Name cannot be empty.";
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
    if (!newErrors.name && !validateName(trimmedData.name)) {
      newErrors.name = "Name must contain only letters.";
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

    // update the errors state
    setErrors(newErrors);

    // ff any error message exists, stop the save process
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
      setPfpFile(file);

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
          src="/profile-cover.png"
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
          <div
            className={`${styles.emailAddTbx} ${
              errors.address ? styles.tbxError : ""
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
                errors.address ? styles.inputError : ""
              }`}
              value={editData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
            />
          ) : (
            <div className={styles.emailAddress}>{profileData.address}</div>
          )}
          {errors.address && (
            <div className={styles.errorMessage}>{errors.address}</div>
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
              placeholder="+639XX XXXX XXX"
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

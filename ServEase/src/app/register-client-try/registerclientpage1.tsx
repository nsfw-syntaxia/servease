"use client";

import React, { useState, useEffect, useTransition } from "react"; // Added useEffect
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/register-client-1.module.css";
import { useSearchParams } from "next/navigation"; // Import for reading URL errors

// 1. Import your server action
import { signup } from "./actions1"; // Make sure this path is correct

type Props = {
  onNext: () => void;
};

// Renamed to avoid conflict with the browser's built-in FormData
interface FormDataState {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function ClientSignup1({ onNext }: Props) {
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState<FormDataState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Hook to read error messages from the URL
  const searchParams = useSearchParams();

  // useEffect to display server errors passed in the URL
  useEffect(() => {
    const errorMessage = searchParams.get("message");
    if (errorMessage) {
      setErrors((prev) => ({
        ...prev,
        general: decodeURIComponent(errorMessage),
      }));
    }
  }, [searchParams]);

  // --- All your existing validation and handler functions are perfect and remain unchanged ---
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleInputChange = (
    field: keyof FormDataState,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
        general: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleBackClick = (): void => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: false }));
    }
  };

  const togglePasswordVisibility = (
    field: "password" | "confirmPassword"
  ): void => {
    if (field === "password") setShowPassword(!showPassword);
    else if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };
  // --- End of unchanged functions ---

  // =====================================================================
  // === UPDATED SUBMISSION LOGIC ===
  // =====================================================================
  const handleSubmit = async (): Promise<void> => {
    // 1. Run your existing client-side validation.
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    // 2. Prepare the data for the server action.
    const actionFormData = new FormData();
    actionFormData.append("email", formData.email);
    actionFormData.append("password", formData.password);

    try {
      // 3. Call the server action.
      // The server action will handle all logic, including redirection on success or failure.
      // You don't need to handle success here because the page will be redirected away.

      startTransition(async () => {
        await signup(actionFormData);
      });
    } catch (error) {
      // This 'catch' block will only run if there's a network failure or an
      // unexpected error that prevents the server action from even running.
      console.error("Form submission failed:", error);
      setErrors({
        general:
          "Could not connect to the server. Please check your internet connection and try again.",
      });
      setIsLoading(false);
    }
    // We don't need a `finally` block to set isLoading to false, because on success,
    // the page will navigate away. It only needs to be set in the catch block.
  };

  // =====================================================================
  // === YOUR UI REMAINS 100% UNCHANGED ===
  // =====================================================================
  return (
    <div className={styles.frameGroup}>
      <div className={styles.frameParent1}>
        <div className={styles.numberParent}>
          <div className={styles.setUpYour}>
            Set up your login credential to keep your account secure. We'll send
            a one-time link to confirm it's really you.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>

        {/* Error Display */}
        {errors.general && (
          <div
            style={{
              color: "#dc2626",
              backgroundColor: "#fef2f2",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid #fecaca",
              fontSize: "14px",
            }}
          >
            {errors.general}
          </div>
        )}

        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*Email address</div>
          </div>
          <div className={styles.textField1} style={{ position: "relative" }}>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                padding: "12px",
                fontSize: "14px",
                borderRadius: "4px",
                backgroundColor: errors.email ? "#fef2f2" : "transparent",
              }}
            />
          </div>
          {errors.email && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {errors.email}
            </div>
          )}
        </div>
        <div className={styles.textField2}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*Password</div>
          </div>
          <div className={styles.textField1} style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a strong password"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                padding: "12px",
                paddingRight: "40px",
                fontSize: "14px",
                borderRadius: "4px",
                backgroundColor: errors.password ? "#fef2f2" : "transparent",
              }}
            />
            <Image
              className={styles.hideIcon}
              width={30}
              height={25}
              sizes="100vw"
              alt={showPassword ? "Hide password" : "Show password"}
              src={showPassword ? "/show.svg" : "/hide.svg"}
              onClick={() => togglePasswordVisibility("password")}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                zIndex: 1,
                color: "#666",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {errors.password}
            </div>
          )}
        </div>
        <Image
          className={styles.icon}
          width={30}
          height={25}
          sizes="100vw"
          alt=""
          src="/hide.svg"
        />
        <Image
          className={styles.icon1}
          width={30}
          height={25}
          sizes="100vw"
          alt=""
          src="Icon.svg"
        />
        <div className={styles.password}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Password</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              password ? styles.tbxFilled : ""
            } ${fieldErrors.password ? styles.errorInput : ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handlePasswordChange}
              className={styles.passwordInput}
              placeholder="Enter password"
            />
            <Image
              className={styles.hideIcon}
              width={30}
              height={25}
              sizes="100vw"
              alt={showPassword ? "Hide password" : "Show password"}
              src={showPassword ? "/show.svg" : "/hide.svg"}
              /*onClick={togglePasswordVisibility}*/
              onClick={() => togglePasswordVisibility("password")}
            />
          </div>
        </div>
        <div className={styles.textField4}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*Confirm Password</div>
          </div>
          <div className={styles.textField1} style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm your password"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                padding: "12px",
                paddingRight: "40px",
                fontSize: "14px",
                borderRadius: "4px",
                backgroundColor: errors.confirmPassword
                  ? "#fef2f2"
                  : "transparent",
              }}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                zIndex: 1,
                color: "#666",
              }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {errors.confirmPassword}
            </div>
          )}
        </div>
      </div>
      <div className={styles.button2}>
        <div className={styles.signUpWrapper}>
          <div
            className={styles.webDesigns}
            onClick={handleSubmit}
            style={{
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </div>
        </div>
      </div>
    </div>
  );
}

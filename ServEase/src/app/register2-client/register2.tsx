"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import styles from "../styles/RegisterPage2.module.css";

const ClientSignup2: NextPage = () => {
  const [phone, setPhone] = useState("");
  const [countryCode] = useState("+63");
  const [codeSent, setCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const isPhoneValid = phone.match(/^\d{10}$/);
  const isOtpValid = otp.every((digit) => digit.match(/^\d$/));
  const isNextEnabled = codeSent && isOtpValid;

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleSendCode = async () => {
    setErrorMessage("");
    try {
      if (!isPhoneValid) throw new Error("Enter a valid 10-digit phone number.");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCodeSent(true);
      setTimer(60);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (codeSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [codeSent, timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, "");
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (!isOtpValid) throw new Error("Please enter a valid 4-digit code");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Verification successful!");
    } catch (error: any) {
      setErrorMessage(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.clientSignup2}>
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
      </div>

      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>Sign up and get connected with trusted professionals.</div>
          </div>

          {/* Back Button */}
          <div 
            className={styles.backContainer} 
            onClick={handleBack}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              margin: '20px 0'
            }}
          >
            <Image 
              className={styles.outlineArrowsArrowLeft} 
              width={24} 
              height={24} 
              sizes="100vw" 
              alt="Back" 
              src="Arrow Left.svg" 
            />
            <div className={styles.back} style={{ marginLeft: '8px' }}>Back</div>
          </div>

          <div className={styles.stepper}>
            {["Profile", "Contacts", "Login"].map((label, i) => (
              <div key={i} className={styles.groupParent}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>{i + 1}</div>
                </div>
                <div className={styles.profile}>{label}</div>
                {i < 2 && <div className={styles.stepperChild} />}
              </div>
            ))}
          </div>

          <div className={styles.frameParent}>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>1</div>
                    </div>
                    <div className={styles.contactInformation}>Profile</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.frameGroup}>
              <div className={styles.frameParent1}>
                <div className={styles.numberParent}>
                  <div className={styles.number1}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>2</div>
                    </div>
                    <div className={styles.contactInformation}>Contact Information</div>
                  </div>
                  <div className={styles.provideYourPhone}>
                    Provide your phone number so we can confirm your bookings and verify your account.
                  </div>
                  <div className={styles.allFieldsRequired}>*All fields required unless noted.</div>
                </div>

                <div className={styles.cardInput}>
                  <div className={styles.labelParent}>
                    <div className={styles.label}>*Phone number</div>
                  </div>
                  <div className={styles.inputButton}>
                    <div className={styles.input}>
                      <div className={styles.select}>
                        <Image 
                          className={styles.phPhilippinesIcon} 
                          width={33} 
                          height={24} 
                          sizes="100vw" 
                          alt="" 
                          src="ph Philippines.svg" 
                        />
                      </div>
                      <div className={styles.webDesigns}>({countryCode})</div>
                      <input
                        type="text"
                        placeholder="Enter 10-digit number"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        style={{ 
                          flex: 1, 
                          border: "none", 
                          outline: "none", 
                          background: "transparent", 
                          fontSize: "16px" 
                        }}
                      />
                    </div>
                    <button
                      className={styles.button2}
                      onClick={handleSendCode}
                      disabled={!isPhoneValid || loading || timer > 0}
                      style={{ 
                        backgroundColor: isPhoneValid ? "#a68465" : "#ccc", 
                        cursor: isPhoneValid ? "pointer" : "not-allowed" 
                      }}
                    >
                      {loading ? "Sending..." : "Send Code"}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className={styles.errorMessage}>
                    {errorMessage}
                  </div>
                )}

                {codeSent && (
                  <>
                    <Image 
                      className={styles.frameChild} 
                      width={611} 
                      height={1.5} 
                      sizes="100vw" 
                      alt="" 
                      src="Line 15.svg" 
                    />

                    <div className={styles.form}>
                      <div className={styles.resendCode}>
                        <div className={styles.time}>
                          <Image 
                            className={styles.outlineTimeClockCircle} 
                            width={20} 
                            height={20} 
                            sizes="100vw" 
                            alt="" 
                            src="Outline / Time / Clock Circle.svg" 
                          />
                          <div className={styles.div7}>00 : {timer.toString().padStart(2, "0")}</div>
                        </div>
                        <div
                          className={styles.resendCode1}
                          style={{ 
                            opacity: timer === 0 ? 1 : 0.4, 
                            cursor: timer === 0 ? "pointer" : "not-allowed" 
                          }}
                          onClick={() => timer === 0 && handleSendCode()}
                        >
                          Resend Code
                        </div>
                      </div>

                      <div className={styles.inputs}>
                        <div className={styles.list}>
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              ref={(el) => (otpRefs.current[i] = el!)}
                              type="text"
                              value={digit}
                              onChange={(e) => handleOtpChange(e.target.value, i)}
                              maxLength={1}
                              style={{
                                width: "40px",
                                height: "60px",
                                fontSize: "24px",
                                textAlign: "center",
                                borderBottom: "3px solid #a68465",
                                background: "transparent",
                                outline: "none"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.button3}>
                <button
                  className={styles.signUpWrapper}
                  onClick={isNextEnabled ? handleSubmit : undefined}
                  disabled={!isNextEnabled}
                  style={{
                    backgroundColor: isNextEnabled ? "#a68465" : "#ccc",
                    color: "#fff",
                    border: "none",
                    
                    fontSize: "22px",
                    cursor: isNextEnabled ? "pointer" : "not-allowed"
                  }}
                >
                  {loading ? "Verifying..." : "Next"}
                </button>
              </div>
            </div>

            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
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

export default ClientSignup2;
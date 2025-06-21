"use client"

import React, { useState } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import styles from "../styles/RegisterPage3.module.css";

interface FormData {
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

const ClientSignup3: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    } catch (error) {
      console.error('Email validation error:', error);
      return false;
    }
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    try {
      return password.length >= 8 && 
             /[A-Z]/.test(password) && 
             /[a-z]/.test(password) && 
             /\d/.test(password);
    } catch (error) {
      console.error('Password validation error:', error);
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string): void => {
    try {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Clear errors when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    } catch (error) {
      console.error('Input change error:', error);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    try {
      const newErrors: FormErrors = {};

      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error('Form validation error:', error);
      setErrors({ general: 'Validation error occurred. Please try again.' });
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    try {
      if (!validateForm()) return;
      
      setIsLoading(true);
      
      // Simulate API call with error handling
      await new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          // Simulate random API errors for demonstration
          const shouldFail = Math.random() < 0.1; // 10% chance of failure
          if (shouldFail) {
            reject(new Error('Server temporarily unavailable'));
          } else {
            resolve('Success');
          }
        }, 2000);
      });
      
      console.log('Form submitted successfully:', formData);
      alert('Account created successfully! Please check your email for verification.');
      
      // Reset form after successful submission
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation
  const handleBackClick = (): void => {
    try {
      // Handle navigation back
      console.log('Navigating back...');
      // Here you would typically use router.back() or similar
      if (typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back();
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword'): void => {
    try {
      if (field === 'password') {
        setShowPassword(!showPassword);
      } else if (field === 'confirmPassword') {
        setShowConfirmPassword(!showConfirmPassword);
      }
    } catch (error) {
      console.error('Toggle visibility error:', error);
    }
  };

  return (
    <div className={styles.clientSignup3}>
      <div className={styles.headerNav}>
        <Image className={styles.serveaseLogoAlbumCover3} width={40} height={40} sizes="100vw" alt="" src="/servease logo.svg" />
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
          onClick={handleBackClick}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.back} onClick={handleBackClick} style={{ cursor: 'pointer' }}>Back</div>
      </div>
      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>Sign up and get connected with trusted professionals.</div>
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
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>2</div>
                    </div>
                    <div className={styles.contactInformation}>Contact Information</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameGroup}>
              <div className={styles.frameParent1}>
                <div className={styles.numberParent}>
                  <div className={styles.number2}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>3</div>
                    </div>
                    <div className={styles.contactInformation}>Login</div>
                  </div>
                  <div className={styles.setUpYour}>Set up your login credential to keep your account secure. We'll send a one-time link to confirm it's really you.</div>
                  <div className={styles.allFieldsRequired}>*All fields required unless noted.</div>
                </div>
                
                {/* Error Display */}
                {errors.general && (
                  <div style={{
                    color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    border: '1px solid #fecaca',
                    fontSize: '14px'
                  }}>
                    {errors.general}
                  </div>
                )}
                
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Email address</div>
                  </div>
                  <div className={styles.textField1} style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none',
                        padding: '12px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        backgroundColor: errors.email ? '#fef2f2' : 'transparent'
                      }}
                    />
                  </div>
                  {errors.email && (
                    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className={styles.textField2}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Password</div>
                  </div>
                  <div className={styles.textField1} style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none',
                        padding: '12px',
                        paddingRight: '40px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        backgroundColor: errors.password ? '#fef2f2' : 'transparent'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        zIndex: 1,
                        color: '#666'
                      }}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && (
                    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                      {errors.password}
                    </div>
                  )}
                </div>
                <Image className={styles.icon} width={30} height={25} sizes="100vw" alt="" src="Icon.svg" />
                <Image className={styles.icon1} width={30} height={25} sizes="100vw" alt="" src="Icon.svg" />
                <div className={styles.textField4}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>*Confirm Password</div>
                  </div>
                  <div className={styles.textField1} style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none',
                        padding: '12px',
                        paddingRight: '40px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        backgroundColor: errors.confirmPassword ? '#fef2f2' : 'transparent'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        zIndex: 1,
                        color: '#666'
                      }}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
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
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1
                    }}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
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

export default ClientSignup3;
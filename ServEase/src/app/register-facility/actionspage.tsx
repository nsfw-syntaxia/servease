'use server';

import { redirect } from 'next/navigation';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/server';

interface facilityProfileData {
  user_id: string;
  owner_name: string;
  facility_name: string;
  location: string;
  category: string;
  specific_category: string;
  working_days: string[]; 
  start_time: string;    
  end_time: string;      
}

export async function loginCredentials(formData: FormData): Promise<void> {
  console.log("--- SIGNUP SERVER ACTION RUNNING ---");
  
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return redirect('/your-signup-page-url?message=Email and password are required.');
  }
  if (password.length < 8) {
    return redirect('/your-signup-page-url?message=Password must be at least 8 characters.');
  }

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error('--- SUPABASE SIGNUP ERROR ---', error.message);
    return redirect(`/your-signup-page-url?message=Could not create account. ${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    console.log('User created. User ID: ', data.user.id);
    const { data: { user: sessionUser }} = await supabase.auth.getUser();
    console.log("Session user id: ", sessionUser?.id);
  }

  console.log("SUCCESS! User account created. Redirecting to profile setup.");
}


function convertTo24HourFormat(time12h: string): string {
  if (!time12h) return '';

  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = modifier === 'AM' ? '00' : '12';
  } else if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }

  // Ensure hours are two digits (e.g., '09')
  const formattedHours = hours.padStart(2, '0');

  return `${formattedHours}:${minutes}:00`;
}

export async function facilityProfile(formData: FormData): Promise<void> {
  console.log("--- PROFILE SERVER ACTION RUNNING ---");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated. Cannot create profile.");
    const { data: { user: sessionUser } } = await supabase.auth.getUser();
    console.error("Session user: ", sessionUser?.id);
  }
  
  console.log("Authenticated user found:", user.id);

  const ownerName = formData.get('owner_name') as string;
  const facilityName = formData.get('facility_name') as string;
  const fac_location = formData.get('facility_location') as string;
  const selectedCategory = formData.get('category') as string;
  const specificCategory = formData.get('specific_category') as string;
  const workingDaysJSON = formData.get('working_days') as string; 
  const startTime12h = formData.get('start_time') as string;     
  const endTime12h = formData.get('end_time') as string;        

  if (!ownerName?.trim() || !facilityName?.trim() || !fac_location.trim() || 
      !selectedCategory.trim() || !specificCategory.trim() || !workingDaysJSON ||
      !startTime12h || !endTime12h) {
    console.log("VALIDATION FAILED: Required profile fields missing.");
    return redirect('/register-client?error=missing_fields');
  }

  const parsedWorkingDays = JSON.parse(workingDaysJSON);

  const formattedStartTime = convertTo24HourFormat(startTime12h);
  const formattedEndTime = convertTo24HourFormat(endTime12h);

  const profileData: facilityProfileData = {
    user_id: user.id,
    owner_name: ownerName.trim(),
    facility_name: facilityName.trim(),
    location: fac_location,
    category: selectedCategory,
    specific_category: specificCategory,
    working_days: parsedWorkingDays, 
    start_time: formattedStartTime, 
    end_time: formattedEndTime      
  };
  
  console.log("Data to insert:", profileData);

  const { error } = await supabase
    .from('facility_initial_profile')
    .insert(profileData);

  if (error) {
    console.error('--- SUPABASE PROFILE INSERT ERROR ---', error);
    return redirect(`/register-facility?error=database_error&message=${encodeURIComponent(error.message)}`);
  }

  console.log("SUCCESS! Profile created for user:", user.id);
}
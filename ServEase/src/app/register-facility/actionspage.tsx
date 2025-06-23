'use server';

import { redirect } from 'next/navigation';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/server';

interface facilityProfileData {
  user_id: string;
  owner_name: string;
  facility_name: string;
  facility_location: string;
  category?: string;
  specific_category?: string;
  start_time?: string;
  end_time?: string;
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

  const formObject = Object.fromEntries(formData.entries());
  
  const ownerName = formObject.owner_name as string;
  const facilityName = formObject.facility_name as string;
  const location = formObject.facility_location as string;
  const selectedCategory = formObject.category as string;
  const specificCategory = formObject.specific_category as string;
  const startTime = formObject.start_time as string;
  const endTime = formObject.end_time as string;

  if (!ownerName?.trim() || !facilityName?.trim() || !location.trim() || !selectedCategory.trim() || !specificCategory.trim() ||
      !startTime || !endTime) {
    console.log("VALIDATION FAILED: Required profile fields missing.");
    return redirect('/register-client?error=missing_fields');
  }

  const profileData: facilityProfileData = {
    user_id: user.id,
    owner_name: ownerName.trim(),
    facility_name: facilityName.trim(),
    facility_location: location,
    category: selectedCategory,
    specific_category: specificCategory,
    start_time: startTime,
    end_time: endTime
  };
  
  console.log("Data to insert:", profileData);
  

  const { error } = await supabase
    .from('facility_initial_profile')
    .insert(profileData);

  if (error) {
    console.error('--- SUPABASE PROFILE INSERT ERROR ---', error);
    return redirect(`/register-client?error=database_error&code=${error.code}`);
  }

  console.log("SUCCESS! Profile created for user:", user.id);
}
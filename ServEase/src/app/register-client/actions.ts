'use server';

import { createClient } from '../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function profile(formData: FormData) {
  console.log("--- PROFILE SERVER ACTION RUNNING ---");

  const supabase = createClient();

  // Extract all data from the form
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const middleName = formData.get('middle_name') as string | null;
  const gender = formData.get('gender') as string | null;
  const birthMonth = formData.get('birth_month') as string;
  const birthDay = formData.get('birth_day') as string;
  const birthYear = formData.get('birth_year') as string;

  const rawFormData = Object.fromEntries(formData.entries());
  console.log("Received form data:", rawFormData);

  // --- Server-side validation (always do this, never trust the client) ---
  if (!firstName || !lastName || !birthDay || !birthMonth || !birthYear) {
      console.log("VALIDATION FAILED: A required field is missing.");
      // Redirect back to the form with a specific error message
      return redirect('/register-client?message=All required fields must be filled.');
  }

  console.log("Validation passed. Preparing to save to database...");
  
  // --- Prepare the data for insertion ---
  const monthMap: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
    'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  // Check if month is valid before creating the date
  const monthNumber = monthMap[birthMonth];
  if (!monthNumber) {
    console.error("Invalid month value received:", birthMonth);
    return redirect('/register-client?message=Invalid month selected. Please try again.');
  }

  // Format date to 'YYYY-MM-DD' which is standard for SQL
  const birthDate = `${birthYear}-${monthNumber}-${String(birthDay).padStart(2, '0')}`;
  
  const profileDataToInsert: {
      first_name: string;
      last_name: string;
      birth_date: string;
      middle_name?: string;
      gender?: string;
  } = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
  };

  // Only add optional fields if they exist
  if (middleName) {
      profileDataToInsert.middle_name = middleName;
  }
  if (gender) {
      profileDataToInsert.gender = gender;
  }
  
  console.log("Attempting to insert into 'profiles' table:", profileDataToInsert);

  const { data: newProfile, error } = await supabase
    .from('client_initial_profile')
    .insert(profileDataToInsert)
    .select('id') // Important to get the ID for the next step
    .single();

  // --- Handle potential database errors ---
  if (error) {
    console.error('DATABASE ERROR:', error.message);
    return redirect(`/register-client?message=Database error. Could not save profile.`);
  }

  if (!newProfile) {
    console.error('DATABASE LOGIC ERROR: Profile was not created, but no error was thrown.');
    return redirect(`/register-client?message=An unknown error occurred. Please try again.`);
  }

  // --- On success, redirect to the next step ---
  console.log("SUCCESS! Profile created with ID:", newProfile.id);
  //redirect(`/register2-client?profileId=${newProfile.id}`); // Redirect to the next page
  redirect(`/register2-client`); 
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;

  const supabase = createClient();

  if (password.length < 6) {
    return redirect('/register?message=Password must be at least 6 characters long.');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.error('Sign Up Error:', error);
    
    return redirect('/register?message=Could not create account. User may already exist.');
  }

  return redirect('/confirm-email');
}
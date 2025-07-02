'use server'

import { createClient } from '../utils/supabase/server'; 
import { redirect } from 'next/navigation';

export async function addContactAndCompleteProfile(formData: FormData): Promise<{ error?: string }> {
  console.log("--- FINAL STEP: ADD CONTACT & CREATE FINAL PROFILE ---");

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated. Cannot complete profile.");
    return { error: "User not authenticated. Please log in and try again." };
  }

  console.log("Authenticated user found:", user.id);

  const contactNumber = formData.get('contact') as string;

  if (!contactNumber?.trim()) {
    const errorMsg = "Validation FAILED: Contact number is missing.";
    console.error(errorMsg);
    return { error: errorMsg };
  }

  console.log(`Fetching initial profile for user_id: ${user.id}`);
  const { data: initialProfile, error: fetchError } = await supabase
    .from('client_initial_profile') 
    .select('first_name, last_name, middle_name, birth_date, gender') 
    .eq('user_id', user.id) 
    .single(); 

  if (fetchError || !initialProfile) {
    const errorMsg = `Could not find initial profile for user or fetch error: ${fetchError?.message}`;
    console.error(errorMsg);
    return { error: "Could not find your profile data from the previous step. Please start over." };
  }

  console.log("Found initial profile data:", initialProfile);

  const fullName = [initialProfile.first_name, initialProfile.middle_name, initialProfile.last_name].filter(Boolean).join(' ').trim();

  const finalProfileData = {
    id: user.id, 
    role: 'client' as const, 
    full_name: fullName,
    birth_date: initialProfile.birth_date,
    gender: initialProfile.gender,
    contact_number: contactNumber.trim(),
    picture_url: 'avatar.svg' 
  };
  
  console.log("Data to insert into FINAL 'profiles' table:", finalProfileData);

  // 3. Insert into the 'profiles' table
  const { error: insertError } = await supabase
    .from('profiles') 
    .insert(finalProfileData);

  if (insertError) {
    const errorMsg = `--- SUPABASE FINAL PROFILES INSERT ERROR ---: ${insertError.message}`;
    console.error(errorMsg);
    // If this fails, do NOT delete the temporary data, so the user can maybe try again.
    return { error: "There was a database error creating your final profile." };
  }

  console.log("Successfully inserted data into 'profiles' table.");

  // 4. Clean up: Delete the record from the temporary table
  const { error: deleteError } = await supabase
    .from('client_initial_profile')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    // This is not a critical failure, but it's good to log it.
    // The user's main profile was created, but we failed to clean up the temp data.
    console.error(`--- SUPABASE TEMP PROFILE DELETE ERROR ---: ${deleteError.message}`);
  } else {
    console.log(`Successfully deleted temporary profile for user_id: ${user.id}`);
  }

  console.log("SUCCESS! User registration fully completed for:", user.id);
  
}
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

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error('--- SUPABASE SIGNUP ERROR ---', error.message);
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
  }

  console.log("SUCCESS! Profile created for user:", user.id);
}

type FormResult = {
  success?: string;
  error?: string;
};

export async function uploadDocument(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in to upload documents.' };
  }

  const file = formData.get('document') as File;
  const documentType = formData.get('documentType') as string;

  if (!file || file.size === 0) {
    return { error: 'No file was provided.' };
  }
  if (!documentType) {
    return { error: 'Document type is missing.' };
  }
  

  const fileExtension = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from('documents') 
    .upload(filePath, file);

  if (storageError) {
    console.error('Storage Error:', storageError);
    return { error: `Failed to upload file: ${storageError.message}` };
  }

  const { error: dbError } = await supabase
    .from('facility_documents')
    .insert({
      user_id: user.id,
      document_type: documentType,
      file_path: filePath,
      file_name: file.name, 
    });

  if (dbError) {
    console.error('Database Error:', dbError);
    await supabase.storage.from('documents').remove([filePath]);
    return { error: `Failed to save document record: ${dbError.message}` };
  }
  
  return { success: `Successfully uploaded ${file.name}!` };
}

export async function completeProviderProfile(formData: FormData): Promise<{ error?: string }> {
  console.log("--- FINAL STEP: COMPLETE PROVIDER PROFILE ---");

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const errorMsg = "User not authenticated. Please log in and try again.";
    console.error(errorMsg);
    return { error: errorMsg };
  }
  console.log("Authenticated provider found:", user.id);

  const contactNumber = formData.get('contact_number') as string;

  if (!contactNumber?.trim()) {
    const errorMsg = "Validation FAILED: Contact number is missing.";
    console.error(errorMsg);
    return { error: errorMsg };
  }

  console.log(`Fetching initial provider profile for user_id: ${user.id}`);
  const { data: initialProfile, error: fetchError } = await supabase
    .from('facility_initial_profile') 
    .select('facility_name, location, owner_name') 
    .eq('user_id', user.id) 
    .single(); 

  if (fetchError || !initialProfile) {
    const errorMsg = `Could not find initial provider profile: ${fetchError?.message}`;
    console.error(errorMsg);
    return { error: "Could not find your profile data from the previous step. Please start over." };
  }
  console.log("Found initial provider profile data:", initialProfile);

  const finalProfileData = {
    id: user.id,                      
    role: 'provider' as const,      
    full_name: initialProfile.owner_name, 
    business_name: initialProfile.facility_name, 
    address: initialProfile.location,
    contact_number: contactNumber.trim(),
    picture_url: 'avatar.svg',        
  };
  
  console.log("Data to insert into FINAL 'profiles' table:", finalProfileData);

  const { error: insertError } = await supabase
    .from('profiles') 
    .insert(finalProfileData);

  if (insertError) {
    const errorMsg = `--- SUPABASE PROVIDER PROFILE INSERT ERROR ---: ${insertError.message}`;
    console.error(errorMsg);
    return { error: "A database error occurred while creating your final profile." };
  }
  console.log("Successfully inserted provider data into 'profiles' table.");

  const { error: deleteError } = await supabase
    .from('facility_initial_profile')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    console.error(`--- SUPABASE TEMP PROVIDER PROFILE DELETE ERROR ---: ${deleteError.message}`);
  } else {
    console.log(`Successfully deleted temporary provider profile for user_id: ${user.id}`);
  }

  console.log("SUCCESS! Provider registration fully completed for:", user.id);
}
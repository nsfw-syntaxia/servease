'use server'

import { createClient } from '../utils/supabase/server'; 
import { redirect } from 'next/navigation';

export async function addContactAndCompleteProfile(formData: FormData): Promise<void> {
 console.log("--- ADD CONTACT & COMPLETE PROFILE ACTION ---");

  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getUser();

  if (authError || !data?.user) {
    console.error("User is not authenticated or there was an auth error:", authError);
  }

  const user = data.user;
  console.log("Authenticated user found:", user.id);

  const contactNumber = formData.get('contact') as string;

  if (!contactNumber?.trim()) {
    console.error("Validation FAILED: Contact number is missing.");
  }

  console.log(`Fetching initial profile for user_id: ${user.id}`);
  const { data: initialProfile, error: fetchError } = await supabase
    .from('client_initial_profile') 
    .select('*')
    .eq('user_id', user.id) 
    .single(); 

  if (fetchError || !initialProfile) {
    console.error('Could not find initial profile for user or fetch error:', fetchError);
  }

  console.log("Found initial profile data:", initialProfile);

  const completeProfileData = {
    ...initialProfile, 
    contact: contactNumber.trim(), 
    user_id: user.id 
  };
  
  delete completeProfileData.id; 
  delete completeProfileData.created_at; 

  console.log("Data to insert into final table:", completeProfileData);

  const { error: insertError } = await supabase
    .from('client_users') 
    .insert(completeProfileData);

  if (insertError) {
    console.error('--- SUPABASE FINAL INSERT ERROR ---', insertError);
  }

  const { error: deleteError } = await supabase
    .from('client_initial_profile')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    console.error('--- SUPABASE DELETE ERROR ---', deleteError);
  } else {
    console.log(`Successfully deleted initial profile for user_id: ${user.id}`);
  }

  console.log("SUCCESS! User registration fully completed for:", user.id);
}
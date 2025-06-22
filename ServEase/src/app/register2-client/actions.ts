"use server"

import { createClient } from '../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function addContactAndCompleteProfile(formData: FormData): Promise<void> {
  console.log("--- ADD CONTACT & COMPLETE PROFILE ACTION ---");

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated. Cannot proceed.");
    return redirect('/login?error=You must be logged in to complete your profile.');
  }
  console.log("Authenticated user found:", user.id);

  const contactNumber = formData.get('contact_number') as string;

  if (!contactNumber?.trim()) {
    console.error("Validation FAILED: Contact number is missing.");
    return redirect('/register-contact?error=missing_contact_number');
  }

  console.log(`Fetching initial profile for user_id: ${user.id}`);
  const { data: initialProfile, error: fetchError } = await supabase
    .from('client_initial_profile') 
    .select('*')
    .eq('user_id', user.id) 
    .single(); 

  if (fetchError || !initialProfile) {
    console.error('Could not find initial profile for user or fetch error:', fetchError);
    return redirect('/register-client?error=initial_profile_not_found'); 
  }

  console.log("Found initial profile data:", initialProfile);

  const completeProfileData = {
    ...initialProfile, 
    contact_number: contactNumber.trim(), 
    user_id: user.id 
  };
  
  // IMPORTANT: The 'id' from the `client_initial_profile` table is probably not needed
  // in the `client_complete_profiles` table, as the new table will have its own primary key.
  // We should remove it before inserting.
  delete completeProfileData.id; 
  delete completeProfileData.created_at; // Also good to remove the old timestamp

  console.log("Data to insert into final table:", completeProfileData);

  const { error: insertError } = await supabase
    .from('client_users') 
    .insert(completeProfileData);

  if (insertError) {
    console.error('--- SUPABASE FINAL INSERT ERROR ---', insertError);
    return redirect(`/register-contact?error=database_insert_error&code=${insertError.code}`);
  }

  // Step 6 (Optional but Recommended): Clean up the initial profile record
  // Now that the data is successfully migrated, you can delete the temporary record.
  // await supabase.from('client_initial_profile').delete().eq('user_id', user.id);

  console.log("SUCCESS! User registration fully completed for:", user.id);
  redirect('/signin'); 
}
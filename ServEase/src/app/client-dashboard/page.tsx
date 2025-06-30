import DashboardClient from './dashboardclient'; 
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";

// This is a Server Component, so we can make it async
export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Get the current user session
  const { data: { user } } = await supabase.auth.getUser();

  // 2. If no user is logged in, redirect to the login page
  if (!user) {
    redirect("/login"); // Or your login page
  }

  // 3. Fetch user profile data (including avatar) from the 'profiles' table
  const { data: profile } = await supabase
    .from('profiles')
    .select('profile_picture') // Select the column with the avatar path
    .eq('id', user.id)
    .single();

  let avatarUrl = '/Avatar.svg'; // Default avatar
  if (profile && profile.profile_picture) {
    // If an avatar exists, get its public URL from Supabase Storage
    const { data: { publicUrl } } = supabase.storage
      .from('avatars') // The name of your storage bucket
      .getPublicUrl(profile.profile_picture);
    avatarUrl = publicUrl;
  }

  // 4. Fetch other data like appointments and featured services
  // (This is an example of how you would fetch this from your database)
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: true });

  const { data: featuredServices } = await supabase
    .from('services')
    .select('*')
    .eq('is_featured', true);

  // 5. Render the Client Component and pass all the fetched data as props
  return (
    <DashboardClient
      avatarUrl={avatarUrl}
      appointments={appointments || []}
      featuredServices={featuredServices || []}
    />
  );
}
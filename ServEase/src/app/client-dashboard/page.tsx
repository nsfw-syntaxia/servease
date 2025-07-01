import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient";
import { type Appointment, type Service } from "../lib/supabase/types"; 

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  console.log('Dashboard: Checking user session...');
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  console.log('Dashboard: User data:', user ? 'User found' : 'No user');
  console.log('Dashboard: User error:', userError);

  if (!user) {
    console.log('Dashboard: No user found, redirecting to login');
    redirect("/login");
  }

  console.log('Dashboard: Fetching user profile...');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, picture_url')
    .eq('id', user.id)
    .single();

  console.log('Dashboard: Profile data:', profile);
  console.log('Dashboard: Profile error:', profileError);

  if (!profile || profile.role !== 'client') {
    console.log('Dashboard: Invalid profile or role, redirecting to login');
    redirect('/login');
  }

  let avatarUrl = '/avatar.svg'; 
  if (profile.picture_url) {
    if (!profile.picture_url.startsWith('http')) {
      const { data } = supabase.storage
        .from('avatars') 
        .getPublicUrl(profile.picture_url);
      avatarUrl = data.publicUrl;
    } else {
      avatarUrl = profile.picture_url;
    }
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      start_time,
      status,
      service:services (name),
      provider:profiles (business_name, address)
    `)
    .eq('client_id', user.id)
    .in('status', ['pending', 'confirmed']) 
    .order('start_time', { ascending: true })
    .limit(2); 

  const { data: featuredServices } = await supabase
    .from('services')
    .select(`
      id,
      name,
      price,
      provider:profiles (business_name, avatar_url)
    `)
    .limit(6);

  console.log('Dashboard: Rendering dashboard for user:', user.id);

  return (
    <DashboardClient
      avatarUrl={avatarUrl}
      appointments={appointments as Appointment[] || []}
      featuredServices={featuredServices as Service[] || []}
    />
  );
}

export async function Logout()
{
  const supabase = await createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
}
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient"; // Your existing component
import { type Appointment, type Service } from "../lib/supabase/types"; // We'll define these types for clarity

export default async function ClientDashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, avatar_url')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'client') {
    redirect('/login');
  }

  let avatarUrl = '/avatar.svg'; 
  if (profile.avatar_url) {
    if (!profile.avatar_url.startsWith('http')) {
      const { data } = supabase.storage
        .from('avatars') 
        .getPublicUrl(profile.avatar_url);
      avatarUrl = data.publicUrl;
    } else {
      avatarUrl = profile.avatar_url;
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


  return (
    <DashboardClient
      avatarUrl={avatarUrl}
      appointments={appointments as Appointment[] || []}
      featuredServices={featuredServices as Service[] || []}
    />
  );
}
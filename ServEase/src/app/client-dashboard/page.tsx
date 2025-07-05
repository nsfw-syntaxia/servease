// app/dashboard/page.tsx

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient";
import { type Appointment, type Service } from "./dashboardclient";

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { redirect("/login"); }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, picture_url')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'client') { redirect('/login'); }

  let avatarUrl = '/avatar.svg';
  if (profile.picture_url) {
    const { data } = supabase.storage.from('avatars').getPublicUrl(profile.picture_url);
    avatarUrl = data.publicUrl;
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, date, time, status, address, provider:provider_id ( business_name, picture_url )')
    .eq('client_id', user.id)
    .in('status', ['pending', 'confirmed'])
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(2);

  // --- THE FIX: Call the new function and DO NOT chain .select() ---
  const { data: featuredServices, error: rpcError } = await supabase
    .rpc('get_random_featured_services_with_provider'); // That's it!

  if (rpcError) {
    console.error("Error fetching featured services:", rpcError);
  }

  return (
    <DashboardClient
      avatarUrl={avatarUrl}
      appointments={appointments as Appointment[] || []}
      featuredServices={featuredServices as Service[] || []}
    />
  );
}
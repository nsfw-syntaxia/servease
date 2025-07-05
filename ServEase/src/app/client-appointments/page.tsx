// app/appointments/page.tsx

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import AppointmentsClient from "./appointments";
import { type Appointment } from "./appointments";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // The fix is in this .select() block
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      id,
      date,
      time,
      status,
      address,
      provider:provider_id ( business_name, picture_url )
    `) // <-- The invalid comment has been removed from this string
    .eq('client_id', user.id)
    .order('date', { ascending: true }) 
    .order('time', { ascending: true });

  if (error) {
    // This is where the error you saw was being logged.
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments.</div>;
  }
  
  return (
    <AppointmentsClient initialAppointments={appointments as any || []} />
  );
}
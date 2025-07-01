import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import AppointmentsClient from "./AppointmentsClient"; // We will create this next
import { type Appointment } from "../lib/supabase/types";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  // 1. Get the authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // Protect the page
  }

  // 2. Fetch ALL appointments for the client, ordered by date
  //    It's more efficient to fetch them all at once than on each filter click.
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      id,
      start_time,
      status,
      service:services (name),
      provider:profiles (business_name, address)
    `)
    .eq('client_id', user.id)
    .order('start_time', { ascending: false }); // Show newest first

  if (error) {
    console.error("Error fetching appointments:", error);
    // You could return an error message component here
  }

  // 3. Pass the fetched appointments to the Client Component
  return (
    <AppointmentsClient initialAppointments={appointments as Appointment[] || []} />
  );
}
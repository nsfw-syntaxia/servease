import { redirect } from "next/navigation";
import AppointmentsFacility from "./facility-appointments";
import { getFacilityAppointments } from "./actions";

export default async function FacilityAppointmentsPage() {
  const { data, error } = await getFacilityAppointments();

  if (error) {
    console.error("Failed to load appointments:", error);
    return redirect("/provider-dashboard");
  }

  return <AppointmentsFacility initialAppointments={data || []} />;
}

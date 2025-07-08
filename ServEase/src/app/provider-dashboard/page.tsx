import {
  getDashboardStats,
  getUpcomingAppointments,
  type UpcomingAppointment,
} from "./actions";
import DashboardFacility from "./facility-dashboard";
import { redirect } from "next/navigation";

export default async function FacilityDashboardPage() {
  // fetch the dashboard data on the server before rendering the page
  const stats = await getDashboardStats();
  const upcomingAppointments = await getUpcomingAppointments();

  return (
    <DashboardFacility
      initialStats={stats}
      upcomingAppointments={upcomingAppointments}
    />
  );
}

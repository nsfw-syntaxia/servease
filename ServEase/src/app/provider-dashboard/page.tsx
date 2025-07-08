import { getDashboardStats, type DashboardStats } from "./actions";
import DashboardFacility from "./facility-dashboard";
import { redirect } from "next/navigation";

export default async function FacilityDashboardPage() {
  // fetch the dashboard data on the server before rendering the page
  const stats: DashboardStats = await getDashboardStats();
  
  return <DashboardFacility initialStats={stats} />;
}

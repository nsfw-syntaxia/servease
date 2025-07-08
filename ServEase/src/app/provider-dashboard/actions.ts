"use server";

import { createClient } from "../utils/supabase/server";

// this is the shape of the data we will return
export type DashboardStats = {
  todaysRevenue: number;
  upcomingAppointmentsCount: number;
  totalLikes: number;
  rating: number;
};

/**
 * fetches all the necessary statistics for the facility dashboard in one go
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // if no user is logged in, return zeroed-out data
    return {
      todaysRevenue: 0,
      upcomingAppointmentsCount: 0,
      totalLikes: 0,
      rating: 0,
    };
  }

  // get today's date in 'YYYY-MM-DD' format for Supabase
  const today = new Date();
  today.setHours(0, 0, 0, 0); // start of day
  const todayISO = today.toISOString().split("T")[0];

  // fetch appointments for today to calculate revenue and upcoming count
  const { data: todaysAppointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("status, price")
    .eq("provider_id", user.id)
    .eq("date", todayISO);

  if (appointmentsError) {
    console.error(
      "Error fetching today's appointments:",
      appointmentsError.message
    );
  }

  // calculate stats from today's appointments
  let todaysRevenue = 0;
  let upcomingAppointmentsCount = 0;

  if (todaysAppointments) {
    for (const appt of todaysAppointments) {
      if (appt.status === "completed" && appt.price) {
        todaysRevenue += appt.price;
      }
      if (appt.status === "confirmed") {
        upcomingAppointmentsCount++;
      }
    }
  }

  // fetch the facility's profile for likes and ratings
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("likes, rating")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile stats:", profileError.message);
  }

  // extract likes and ratings
  const totalLikes = profile?.likes ?? 0;
  const rating = profile?.rating ?? 0;

  // return all the fetched and calculated data
  return {
    todaysRevenue,
    upcomingAppointmentsCount,
    totalLikes,
    rating,
  };
}

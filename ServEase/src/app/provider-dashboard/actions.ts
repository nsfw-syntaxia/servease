"use server";

import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";

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

export type UpcomingAppointment = {
  id: number;
  clientName: string;
  service: string;
  time: string;
  date: string;
  avatarUrl: string;
};

export async function getUpcomingAppointments(): Promise<
  UpcomingAppointment[]
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const today = new Date().toISOString().split("T")[0];

  // fetch top 2 upcoming appointments
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("id, client_id, time, date, services") // fetch only necessary fields
    .eq("provider_id", user.id)
    .eq("status", "confirmed")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(2);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError.message);
    return [];
  }

  if (!appointments || appointments.length === 0) {
    return [];
  }

  // get the unique client IDs from the fetched appointments
  const clientIds = [...new Set(appointments.map((a) => a.client_id))];

  // fetch the profiles for just those clients in a single query
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, picture_url")
    .in("id", clientIds);

  if (profilesError) {
    console.error("Error fetching client profiles:", profilesError.message);
    return [];
  }

  // create a Map for easy and fast lookup of client profiles
  const profilesMap = new Map(profiles.map((p) => [p.id, p]));

  // combine the appointment data with the client profile data
  const formattedAppointments: UpcomingAppointment[] = appointments.map(
    (appt) => {
      const clientProfile = profilesMap.get(appt.client_id);

      // format time from "HH:mm:ss" to "h:mm AM/PM"
      const timeParts = appt.time.split(":");
      const hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

      // format date from "YYYY-MM-DD" to "W, M D"
      const dateObj = new Date(`${appt.date}T00:00:00`);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
      });

      // get the first service from the array, or a default string if empty
      const serviceName =
        appt.services && appt.services.length > 0
          ? appt.services[0]
          : "Appointment";

      return {
        id: appt.id,
        clientName: clientProfile?.full_name || "Unknown Client",
        service: serviceName,
        time: formattedTime,
        date: formattedDate,
        avatarUrl: clientProfile?.picture_url || "/avatar.svg",
      };
    }
  );

  return formattedAppointments;
}

export type PendingAppointment = {
  id: number;
  clientName: string;
  serviceName: string; // The first service in the list
  time: string;
  date: string;
};

// fetches all pending appointments
export async function getPendingAppointments(): Promise<PendingAppointment[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // fetch all appointments with a 'pending' status
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("id, client_id, time, date, services")
    .eq("provider_id", user.id)
    .eq("status", "pending")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (appointmentsError) {
    console.error(
      "Error fetching pending appointments:",
      appointmentsError.message
    );
    return [];
  }

  if (!appointments) {
    return [];
  }

  // get unique client IDs to fetch their names efficiently
  const clientIds = [...new Set(appointments.map((a) => a.client_id))];

  if (clientIds.length === 0) {
    return [];
  }

  // fetch the profiles for just those clients
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", clientIds);

  if (profilesError) {
    console.error(
      "Error fetching client profiles for pending:",
      profilesError.message
    );
    return [];
  }

  const profilesMap = new Map(profiles.map((p) => [p.id, p]));

  // combine and format the data
  const formattedAppointments: PendingAppointment[] = appointments.map(
    (appt) => {
      const clientProfile = profilesMap.get(appt.client_id);

      // format date to "Month Day" e.g., "November 1"
      const dateObj = new Date(`${appt.date}T00:00:00`);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      const serviceName =
        appt.services && appt.services.length > 0
          ? appt.services[0]
          : "Appointment";

      return {
        id: appt.id,
        clientName: clientProfile?.full_name || "Unknown Client",
        serviceName: serviceName,
        time: appt.time.substring(0, 5), // format "HH:mm:ss" to "HH:mm"
        date: formattedDate,
      };
    }
  );

  return formattedAppointments;
}

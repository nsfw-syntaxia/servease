"use server";

import { createClient } from "../utils/supabase/server";

export type Appointment = {
  id: number;
  client_avatar_url: string;
  start_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  service: Array<{
    client_name: string;
    service_type: string;
  }>;
  price: number;
  address: string;
  phone_number: string;

  display_date: string;
  display_time: string;
  display_status: string;
};

const capitalize = (s: string) => {
  if (typeof s !== "string" || s.length === 0) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export async function getFacilityAppointments(): Promise<{
  data?: Appointment[];
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated." };
  }

  // fetch all appointments for the logged-in provider
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select(
      "id, client_id, time, status, created_at, price, date, services, address"
    )
    .eq("provider_id", user.id);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError.message);
    return { error: "Could not retrieve appointments." };
  }

  if (!appointments || appointments.length === 0) {
    return { data: [] }; // no appointments found
  }

  // fetch client profiles info
  const clientIds = appointments.map((a) => a.client_id);
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, picture_url, contact_number")
    .in("id", clientIds);

  if (profilesError) {
    console.error("Error fetching client profiles:", profilesError.message);
    return { error: "Could not retrieve client information." };
  }

  // map for ookup of client profiles
  const profilesMap = new Map(profiles.map((p) => [p.id, p]));

  // format data
  const enrichedAppointments = appointments.map((appointment) => {
    const clientProfile = profilesMap.get(appointment.client_id);
    const startTime = new Date(`${appointment.date}T${appointment.time}`);

    return {
      id: appointment.id,
      client_avatar_url: clientProfile?.picture_url || "/circle.svg",
      start_time: startTime.toISOString(),
      status: appointment.status,
      service: (appointment.services || []).map((s: string) => ({
        client_name: clientProfile?.full_name || "Unknown Client",
        service_type: s,
      })),
      price: appointment.price,
      address: appointment.address,
      phone_number: clientProfile?.contact_number || "Not available",
      display_date: startTime.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
      }),
      display_time: startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      display_status: capitalize(appointment.status),
    };
  });

  return { data: enrichedAppointments };
}

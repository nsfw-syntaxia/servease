"use server";

import { createClient } from "../../utils/supabase/server";
import { createAdminClient } from "../../utils/supabase/admin";
import { revalidatePath } from "next/cache";

// --- NEW, CORRECTED DATA TYPES ---
export type ServiceInfo = {
  name: string;
  price: number;
};

export type Appointment = {
  id: number;
  client_avatar_url: string;
  start_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  services: ServiceInfo[]; // Uses the new type for an array of services with prices
  price: number; // This remains the total price of the appointment
  address: string;
  phone_number: string;
  display_date: string;
  display_time: string;
  display_status: string;
  client_name: string; // Add client_name to the top level for easier access
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

  // Step 1: Fetch appointments
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("id, client_id, time, status, price, date, services, address")
    .eq("provider_id", user.id);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError.message);
    return { error: "Could not retrieve appointments." };
  }

  if (!appointments || appointments.length === 0) {
    return { data: [] };
  }

  // Step 2: Aggregate unique IDs and names for efficient fetching
  const clientIds = [...new Set(appointments.map((a) => a.client_id))];
  const allServiceNames = [
    ...new Set(appointments.flatMap((a) => a.services || [])),
  ];

  // Step 3: Fetch profiles and service prices in parallel
  const [profilesResult, servicesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, picture_url, contact_number")
      .in("id", clientIds),
    supabase.from("services").select("name, price").in("name", allServiceNames),
  ]);

  if (profilesResult.error)
    return { error: "Could not retrieve client profiles." };
  if (servicesResult.error)
    return { error: "Could not retrieve service prices." };

  // Step 4: Create maps for fast lookups
  const profilesMap = new Map(profilesResult.data.map((p) => [p.id, p]));
  const servicePriceMap = new Map(
    servicesResult.data.map((s) => [s.name, s.price])
  );

  // Step 5: Combine all data into the final structure
  const enrichedAppointments = appointments.map((appointment) => {
    const clientProfile = profilesMap.get(appointment.client_id);
    const startTime = new Date(`${appointment.date}T${appointment.time}`);

    const servicesWithPrices: ServiceInfo[] = (appointment.services || []).map(
      (serviceName: string) => ({
        name: serviceName,
        price: servicePriceMap.get(serviceName) || 0,
      })
    );

    return {
      id: appointment.id,
      client_name: clientProfile?.full_name || "Unknown Client", // Set client name here
      client_avatar_url: clientProfile?.picture_url || "/circle.svg",
      start_time: startTime.toISOString(),
      status: appointment.status,
      services: servicesWithPrices, // Use the correctly structured services array
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

export async function updateAppointmentStatus(
  appointmentId: number,
  newStatus: "pending" | "confirmed" | "completed" | "canceled"
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update an appointment." };
  }

  const { error } = await supabase
    .from("appointments")
    .update({ status: newStatus })
    .eq("id", appointmentId)
    .eq("provider_id", user.id);

  if (error) {
    console.error("Error updating appointment status:", error.message);
    return { error: "Failed to update appointment status." };
  }

  // --- MODIFIED: Start Email Trigger Logic ---
  // Now triggers for confirmed, canceled, AND completed
  if (["confirmed", "canceled", "completed"].includes(newStatus)) {
    try {
      const { data: app, error: appError } = await supabase
        .from("appointments")
        .select("date, time, services, price, client_id, provider_id")
        .eq("id", appointmentId)
        .single();

      if (appError || !app)
        throw new Error("Could not fetch appointment details for email.");

      const supabaseAdmin = createAdminClient();
      const [
        clientProfile,
        clientAuthUser,
        providerProfile,
        servicesWithPricesResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name")
          .eq("id", app.client_id)
          .single(),
        supabaseAdmin.auth.admin.getUserById(app.client_id),
        supabase
          .from("profiles")
          .select("business_name")
          .eq("id", app.provider_id)
          .single(),
        supabase
          .from("services")
          .select("name, price")
          .in("name", app.services || []),
      ]);

      if (
        clientProfile.error ||
        clientAuthUser.error ||
        providerProfile.error ||
        servicesWithPricesResult.error
      ) {
        throw new Error(
          "Could not fetch all required user/profile/service data."
        );
      }

      const clientEmail = clientAuthUser.data.user?.email;
      if (!clientEmail) throw new Error("Client email not found.");

      const servicePriceMap = new Map(
        servicesWithPricesResult.data.map((s) => [s.name, s.price])
      );

      const emailPayload = {
        clientName: clientProfile.data.full_name || "Valued Client",
        clientEmail,
        providerName: providerProfile.data.business_name || "Your Provider",
        date: app.date,
        time: app.time,
        status: capitalize(newStatus),
        services: (app.services || []).map((s: string) => ({
          name: s,
          price: servicePriceMap.get(s) || 0,
        })),
        totalPrice: app.price,
      };

      // --- MODIFIED: Determine API endpoint based on status ---
      let apiEndpoint = "";
      switch (newStatus) {
        case "confirmed":
          apiEndpoint = "/api/confirmation-by-provider";
          break;
        case "canceled":
          apiEndpoint = "/api/cancellation-by-provider";
          break;
        case "completed":
          apiEndpoint = "/api/completed-by-provider";
          break;
        default:
          // Should not happen, but good practice
          console.log(`No email configured for status: ${newStatus}`);
          revalidatePath("/facility-appointments");
          return {};
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}${apiEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) throw new Error(`API endpoint ${apiEndpoint} failed.`);
      console.log(
        `Email notification for status '${newStatus}' sent successfully.`
      );
    } catch (emailError: any) {
      console.error(
        `Error in email sending process for status '${newStatus}':`,
        emailError.message
      );
    }
  }

  revalidatePath("/facility-appointments");
  return {};
}

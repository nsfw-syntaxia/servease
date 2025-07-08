"use server";

import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";
import { revalidatePath } from "next/cache";

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
  
  if (newStatus === 'canceled') {
    // --- START DEBUGGING BLOCK ---
    console.log(`[DEBUG] Status changed to 'canceled' for appointment ID: ${appointmentId}. Starting email process...`);
    
    try {
      const { data: app, error: appError } = await supabase
        .from('appointments')
        .select('date, time, services, price, client_id, provider_id')
        .eq('id', appointmentId)
        .single();

      if (appError || !app) {
        // This will now be logged on your server
        console.error('[DEBUG] FAILED at step 1: Could not fetch appointment details.', appError);
        throw new Error(`Could not fetch appointment details for email.`);
      }
      console.log('[DEBUG] Step 1 SUCCESS: Fetched appointment details.', app);

      const supabaseAdmin = createAdminClient();

      const [clientProfile, clientAuthUser, providerProfile] = await Promise.all([
        supabase.from('profiles').select('full_name').eq('id', app.client_id).single(),
        supabaseAdmin.auth.admin.getUserById(app.client_id),
        supabase.from('profiles').select('business_name').eq('id', app.provider_id).single()
      ]);

      if (clientProfile.error || clientAuthUser.error || providerProfile.error) {
        console.error('[DEBUG] FAILED at step 2: Error fetching profile or auth data.', {
          clientProfileError: clientProfile.error,
          clientAuthUserError: clientAuthUser.error,
          providerProfileError: providerProfile.error,
        });
        throw new Error('Could not fetch all required user/profile data.');
      }
      console.log('[DEBUG] Step 2 SUCCESS: Fetched client and provider details.');

      const emailPayload = {
        clientName: clientProfile.data.full_name || 'Valued Client',
        clientEmail: clientAuthUser.data.user?.email,
        providerName: providerProfile.data.business_name || 'Your Provider',
        date: app.date,
        time: app.time,
        status: 'Cancelled by Provider',
        services: (app.services || []).map((s: string) => ({ name: s, price: 0 })), 
        totalPrice: app.price,
      };
      
      // THIS IS THE MOST IMPORTANT LOG. It shows the data being sent.
      console.log('[DEBUG] Step 3: Prepared email payload:', emailPayload);

      if (!emailPayload.clientEmail) {
         console.error('[DEBUG] FAILED at Step 3: Client email is missing. Aborting email send.');
         throw new Error('Client email not found, cannot send notification.');
      }

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/send-provider-cancellation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[DEBUG] FAILED at Step 4: API endpoint returned an error. Status: ${response.status}`, errorBody);
        throw new Error('API endpoint failed.');
      }

      console.log('[DEBUG] Step 4 SUCCESS: API call to send email was successful!');
      // --- END DEBUGGING BLOCK ---

    } catch (emailError: any) {
      // This will catch any of the thrown errors above and log them.
      console.error('[DEBUG] An error occurred in the email sending process:', emailError.message);
    }
  }

  revalidatePath("/facility-appointments");
  return {};
}
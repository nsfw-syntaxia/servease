import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import AppointmentsClient from "./appointments";
import { type Appointment } from "./appointments";

// 1. UPDATE THIS TYPE TO MATCH WHAT SUPABASE RETURNS
// The provider and client are arrays of objects, even if there's only one.
type DatabaseAppointment = {
  id: string;
  date: string;
  time: string;
  status: string;
  address: string;
  price: number;
  services: string[];
  provider: {
    business_name: string;
    picture_url: string | null;
    contact_number: string | null;
    email: string;
  }[] | null; // <-- It's an array
  client: {
    full_name: string;
    email: string;
  }[] | null; // <-- It's an array
};

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // This query is now correct and fetches all required data
  const { data: rawAppointments, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      date,
      time,
      status,
      address,
      price,
      services,
      provider:provider_id (
        business_name,
        picture_url,
        contact_number,
        email
      ),
      client:client_id (
        full_name,
        email
      )
    `
    )
    .eq("client_id", user.id)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments.</div>;
  }

  // Service details logic remains the same
  const allServiceNames = new Set<string>();
  rawAppointments?.forEach((apt) => {
    if (apt.services) {
      apt.services.forEach((serviceName) => allServiceNames.add(serviceName));
    }
  });

  const { data: serviceDetails, error: servicesError } = await supabase
    .from("services")
    .select("name, price")
    .in("name", Array.from(allServiceNames));

  if (servicesError) {
    console.error("Error fetching service details:", servicesError);
  }

  const serviceDetailsMap = new Map();
  serviceDetails?.forEach((service) => {
    serviceDetailsMap.set(service.name, service);
  });
  // End of service details logic

  // 2. UPDATE THE MAPPING LOGIC TO "UNPACK" THE ARRAYS
  const appointments: Appointment[] = (rawAppointments || []).map(
    (apt: DatabaseAppointment) => { // Now using the correct incoming type
      const servicesWithDetails =
        apt.services?.map((serviceName) => {
          const serviceDetail = serviceDetailsMap.get(serviceName);
          return {
            name: serviceName,
            price: serviceDetail?.price || 0,
          };
        }) || [];

      return {
        id: apt.id,
        date: apt.date,
        time: apt.time,
        status: apt.status as
          | "pending"
          | "confirmed"
          | "completed"
          | "canceled",
        address: apt.address,
        price: apt.price,
        services: servicesWithDetails,
        // Take the first item from the array, or null if it's empty/missing
        provider: apt.provider ? apt.provider[0] || null : null,
        client: apt.client ? apt.client[0] || null : null,
      };
    }
  );

  return <AppointmentsClient initialAppointments={appointments} />;
}
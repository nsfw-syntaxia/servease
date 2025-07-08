import { createClient } from "../lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import AppointmentsClient from "./appointments";
import { type Appointment } from "./appointments";

type RawDatabaseAppointment = {
  id: any;
  date: any;
  time: any;
  status: any;
  address: any;
  price: any;
  services: any;
  provider_id: any;
  client_id: any;
  profiles: {
    business_name: any;
    picture_url: any;
    contact_number: any;
  } | null;
};

type AuthUser = {
  id: string;
  email?: string;
};

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: clientProfile, error: clientProfileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  if (clientProfileError) {
    console.error("Error fetching client profile:", clientProfileError);
  }
  const clientInfo = {
    full_name: clientProfile?.full_name || user.email || "Unnamed Client",
    email: user.email || "",
  };

  const { data: rawAppointments, error } = (await supabase
  .from("appointments")
  .select(
    `
      id, date, time, status, address, price, services, provider_id, client_id,
      profiles:provider_id ( business_name, picture_url, contact_number )
    `
  )
  .eq("client_id", user.id)
  .order("date", { ascending: true })
  .order("time", { ascending: true })) as {
  data: RawDatabaseAppointment[] | null;
  error: any;
};

console.log("Raw appointments data:", rawAppointments);
  if (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments.</div>;
  }

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const providerIds = [
    ...new Set(
      rawAppointments?.map((apt) => apt.provider_id).filter(Boolean) || []
    ),
  ];
  const providerEmailMap = new Map<string, string>();

  if (providerIds.length > 0) {
    const { data: emailData, error: emailError } =
      await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (emailError) {
      console.error("Error fetching provider emails:", emailError);
    } else {
      const users = emailData.users as AuthUser[];
      users
        .filter((user) => providerIds.includes(user.id))
        .forEach((user) => providerEmailMap.set(user.id, user.email || ""));
    }
  }

  const allServiceNames = new Set<string>();
  rawAppointments?.forEach((apt) => {
    if (apt.services)
      apt.services.forEach((serviceName) => allServiceNames.add(serviceName));
  });

  const { data: serviceDetails, error: servicesError } = await supabase
    .from("services")
    .select("name, price")
    .in("name", Array.from(allServiceNames));

  const serviceDetailsMap = new Map();
  if (serviceDetails) {
    serviceDetails.forEach((service) =>
      serviceDetailsMap.set(service.name, service)
    );
  }

  const appointments: Appointment[] = (rawAppointments || []).map(
  (apt: RawDatabaseAppointment) => {
    const servicesWithDetails =
      apt.services?.map((serviceName) => {
        const serviceDetail = serviceDetailsMap.get(serviceName);
        return { name: serviceName, price: serviceDetail?.price || 0 };
      }) || [];

    const providerProfile = apt.profiles;
    console.log(apt.client_id);
    return {
      id: apt.id,
      client_id: apt.client_id,
      provider_id: apt.provider_id, // <-- Add this
      date: apt.date,
      time: apt.time,
      status: apt.status,
      address: apt.address,
      price: apt.price,
      services: servicesWithDetails,
      provider: providerProfile
        ? {
            business_name: providerProfile.business_name,
            picture_url: providerProfile.picture_url,
            contact_number: providerProfile.contact_number,
            email: providerEmailMap.get(apt.provider_id) || "",
          }
        : null,
      client: clientInfo,
    };
  }
);

  return <AppointmentsClient initialAppointments={appointments} />;
}

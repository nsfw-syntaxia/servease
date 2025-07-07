import { createClient } from "../lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import AppointmentsClient from "./appointments";
import { type Appointment } from "./appointments";

// Type for data coming from the database
type DatabaseAppointment = {
  id: string;
  date: string;
  time: string;
  status: string;
  address: string;
  price: number;
  services: string[];
  provider_id: string;
  profiles: {
    business_name: string;
    picture_url: string | null;
    contact_number: string | null;
  } | null;
};

// Type for the raw data from Supabase (before mapping)
type RawDatabaseAppointment = {
  id: any;
  date: any;
  time: any;
  status: any;
  address: any;
  price: any;
  services: any;
  provider_id: any;
  profiles: {
    business_name: any;
    picture_url: any;
    contact_number: any;
  } | null;
};

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Create admin client for accessing auth.users
  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // This is the service role key, not anon key
  );

  // Get appointments with profiles data
  const { data: rawAppointments, error } = await supabase
    .from('appointments')
    .select(`
      id,
      date,
      time,
      status,
      address,
      price,
      services,
      provider_id,
      profiles:provider_id (
        business_name,
        picture_url,
        contact_number
      )
    `)
    .eq('client_id', user.id)
    .order('date', { ascending: true }) 
    .order('time', { ascending: true }) as { data: RawDatabaseAppointment[] | null, error: any };

  if (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments.</div>;
  }

  // Get unique provider IDs for email lookup
  const providerIds = [...new Set(
    rawAppointments?.map(apt => apt.provider_id).filter(Boolean) || []
  )];

  // Fetch provider emails using admin client
  let providerEmails: { id: string; email: string }[] = [];
  if (providerIds.length > 0) {
    const { data: emailData, error: emailError } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1000 // Adjust as needed
    });

    if (emailError) {
      console.error("Error fetching provider emails:", emailError);
    } else {
      // Filter to only include the provider IDs we need
      providerEmails = emailData.users
        .filter(user => providerIds.includes(user.id))
        .map(user => ({
          id: user.id,
          email: user.email || ''
        }));
    }
  }

  // Create email lookup map
  const emailMap = new Map<string, string>();
  providerEmails.forEach(provider => {
    emailMap.set(provider.id, provider.email);
  });

  // Service details logic
  const allServiceNames = new Set<string>();
  rawAppointments?.forEach(apt => {
    if (apt.services) {
      apt.services.forEach(serviceName => allServiceNames.add(serviceName));
    }
  });

  const { data: serviceDetails, error: servicesError } = await supabase
    .from('services')
    .select('name, price')
    .in('name', Array.from(allServiceNames));

  if (servicesError) {
    console.error("Error fetching service details:", servicesError);
  }

  const serviceDetailsMap = new Map();
  serviceDetails?.forEach(service => {
    serviceDetailsMap.set(service.name, service);
  });

  // Map appointments with email data
  const appointments: Appointment[] = (rawAppointments || []).map((apt: RawDatabaseAppointment) => {
    const servicesWithDetails = apt.services?.map(serviceName => {
      const serviceDetail = serviceDetailsMap.get(serviceName);
      return {
        name: serviceName,
        price: serviceDetail?.price || 0
      };
    }) || [];

    // Handle profiles data correctly (it's a single object from foreign key)
    const profileData = apt.profiles;
    const providerEmail = emailMap.get(apt.provider_id) || null;

    console.log(user.email);
    console.log(providerEmails);

    return {
      id: apt.id,
      date: apt.date,
      time: apt.time,
      status: apt.status as "pending" | "confirmed" | "completed" | "canceled",
      address: apt.address,
      price: apt.price, 
      services: servicesWithDetails, 
      provider: profileData ? {
        business_name: profileData.business_name,
        picture_url: profileData.picture_url,
        contact_number: profileData.contact_number,
        email: providerEmail // Email from auth.users
      } : null,
      client_email: user.email || '' // Client email for notifications
    };
  });

  return (
    <AppointmentsClient initialAppointments={appointments} />
  );
}
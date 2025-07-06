import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import AppointmentsClient from "./appointments";
import { type Appointment } from "./appointments";

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
  } | null;
};

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
      provider:provider_id (
        business_name,
        picture_url,
        contact_number
      )
    `)
    .eq('client_id', user.id)
    .order('date', { ascending: true }) 
    .order('time', { ascending: true });

  if (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments.</div>;
  }

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

  const appointments: Appointment[] = (rawAppointments || []).map((apt: any) => {
    const servicesWithDetails = apt.services?.map(serviceName => {
      const serviceDetail = serviceDetailsMap.get(serviceName);
      return {
        name: serviceName,
        price: serviceDetail?.price || 0
      };
    }) || [];

    return {
      id: apt.id,
      date: apt.date,
      time: apt.time,
      status: apt.status as "pending" | "confirmed" | "completed" | "canceled",
      address: apt.address,
      price: apt.price, 
      services: servicesWithDetails, 
      provider: apt.provider ? {
        business_name: apt.provider.business_name,
        picture_url: apt.provider.picture_url,
        contact_number: apt.provider.contact_number
      } : null
    };
  });
  
  return (
    <AppointmentsClient initialAppointments={appointments} />
  );
}
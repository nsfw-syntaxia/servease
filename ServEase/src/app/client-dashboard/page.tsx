// app/dashboard/page.tsx

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient";
import { type Appointment, type Service } from "./dashboardclient";

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, picture_url")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "client") redirect("/login");

    let avatarUrl = "/avatar.svg";
    if (profile.picture_url) {
      const { data } = supabase.storage.from("avatars").getPublicUrl(profile.picture_url);
      avatarUrl = data.publicUrl;
    }

    // --- STEP 1: FETCH APPOINTMENTS WITH MORE DETAILS ---
    const { data: rawAppointments, error: appointmentsError } = await supabase
      .from("appointments")
      .select(
        `
        id, date, time, status, address, price, services, provider_id,
        provider:provider_id(business_name, picture_url, contact_number)
        `
      )
      .eq("client_id", user.id)
      .in("status", ["pending", "confirmed"])
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .limit(2);

    if (appointmentsError) {
      console.error("Error fetching appointments:", appointmentsError);
    }

    // --- STEP 2: FETCH SERVICE DETAILS (PRICE LOOKUP) ---
    const allServiceNames = new Set<string>();
    rawAppointments?.forEach(apt => {
      if (apt.services) {
        (apt.services as string[]).forEach(serviceName => allServiceNames.add(serviceName));
      }
    });

    const serviceDetailsMap = new Map<string, { name: string; price: number }>();
    if (allServiceNames.size > 0) {
      const { data: serviceDetails, error: servicesError } = await supabase
        .from('services')
        .select('name, price')
        .in('name', Array.from(allServiceNames));
        
      if (servicesError) {
        console.error("Error fetching service details:", servicesError);
      } else {
        serviceDetails?.forEach(service => {
          serviceDetailsMap.set(service.name, service);
        });
      }
    }

    // --- STEP 3: MAP THE RAW DATA TO THE FINAL 'Appointment' TYPE ---
    const appointments: Appointment[] = (rawAppointments || []).map((app) => {
      const provider = Array.isArray(app.provider) ? app.provider[0] : app.provider;
      
      // Fix: Handle provider picture URL properly
      let providerAvatarUrl = null;
      if (provider && provider.picture_url) {
        try {
          // Check if it's already a full URL
          if (provider.picture_url.startsWith('http')) {
            providerAvatarUrl = provider.picture_url;
          } else {
            // Generate public URL for Supabase storage
            const { data } = supabase.storage.from("avatars").getPublicUrl(provider.picture_url);
            providerAvatarUrl = data.publicUrl;
          }
        } catch (error) {
          console.error("Error generating provider avatar URL:", error);
          providerAvatarUrl = null;
        }
      }
      
      const servicesWithDetails = (app.services as string[])?.map(serviceName => {
        const serviceDetail = serviceDetailsMap.get(serviceName);
        return {
          name: serviceName,
          price: serviceDetail?.price || 0
        };
      }) || [];

      // Debug log to check the URL
      console.log("Provider avatar URL:", providerAvatarUrl);

      return {
        id: app.id,
        date: app.date,
        time: app.time,
        status: app.status,
        address: app.address,
        price: app.price,
        services: servicesWithDetails,
        provider: provider
          ? {
              business_name: provider.business_name,
              picture_url: providerAvatarUrl,
              contact_number: provider.contact_number,
            }
          : null,
      };
    });
    
    const { data: rawFeaturedServices, error: rpcError } = await supabase.rpc(
      "get_random_featured_services_with_provider"
    );

    const featuredServices = await Promise.all(
      rawFeaturedServices?.map(async (service, index) => {
        const { data: providerProfile } = await supabase
          .from("profiles")
          .select("picture_url, facility_image_url")
          .eq("id", service.provider_id)
          .single();

        let providerPictureUrl = "/avatar.svg";
        if (providerProfile?.picture_url) {
          if (providerProfile.picture_url.startsWith("http")) {
            providerPictureUrl = providerProfile.picture_url;
          } else {
            const { data } = supabase.storage
              .from("avatars")
              .getPublicUrl(providerProfile.picture_url);
            providerPictureUrl = data.publicUrl;
          }
        }

        let facilityPhotoUrl = "/placeholder-facility.jpg";
        if (providerProfile?.facility_image_url) {
          if (providerProfile.facility_image_url.startsWith("http")) {
            facilityPhotoUrl = providerProfile.facility_image_url;
          } else {
            const { data } = supabase.storage
              .from("documents")
              .getPublicUrl(providerProfile.facility_image_url);
            facilityPhotoUrl = data.publicUrl;
          }
        }

        return {
          ...service,
          id: service.id || `${service.provider_id}-${index}`,
          provider_picture_url: providerPictureUrl,
          facility_photo_url: facilityPhotoUrl,
        };
      }) || []
    );
    return (
      <DashboardClient
        avatarUrl={avatarUrl}
        appointments={appointments} // Pass the fully detailed appointments
        featuredServices={(featuredServices as Service[]) || []}
      />
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    if (error instanceof Error && error.message.includes("rate limit")) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Loading...</h2>
          <p>Please wait a moment and refresh the page.</p>
        </div>
      );
    }
    redirect("/login");
  }
}
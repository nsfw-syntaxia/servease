// app/dashboard/page.tsx

import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient";
import { type Appointment, type Service } from "./dashboardclient";
import { createClient as createAdminClient } from "@supabase/supabase-js";

type AuthUser = {
  id: string;
  email?: string;
};

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, picture_url, full_name")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "client") redirect("/login");

    const clientInfo = {
      full_name: profile.full_name || user.email || "Unnamed Client",
      email: user.email || "",
    };

    let avatarUrl = "/avatar.svg";
    if (profile.picture_url) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(profile.picture_url);
      avatarUrl = data.publicUrl;
    }

    const { data: rawAppointments, error: appointmentsError } = await supabase
      .from("appointments")
      .select(
        `
        id, date, time, status, address, price, services, provider_id, client_id,
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
      throw appointmentsError;
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

    // --- FIX: THIS ENTIRE BLOCK NOW FOLLOWS YOUR WORKING REFERENCE LOGIC ---

    // Step 1: Gather service names (as strings)
    const allServiceNames = new Set<string>();
    rawAppointments?.forEach((apt) => {
      if (Array.isArray(apt.services)) {
        apt.services.forEach((serviceName) => allServiceNames.add(serviceName));
      }
    });

    // Step 2: Fetch details for those names
    const serviceDetailsMap = new Map();
    if (allServiceNames.size > 0) {
      const { data: serviceDetails, error: servicesError } = await supabase
        .from("services")
        .select("name, price")
        .in("name", Array.from(allServiceNames));

      if (serviceDetails) {
        serviceDetails.forEach((service) =>
          serviceDetailsMap.set(service.name, service)
        );
      }
    }

    // Step 3: Map raw appointments to the final structure, using the details map
    const appointments: Appointment[] = (rawAppointments || []).map((app) => {
      const provider = Array.isArray(app.provider)
        ? app.provider[0]
        : app.provider;

      let providerAvatarUrl = null;
      if (provider && provider.picture_url) {
        providerAvatarUrl = provider.picture_url.startsWith("http")
          ? provider.picture_url
          : supabase.storage.from("avatars").getPublicUrl(provider.picture_url)
              .data.publicUrl;
      }

      // Rebuild the services array with price details from the map
      const servicesWithDetails =
        (Array.isArray(app.services) ? app.services : []).map(
          (serviceName: string) => {
            const serviceDetail = serviceDetailsMap.get(serviceName);
            return { name: serviceName, price: serviceDetail?.price || 0 };
          }
        ) || [];

      console.log(servicesWithDetails);
      return {
        id: app.id,
        date: app.date,
        time: app.time,
        status: app.status,
        address: app.address,
        price: app.price,
        services: servicesWithDetails, // Use the newly created array
        provider: provider
          ? {
              business_name: provider.business_name,
              picture_url: providerAvatarUrl,
              contact_number: provider.contact_number,
              email: providerEmailMap.get(app.provider_id) || "",
            }
          : null,
        client: clientInfo,
      };
    });

    // --- Featured Services fetching logic (Unchanged) ---
    const { data: rawFeaturedServices } = await supabase.rpc(
      "get_random_featured_services_with_provider"
    );

    const featuredServices = await Promise.all(
      rawFeaturedServices?.map(async (service: any, index: number) => {
        const { data: providerProfile } = await supabase
          .from("profiles")
          .select("picture_url, facility_image_url")
          .eq("id", service.provider_id)
          .single();

        let providerPictureUrl = "/avatar.svg";
        if (providerProfile?.picture_url) {
          providerPictureUrl = providerProfile.picture_url.startsWith("http")
            ? providerProfile.picture_url
            : supabase.storage
                .from("avatars")
                .getPublicUrl(providerProfile.picture_url).data.publicUrl;
        }

        let facilityPhotoUrl = "/placeholder-facility.jpg";
        if (providerProfile?.facility_image_url) {
          facilityPhotoUrl = providerProfile.facility_image_url.startsWith(
            "http"
          )
            ? providerProfile.facility_image_url
            : supabase.storage
                .from("documents")
                .getPublicUrl(providerProfile.facility_image_url).data
                .publicUrl;
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
        appointments={appointments}
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

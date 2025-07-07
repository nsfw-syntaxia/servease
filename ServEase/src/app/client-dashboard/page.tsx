// app/dashboard/page.tsx

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboardclient";
import { type Appointment, type Service } from "./dashboardclient";

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, picture_url")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "client") {
      redirect("/login");
    }

    let avatarUrl = "/avatar.svg";
    if (profile.picture_url) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(profile.picture_url);
      avatarUrl = data.publicUrl;
    }

    const { data: rawAppointments } = await supabase
      .from("appointments")
      .select(
        "id, date, time, status, address, provider_id, provider:provider_id(business_name, picture_url)"
      )
      .eq("client_id", user.id)
      .in("status", ["pending", "confirmed"])
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .limit(2);

    const appointments =
      rawAppointments?.map((app) => {
        let providerAvatarUrl = null;
        const provider = Array.isArray(app.provider)
          ? app.provider[0]
          : app.provider;

        if (provider && provider.picture_url) {
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(provider.picture_url);
          providerAvatarUrl = data.publicUrl;
        }

        return {
          ...app,
          provider: provider
            ? {
                ...provider,
                picture_url: providerAvatarUrl,
              }
            : null,
        };
      }) || [];

    const { data: rawFeaturedServices, error: rpcError } = await supabase.rpc(
      "get_random_featured_services_with_provider"
    );

    if (rpcError) {
      console.error("Error fetching featured services:", rpcError);
    }

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

    console.log("Raw featured services:", rawFeaturedServices?.slice(0, 1));
    console.log("Processed featured services:", featuredServices?.slice(0, 1));

    return (
      <DashboardClient
        avatarUrl={avatarUrl}
        appointments={(appointments as Appointment[]) || []}
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

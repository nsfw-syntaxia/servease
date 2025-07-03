import { createClient } from "../../utils/supabase/server";
import { createAdminClient } from "../../utils/supabase/admin";
import FacilityDetailsClientPage from "./FacilityDetailsClientPage";
import { notFound } from "next/navigation";

interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  contact_number: string;
  facility_image_url: string | null;
  avatar_url: string | null;
  created_at: string;
  rating: number;
  subcategory: string;
  category: string;
  start_time: string | null;
  end_time: string | null;
  working_days: string[] | null; // Added working_days
  location: { lat: number; lng: number } | null;
}

interface Service {
  id: string;
  service_name: string;
  price: number;
  provider_id: string;
}

interface Review {
  id: string;
}

interface FacilityData extends Profile {
  email: string | null;
}

export default async function FacilityPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const supabaseAdmin = await createAdminClient(); // 2. Initialize the admin client

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // 3. Fetch the user's email using the admin client
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.admin.getUserById(profile.id);

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", params.id);
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", params.id);
  const { data: relatedServices } = await supabase
    .from("profiles")
    .select("id, business_name, rating, facility_image_url, avatar_url")
    .eq("subcategory", profile.subcategory)
    .neq("id", params.id)
    .limit(3);

  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "Not Available" : user.email,
    rating: profile.rating || 0,
  };

  return (
    <FacilityDetailsClientPage
      facility={facilityData}
      services={services || []}
      reviews={reviews || []}
      relatedServices={relatedServices || []}
    />
  );
}

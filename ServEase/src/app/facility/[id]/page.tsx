import { createClient } from "../../utils/supabase/server";
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
  // Assuming you have a location column for the map
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
  // Add other review fields as needed
}

// A helper type for the combined facility data
interface FacilityData extends Profile {
  email: string | null;
}

export default async function FacilityPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // --- 1. Fetch the main provider profile ---
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // --- 2. Fetch the provider's email from auth.users ---
  // This is a privileged operation and works because this is a Server Component
  const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(
    profile.id
  );
  
  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "not available" : user.email,
    rating: profile.rating || (Math.random() * (5 - 3.5) + 3.5),
  };


  // --- 3. Fetch services offered by this provider ---
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", params.id);

  // --- 4. Fetch reviews for this provider ---
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", params.id);
  
  // --- 5. Fetch related services (other providers in the same subcategory) ---
  const { data: relatedServices, error: relatedServicesError } = await supabase
    .from("profiles")
    .select("id, business_name, rating, facility_image_url, avatar_url")
    .eq("subcategory", profile.subcategory)
    .neq("id", params.id) // Exclude the current facility
    .limit(3);

  return (
    <FacilityDetailsClientPage
      facility={facilityData}
      services={services || []}
      reviews={reviews || []}
      relatedServices={relatedServices || []}
    />
  );
}
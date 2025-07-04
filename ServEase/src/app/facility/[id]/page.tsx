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
  picture_url: string | null;
  created_at: string;
  rating: number;
  specific_category: string;
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

interface FacilityPageProps {
  params: Promise<{ id: string }>;
}

interface RelatedServices {
  id: string;
  business_name: string;
  address: string;
  facility_image_url: string | null;
  picture_url: string | null;
  rating: number;
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  // Await the params first
  const { id } = await params;
  
  const supabase = await createClient();
  const supabaseAdmin = await createAdminClient();

  // Fetch facility profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  console.log(`Searching for related services where 'specific_category' equals: "${profile.specific_category}"`);

  // Get user email from admin client
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.admin.getUserById(profile.id);

  // Fetch services for this facility
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", id);

  // Fetch reviews for this facility
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", id);

  // Fetch related services
  const { data: relatedServices } = await supabase
    .from("profiles")
    .select("id, business_name, address, rating, facility_image_url, picture_url")
    .eq("specific_category", profile.specific_category)
    .neq("id", id)
    .limit(6);

  console.log("Related services found:", relatedServices?.length || 0);
  console.log("Related services data:", relatedServices);
  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "Not Available" : user.email,
    rating: profile.rating || 0,
  };
  const processedRelatedServices = (relatedServices || []).map(service => ({
    ...service,
    // If service.rating is null or undefined, assign a random one.
    rating: service.rating || (Math.random() * (5 - 3.5) + 3.5) 
  }));

  return (
    <FacilityDetailsClientPage
      facility={facilityData}
      services={services || []}
      reviews={reviews || []}
      relatedServices={processedRelatedServices || []}
    />
  );
}
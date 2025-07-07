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

  console.log(
    `Searching for related services where 'specific_category' equals: "${profile.specific_category}"`
  );

  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.admin.getUserById(profile.id);

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", id);

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", id);

  const { data: relatedServices } = await supabase
    .from("profiles")
    .select(
      "id, business_name, address, rating, facility_image_url, picture_url"
    )
    .eq("specific_category", profile.specific_category)
    .neq("id", id)
    .limit(6);

  console.log("Services found:", services?.length || 0);
  console.log("Services data:", services);
  console.log("Related service providers found:", relatedServices?.length || 0);
  console.log("Related service providers data:", relatedServices);
  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "Not Available" : user.email,
    rating: profile.rating || 0,
  };
  const processedRelatedServices = (relatedServices || []).map((service) => ({
    ...service,
    rating: service.rating || Math.random() * (5 - 3.5) + 3.5,
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

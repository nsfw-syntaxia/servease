import { createClient } from "../../utils/supabase/server";
import { createAdminClient } from "../../utils/supabase/admin";
import FacilityDetailsClientPage from "./FacilityDetailsClientPage";
import { notFound } from "next/navigation";

// --- FIX 1: Update the interfaces to match the client component's needs ---

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
  working_days: string[] | null;
  location: { lat: number; lng: number } | null;
}

// Corrected the Service interface
interface Service {
  id: number;
  name: string; // The client expects 'name', not 'service_name'
  price: number;
  provider_id: string;
}

// This is the new, detailed Review interface
interface Review {
  id: string;
  rating: number;
  comment: string;
  client_name: string;
  created_at: string;
  client: {
    picture_url: string | null;
  } | null;
}

interface FacilityData extends Profile {
  email: string | null;
}

interface FacilityPageProps {
  params: { id: string }; // No need for Promise here, Next.js handles it
}

interface RelatedServices {
  id:string;
  business_name: string;
  address: string;
  facility_image_url: string | null;
  picture_url: string | null;
  rating: number;
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { id } = params;

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

  const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(profile.id);

  const { data: rawServices } = await supabase
    .from("services")
    .select("id, service_name, price, provider_id") // Be specific with selects
    .eq("provider_id", id);
    
  // --- FIX 2: This is the most important change. Update the query for reviews. ---
  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      comment,
      client_name,
      created_at,
      client:client_id (
        picture_url
      )
    `)
    .eq("provider_id", id)
    .order('created_at', { ascending: false }); // Optional: show newest reviews first

  const { data: relatedServices } = await supabase
    .from("profiles")
    .select(
      "id, business_name, address, rating, facility_image_url, picture_url"
    )
    .eq("specific_category", profile.specific_category)
    .neq("id", id)
    .limit(6);

  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "Not Available" : user.email,
    rating: profile.rating || 0,
  };

  // --- FIX 3: Process the services data to match the client component's 'Service' interface ---
  const processedServices = (rawServices || []).map(service => ({
      id: service.id,
      name: service.service_name, // Rename 'service_name' to 'name'
      price: service.price,
      provider_id: service.provider_id
  }));

  const processedRelatedServices = (relatedServices || []).map((service) => ({
    ...service,
    rating: service.rating || 0, // Fallback to 0 if rating is null
  }));

  return (
    <FacilityDetailsClientPage
      facility={facilityData}
      // Pass the correctly formatted data to the client component
      services={processedServices}
      reviews={reviews || []}
      relatedServices={processedRelatedServices}
    />
  );
}
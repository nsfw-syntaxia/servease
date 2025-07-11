import { createClient } from "../../../utils/supabase/server";
import { createAdminClient } from "../../../utils/supabase/admin";
import FacilityDetailsClientPage from "./FacilityDetailsClientPage";
import { notFound } from "next/navigation";
import { getFacilityLikeStatus, getFacilityPhotos } from "./actions";

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

interface Service {
  id: string;
  service_name: string;
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
    .select(
      `
      id,
      rating,
      comment,
      client_name,
      created_at,
      service_name,
      client:client_id (
        picture_url
      )
    `
    )
    .eq("provider_id", id)
    .order("created_at", { ascending: false }); // Optional: show newest reviews first

  const { data: relatedServices } = await supabase
    .from("profiles")
    .select(
      "id, business_name, address, rating, facility_image_url, picture_url"
    )
    .eq("specific_category", profile.specific_category)
    .neq("id", id)
    .limit(6);

  const { isLiked, totalLikes } = await getFacilityLikeStatus(id);
  const facilityPhotos = await getFacilityPhotos(id);

  const facilityData: FacilityData = {
    ...profile,
    email: userError || !user ? "Not Available" : user.email,
    rating: profile.rating || 0,
  };

  const processedReviews = (reviews || []).map((review) => {
    let clientData = null;

    if (Array.isArray(review.client) && review.client.length > 0) {
      clientData = review.client[0];
    } else if (
      review.client &&
      typeof review.client === "object" &&
      !Array.isArray(review.client)
    ) {
      clientData = review.client;
    }

    return {
      ...review,
      client: clientData,
    };
  });

  const processedRelatedServices = (relatedServices || []).map((service) => ({
    ...service,
    rating: service.rating || 0,
  }));

  console.log(reviews);
  console.log(processedReviews);

  return (
    <FacilityDetailsClientPage
      facility={facilityData}
      services={services || []}
      reviews={processedReviews}
      relatedServices={processedRelatedServices}
      initialIsLiked={isLiked} 
      initialTotalLikes={totalLikes} 
      facilityPhotos={facilityPhotos}
    />
  );
}


import { createClient } from "../../../utils/supabase/server";
import HAMSClientPage from "./category-b"; 

interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  facility_image_url: string | null;
  avatar_url: string | null;
  created_at: string;
  rating: number;
}

export default async function HealthAndMedicalPage() {
  const supabase = await createClient();

  const CATEGORY_NAME = "Health & Medical Services";

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "provider")
    .eq("category", CATEGORY_NAME);

  if (error) {
    console.error("Database Error:", error.message);
    return <div>Failed to load services. Please check server logs.</div>;
  }

  const processedProfiles: Profile[] = data.map((profile) => {
    let finalAvatarUrl = "/avatar.svg"; 

    if (profile.avatar_url) {
      if (profile.avatar_url.startsWith("http")) {
        finalAvatarUrl = profile.avatar_url;
      } else {
        const { data: urlData } = supabase.storage
          .from("avatars") 
          .getPublicUrl(profile.avatar_url);

        finalAvatarUrl = urlData.publicUrl;
      }
    }

    return {
      ...profile,
      rating: profile.rating || Math.random() * (5 - 3.5) + 3.5,
      avatar_url: finalAvatarUrl,
    };
  });

  const popularServices = [...processedProfiles].sort(
    (a, b) => b.rating - a.rating
  );
  const newServices = [...processedProfiles].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const allServices = processedProfiles;

  return (
    <HAMSClientPage
      initialPopularServices={popularServices}
      initialNewServices={newServices}
      initialAllServices={allServices}
    />
  );
}

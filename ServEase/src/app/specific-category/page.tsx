import { createClient } from "../utils/supabase/server";
import SpecificCategoryClientPage from "./specific-category";
import { notFound } from "next/navigation";

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

export default async function SpecificCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const subCategoryName = resolvedSearchParams.name;

  if (!subCategoryName) {
    notFound();
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "provider")
    .eq("specific_category", subCategoryName);

  if (error) {
    console.error("Database Error:", error.message);
    return <div>Failed to load services for this category.</div>;
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

  return (
    <SpecificCategoryClientPage
      services={processedProfiles}
      subCategoryName={subCategoryName}
    />
  );
}

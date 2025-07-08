// app/api/search/route.ts

import { createClient } from "../../utils/supabase/server";
import { NextResponse } from "next/server";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  if (!query) {
    return NextResponse.json(
      { error: "Search query not provided" },
      { status: 400 }
    );
  }
  if (!category) {
    return NextResponse.json(
      { error: "Category not provided" },
      { status: 400 }
    );
  }

  const supabase = createClient();

  // --- THIS IS THE MAJOR CHANGE ---
  // We now call the database function directly using rpc()
  const { data, error } = await supabase.rpc('search_profiles_by_category', {
    search_query: query,
    profile_category: category
  });

  if (error) {
    console.error("Supabase RPC error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  
  // Process avatar URLs to ensure they are public and valid
  const processedProfiles: Profile[] = data.map((profile: any) => {
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

  return NextResponse.json(processedProfiles);
}
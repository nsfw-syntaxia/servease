"use server";

import { createClient } from "../../../utils/supabase/server";
import { createAdminClient } from "../../../utils/supabase/admin";
import { revalidatePath } from "next/cache";

/**
 * Toggles the like status for a facility for the current user.
 * This is an atomic operation handled by a Postgres function.
 * @param facilityId The UUID of the facility to like/unlike.
 * @returns An object with the new 'isLiked' status or an error message.
 */
export async function toggleFacilityLike(
  facilityId: string
): Promise<{ error?: string; isLiked?: boolean }> {
  // FIX: Added 'await' here
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to like a facility." };
  }

  // Call the 'toggle_like' function in your database
  const { data, error } = await supabase.rpc("toggle_like", {
    facility_id_arg: facilityId,
    user_id_arg: user.id,
  });

  if (error) {
    console.error("Error toggling like:", error.message);
    return { error: "Could not process your request." };
  }

  // Revalidate the page path to ensure data consistency
  revalidatePath(`/facility/${facilityId}`);

  // The RPC function returns the new liked status (true or false)
  return { isLiked: data };
}

/**
 * Fetches the initial like status and total like count for a facility.
 * This should be called from a Server Component to prepare props for the client.
 * @param facilityId The UUID of the facility.
 * @returns An object with the current user's like status and the total likes.
 */
export async function getFacilityLikeStatus(
  facilityId: string
): Promise<{ isLiked: boolean; totalLikes: number }> {
  // FIX: Added 'await' here
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the total like count from the 'profiles' table
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("likes")
    .eq("id", facilityId)
    .single();

  if (profileError) {
    console.error("Error fetching total likes:", profileError.message);
    return { isLiked: false, totalLikes: 0 };
  }

  const totalLikes = profileData?.likes ?? 0;

  // If there's no user, they can't have liked it.
  if (!user) {
    return { isLiked: false, totalLikes };
  }

  // Check if a record exists in our join table
  const { data: likeData, error: likeError } = await supabase
    .from("user_facility_likes")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("facility_id", facilityId)
    .maybeSingle();

  if (likeError) {
    console.error("Error checking user like status:", likeError.message);
    return { isLiked: false, totalLikes };
  }

  // If likeData is not null, the user has liked this facility.
  return { isLiked: !!likeData, totalLikes };
}

export async function getFacilityPhotos(facilityId: string): Promise<string[]> {
  // Use the admin client to bypass Row Level Security safely on the server
  const supabaseAdmin = createAdminClient();

  try {
    const { data: documents, error } = await supabaseAdmin
      .from("facility_documents")
      .select("file_path")
      .eq("user_id", facilityId) // Use the facility's ID passed into the function
      .eq("document_type", "Facility Photos")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(
        "Admin Error: Failed to fetch photo records:",
        error.message
      );
      return []; // Return empty array on error
    }

    if (!documents || documents.length === 0) {
      return [];
    }

    // Get public URLs for each file path
    const photoUrls = documents
      .map((doc) => {
        if (!doc.file_path) return null;
        const { data: urlData } = supabaseAdmin.storage
          .from("documents")
          .getPublicUrl(doc.file_path);
        return urlData.publicUrl;
      })
      .filter((url): url is string => !!url); // Ensure no nulls are returned

    return photoUrls;
  } catch (error) {
    console.error("A catch-block error occurred in getFacilityPhotos:", error);
    return [];
  }
}

"use server";

import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";
import { revalidatePath } from "next/cache";

export type FacilityProfileDataType = {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  category: string;
  specificCategory: string;
  tags: string;
  profileImage: string;
  isVerified: boolean;
};

export async function getFacilityProfileData(): Promise<{
  data?: FacilityProfileDataType;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated." };
  }

  try {
    // We fetch from the 'profiles' table and the 'auth.users' table concurrently
    const profilePromise = supabase
      .from("profiles")
      .select(
        "business_name, address, category, specific_category, contact_number, tags, picture_url, status"
      )
      .eq("id", user.id)
      .single();

    const supabaseAdmin = createAdminClient();
    const authUserPromise = supabaseAdmin.auth.admin.getUserById(user.id);

    const [
      { data: profile, error: profileError },
      { data: authUser, error: userError },
    ] = await Promise.all([profilePromise, authUserPromise]);

    if (profileError && profileError.code !== "PGRST116") throw profileError;
    if (userError) throw userError;

    // Map the fetched data to the structure our component expects
    const formattedData: FacilityProfileDataType = {
      name: profile?.business_name || "",
      email: authUser?.user?.email || "",
      address: profile?.address || "",
      contactNumber: profile?.contact_number || "",
      category: profile?.category || "",
      specificCategory: profile?.specific_category || "",
      tags: profile?.tags || "",
      profileImage: profile?.picture_url || "/avatar.svg",
      isVerified: profile?.status === "verified", // <-- This is our boolean flag
    };

    return { data: formattedData };
  } catch (error: any) {
    console.error("Error fetching facility profile data:", error.message);
    return { error: "Failed to fetch facility profile data." };
  }
}

export type UpdateProfilePayload = {
  full_name: string;
  address: string;
  contact_number: string;
  picture_url?: string; // <-- MODIFICATION: picture_url is now optional
};

export async function updateUserProfile(
  payload: UpdateProfilePayload
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }

  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", user.id);

  if (error) {
    console.error("Supabase profile update error:", error.message);
    return { error: "Could not update profile information." };
  }

  revalidatePath("/facility-profile"); // Adjust if your URL is different
  return {};
}

export async function updateUserEmail(
  newEmail: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });

  if (error) {
    console.error("Supabase email update error:", error.message);
    // Provide a user-friendly error message
    if (error.message.includes("same as the current email")) {
      return { error: "This is already your current email address." };
    }
    return { error: "Could not update your email address." };
  }

  // A confirmation email will be sent to the new address.
  // The email won't actually change until the user clicks the link.
  return {};
}

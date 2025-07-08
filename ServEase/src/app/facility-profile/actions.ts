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
    // we fetch from the 'profiles' table and the 'auth.users' table concurrently
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

    // map the fetched data to the structure our component expects
    const formattedData: FacilityProfileDataType = {
      name: profile?.business_name || "",
      email: authUser?.user?.email || "",
      address: profile?.address || "",
      contactNumber: profile?.contact_number || "",
      category: profile?.category || "",
      specificCategory: profile?.specific_category || "",
      tags: profile?.tags || "Tags",
      profileImage: profile?.picture_url || "/avatar.svg",
      isVerified: profile?.status === "verified",
    };

    return { data: formattedData };
  } catch (error: any) {
    console.error("Error fetching facility profile data:", error.message);
    return { error: "Failed to fetch facility profile data." };
  }
}

export type UpdateProfilePayload = {
  business_name: string;
  address: string;
  contact_number: string;
  picture_url?: string;
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

  revalidatePath("/facility-profile");
  return {};
}

export async function updateUserEmail(
  newEmail: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });

  if (error) {
    console.error("Supabase email update error:", error.message);

    if (error.message.includes("same as the current email")) {
      return { error: "This is already your current email address." };
    }
    return { error: "Could not update your email address." };
  }

  // a confirmation email will be sent to the new address
  // the email won't actually change until the user clicks the link
  return {};
}

export async function uploadFacilityPhoto(
  formData: FormData
): Promise<{ success?: string; error?: string; filePath?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to upload a photo." };
  }

  const file = formData.get("photo") as File;
  if (!file) {
    return { error: "No file was provided." };
  }

  const fileExtension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (storageError) {
    return { error: `Failed to upload file: ${storageError.message}` };
  }

  const { error: dbError } = await supabase.from("facility_documents").insert({
    user_id: user.id,
    document_type: "Facility Photos",
    file_path: filePath,
    file_name: file.name,
  });

  if (dbError) {
    console.error("Database Error, rolling back storage upload:", dbError);
    await supabase.storage.from("documents").remove([filePath]);
    return { error: `Failed to save photo record: ${dbError.message}` };
  }

  revalidatePath("/facility-profile");

  return { success: `Successfully uploaded ${file.name}!`, filePath: filePath };
}

export async function deleteFacilityPhoto(
  filePath: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated." };
  }

  try {
    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage deletion error:", storageError.message);
      if (storageError.message !== "The resource was not found") {
        throw storageError;
      }
    }

    const { error: dbError } = await supabase
      .from("facility_documents")
      .delete()
      .eq("user_id", user.id)
      .eq("file_path", filePath);

    if (dbError) {
      throw dbError;
    }

    revalidatePath("/facility-profile");
    return {};
  } catch (error: any) {
    console.error("Error deleting facility photo:", error.message);
    return { error: "Failed to delete photo." };
  }
}

export async function changeUserPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success?: string; error?: string }> {
  const supabase = await createClient();

  // First, get the user's email. We need it to verify the current password.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return { error: "User not authenticated." };
  }

  // Step 1: Verify the user's current password by trying to sign in with it.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    // If this fails, the current password was incorrect.
    return { error: "Incorrect current password. Please try again." };
  }

  // Step 2: If verification was successful, update the user with the new password.
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error("Error updating password:", updateError.message);
    return { error: "Failed to update password. Please try again later." };
  }

  return { success: "Password updated successfully!" };
}

"use server";

import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function deleteFacilityAccount(
  password: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();

  // 1. Get the currently logged-in user from the server-side session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "User not authenticated." };
  }

  // 2. IMPORTANT: Verify the password is correct before proceeding.
  const { error: passwordError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: password,
  });

  if (passwordError) {
    return { error: "Incorrect password. Please try again." };
  }

  // 3. If password is correct, use the Supabase Admin Client to delete the user.
  // This is required because user deletion is a protected, administrative action.
  const supabaseAdmin = createAdminClient();
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id
  );

  if (deleteError) {
    console.error("Supabase admin delete error:", deleteError.message);
    return { error: "Failed to delete account. Please contact support." };
  }

  // 4. Revalidate paths and sign the user out on the server side
  revalidatePath("/", "layout");
  await supabase.auth.signOut();

  // Return success
  return { success: true };
}

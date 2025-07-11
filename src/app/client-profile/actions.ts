"use server";

import { createClient } from "../../utils/supabase/server";
import { createAdminClient } from "../../utils/supabase/admin";
import { revalidatePath } from "next/cache";

export type ProfileDataType = {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  gender: string;
  birthdate: string;
  profileImage: string;
};

export async function getUserProfileData(): Promise<{
  data?: ProfileDataType;
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
    const profilePromise = supabase
      .from("profiles")
      .select(
        "full_name, address, gender, birth_date, contact_number, picture_url"
      )
      .eq("id", user.id)
      .single();

    const supabaseAdmin = createAdminClient();
    const authUserPromise = supabaseAdmin.auth.admin.getUserById(user.id);

    const [
      { data: profile, error: profileError }, // `profile` will be null if not found
      { data: authUser, error: userError },
    ] = await Promise.all([profilePromise, authUserPromise]);

    // --- KEY FIX: Don't throw an error if the profile is just missing ---
    // This is expected if the user hasn't completed their profile yet.
    // We only throw if there's a different, unexpected error.
    if (profileError && profileError.code !== "PGRST116") {
      // PGRST116 is the code for "exact one row not found"
      throw profileError;
    }
    if (userError) throw userError;

    // Map the data. This now safely handles a `null` profile object.
    const formattedData: ProfileDataType = {
      name: profile?.full_name || "",
      email: authUser?.user?.email || "",
      address: profile?.address || "",
      contactNumber: profile?.contact_number || "",
      gender: profile?.gender || "",
      birthdate: profile?.birth_date
        ? new Date(profile.birth_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
      profileImage: profile?.picture_url || "/avatar.svg",
    };

    return { data: formattedData };
  } catch (error: any) {
    console.error("Error fetching profile data:", error.message);
    return { error: "Failed to fetch profile data." };
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

  revalidatePath("/client-profile"); // Adjust if your URL is different
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

export async function deleteClientAccount(
  password: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();

  // 1. Get the currently logged-in user from the server-side session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { error: "User not authenticated." };
  }

  // 2. Verify the user's current password by trying to sign in with it.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: password,
  });

  if (signInError) {
    return { error: "Incorrect password. Account not deleted." };
  }

  // 3. If the password is correct, use the Supabase Admin Client to delete the user.
  // This is a protected, administrative action.
  const supabaseAdmin = createAdminClient();
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id
  );

  if (deleteError) {
    console.error("Supabase admin delete error:", deleteError.message);
    return { error: "Failed to delete account. Please contact support." };
  }

  // 4. Sign the user out from the server-side to invalidate their session.
  await supabase.auth.signOut();

  // Return success. The client-side will handle the redirect.
  return { success: true };
}

export async function changeUserPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success?: string; error?: string }> {
  const supabase = await createClient();

  // Get the user's email to verify their current password.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return { error: "User not authenticated." };
  }

  // Step 1: Verify the current password by trying to sign in.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    // If sign-in fails, the password was incorrect.
    return { error: "Incorrect current password. Please try again." };
  }

  // Step 2: If verification is successful, update the user with the new password.
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error("Error updating password:", updateError.message);
    return { error: "Failed to update password. Please try again later." };
  }

  return { success: "Password updated successfully!" };
}

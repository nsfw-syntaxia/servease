"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";

// this is the data structure the client component expects
export type ProfileDataType = {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  gender: string;
  birthdate: string;
  profileImage: string;
};

// this is our main server action
export async function getUserProfileData(): Promise<{
  data?: ProfileDataType;
  error?: string;
}> {
  // get the current user session, this is the secure way to identify the user on the server
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // a server action called from a client can't redirect directly
    // instead, we return an error that the client can handle
    return { error: "User not authenticated." };
  }

  try {
    // concurrently fetch data from 'profiles' and 'auth.users'
    // this is more efficient than awaiting them one by one
    const profilePromise = supabase
      .from("profiles")
      .select(
        "full_name, address, gender, birth_date, contact_number, picture_url"
      )
      .eq("id", user.id)
      .single();

    const supabaseAdmin = createAdminClient();
    const authUserPromise = supabaseAdmin.auth.admin.getUserById(user.id);

    // await both promises to resolve
    const [
      { data: profile, error: profileError },
      { data: authUser, error: userError },
    ] = await Promise.all([profilePromise, authUserPromise]);

    if (profileError) throw profileError;
    if (userError) throw userError;

    // map the database columns to the client-side state names and format the data.
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

    // return the data successfully.
    return { data: formattedData };
  } catch (error: any) {
    console.error("Error fetching profile data:", error.message);
    return { error: "Failed to fetch profile data." };
  }
}

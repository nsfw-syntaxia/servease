"use server";

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface LoginResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !user) {
    console.error("Login Error:", signInError?.message);
    return { success: false, error: "Invalid credentials. Please try again." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    console.error("Profile fetch error:", profileError?.message);
    return {
      success: false,
      error: "Could not find user profile. Please contact support.",
    };
  }

  let redirectTo = "";
  switch (profile.role) {
    case "client":
      redirectTo = "/client-dashboard";
      break;
    case "provider":
      redirectTo = "/provider-dashboard";
      break;
    default:
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Your account does not have a valid role.",
      };
  }

  revalidatePath("/", "layout");

  return { success: true, redirectTo };
}

"use server";

import { type SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/server";

export async function clientLoginCredentials(
  formData: FormData
): Promise<void> {
  console.log("--- SIGNUP SERVER ACTION RUNNING ---");

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error("--- SUPABASE SIGNUP ERROR ---", error.message);
  }

  if (data.user) {
    console.log("User created. User ID: ", data.user.id);
    const {
      data: { user: sessionUser },
    } = await supabase.auth.getUser();
    console.log("Session user id: ", sessionUser?.id);
  }

  console.log("SUCCESS! User account created. Redirecting to profile setup.");
}

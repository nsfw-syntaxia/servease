import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Sign out the user
  await supabase.auth.signOut();

  // Redirect to the login page
  return NextResponse.redirect(new URL("/login", request.url));
}

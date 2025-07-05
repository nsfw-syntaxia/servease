import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  console.log(`\n--- New Request ---`); // <-- DEBUG LOG
  console.log(`Request Path: ${request.nextUrl.pathname}`); // <-- DEBUG LOG

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // --- LOGGED-IN USER LOGIC ---
  if (user) {
    // Fetch user's role from the database
    console.log(`Middleware state: User is LOGGED IN (ID: ${user.id})`); // <-- DEBUG LOG
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Determine the correct dashboard URL based on the user's role
    const role = profile?.role;
    const dashboardUrl =
      role === "client"
        ? "/client-dashboard"
        : role === "provider"
        ? "/provider-dashboard"
        : "/home"; // Fallback to home if role is not found

    // 1. If a logged-in user tries to access guest pages, redirect them to their dashboard.
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      console.log(
        `User on ${pathname}, redirecting to their dashboard: ${dashboardUrl}`
      );
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // 2. If a logged-in user lands on the generic home or root, redirect them to their dashboard.
    if (pathname === "/home" || pathname === "/") {
      console.log(
        `User on root/home, redirecting to their dashboard: ${dashboardUrl}`
      );
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }
  // --- GUEST LOGIC ---
  else {
    console.log("Middleware state: User is a GUEST (user is null)"); // <-- DEBUG LOG
    // Define routes that require authentication
    const authenticatedRoutes = [
      "/client-dashboard",
      "/provider-dashboard",
      "/client-profile",
      "/facility-profile",
      "/appointments",
      "/discover",
      // Add any other protected routes here
    ];

    const isAccessingProtectedRoute = authenticatedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    console.log(
      `Is guest trying to access a protected route? ${isAccessingProtectedRoute}`
    ); // <-- CRUCIAL DEBUG LOG

    /*
    // 3. If a guest tries to access a protected route, redirect them to the login page.
    if (authenticatedRoutes.some((route) => pathname.startsWith(route))) {
      console.log(
        `Guest on protected route ${pathname}, redirecting to /login`
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }*/

    if (isAccessingProtectedRoute) {
      console.log(
        `>>> REDIRECTING guest from protected route (${pathname}) to /login`
      ); // <-- DEBUG LOG
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      console.log(
        `Guest is accessing a public route (${pathname}). Allowing access.`
      ); // <-- DEBUG LOG
    }
  }

  console.log("--- End of Middleware Logic ---"); // <-- DEBUG LOG
  // If no redirection rules match, allow the request to proceed
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // --- LOGGED-IN USER LOGIC ---
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;
    const dashboardUrl =
      role === "client"
        ? "/client-dashboard"
        : role === "provider"
        ? "/provider-dashboard"
        : "/home"; // Fallback if role not found

    const guestAndGenericRoutes = ["/", "/home", "/login", "/signup"];

    // If the user is on a guest/generic page...
    if (guestAndGenericRoutes.includes(pathname)) {
      // ...AND they are not already at their destination dashboard (THIS PREVENTS THE LOOP)
      if (dashboardUrl !== pathname) {
        console.log(
          `User on generic page ${pathname}, redirecting to their dashboard: ${dashboardUrl}`
        );
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    }
  }
  // --- GUEST LOGIC ---
  else {
    const authenticatedRoutes = [
      "/client-dashboard",
      "/provider-dashboard",
      "/client-profile",
      "/facility-profile",
      "/appointments",
      "/messages",
      "/notifications",
      "/schedule",
    ];

    // If a guest tries to access a protected route, redirect them to login
    if (authenticatedRoutes.some((route) => pathname.startsWith(route))) {
      console.log(
        `Guest on protected route ${pathname}, redirecting to /login`
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

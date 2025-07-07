import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Note: This function requires the 'cache' import if you're using it
// in a layout that might be statically rendered. For a dynamic page,
// it's fine as is.
// import { cache } from 'react'

export const createClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
};

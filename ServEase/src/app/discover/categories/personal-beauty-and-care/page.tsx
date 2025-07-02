// app/categories/personal-beauty-and-care/page.tsx

import { createClient } from "../../../utils/supabase/server";
// Corrected the import name to match the exported component
import ClientPage from "./category-a"; 

// The Profile type can be defined here or in a shared types file
interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  facility_image_url: string | null;
  avatar_url: string | null;
  created_at: string;
  rating: number; 
}

export default async function PersonalAndBeautyCarePage() {
  // FIX: Added 'await' because createClient is async
  const supabase = await createClient();
  const CATEGORY_NAME = "Personal Care & Beauty Services";

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'provider')
    .eq('category', CATEGORY_NAME);

  if (error) {
    console.error("Database Error:", error.message);
    return <div>Failed to load services. Please check server logs.</div>;
  }
  
  const profilesWithRating: Profile[] = data.map(p => ({
      ...p,
      // Fallback for rating if not present in the database
      rating: p.rating || (Math.random() * (5 - 3.5) + 3.5)
  }));

  const popularServices = [...profilesWithRating].sort((a, b) => b.rating - a.rating);
  const newServices = [...profilesWithRating].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const allServices = profilesWithRating;
  
  return (
    <ClientPage
      initialPopularServices={popularServices}
      initialNewServices={newServices}
      initialAllServices={allServices}
    />
  );
}
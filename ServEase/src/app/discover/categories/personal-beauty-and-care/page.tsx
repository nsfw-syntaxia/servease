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
  
const processedProfiles: Profile[] = data.map(profile => {
      let finalAvatarUrl = '/avatar.svg'; // Default fallback avatar

      // Your logic, applied to each profile in the array
      if (profile.avatar_url) {
          if (profile.avatar_url.startsWith('http')) {
              // If it's already a full URL, use it
              finalAvatarUrl = profile.avatar_url;
          } else {
              // Otherwise, it's a path; generate the public URL
              const { data: urlData } = supabase.storage
                .from('avatars') // IMPORTANT: Make sure 'avatars' is your correct bucket name
                .getPublicUrl(profile.avatar_url);
              
              finalAvatarUrl = urlData.publicUrl;
          }
      }

      // Return a new object with the original data, a fallback rating, and the corrected avatar URL
      return {
          ...profile,
          rating: profile.rating || (Math.random() * (5 - 3.5) + 3.5),
          avatar_url: finalAvatarUrl, // Overwrite the old path with the full URL
      };
  });

  // --- DATA SORTING ---
  // Use the newly processed data for sorting
  const popularServices = [...processedProfiles].sort((a, b) => b.rating - a.rating);
  const newServices = [...processedProfiles].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const allServices = processedProfiles;
  
  return (
    <ClientPage
      initialPopularServices={popularServices}
      initialNewServices={newServices}
      initialAllServices={allServices}
    />
  );
}
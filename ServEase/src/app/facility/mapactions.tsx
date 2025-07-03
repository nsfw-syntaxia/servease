'use server';

import { createClient } from "../utils/supabase/server";
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const MapDisplay = dynamic(() => import('./[id]/Map'), {
  ssr: false,
  loading: () => <div style={{height: '500px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading map...</div>
});

interface ProviderPageProps {
  params: {
    id: string;
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = params;

  // --- THE KEY CHANGE IS HERE ---
  // If createClient() is an async function, you must await it to get the client object.
  const supabase = await createClient();

  // Now that `supabase` holds the actual client object (not a promise), this next line will work.
  const { data: provider, error } = await supabase
    .from('service_providers')
    .select('name, location')
    .eq('id', id)
    .single();
    
  if (error || !provider) {
    console.error('Error fetching provider or provider not found:', error);
    notFound();
  }

  if (!provider.location) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>{provider.name}</h1>
        <p>This provider has not specified a location.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1>Location for: {provider.name}</h1>
      <p>Address: {provider.location}</p>

      <div style={{ marginTop: '2rem', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <MapDisplay 
          locationString={provider.location} 
          providerName={provider.name}
        />
      </div>
    </main>
  );
}
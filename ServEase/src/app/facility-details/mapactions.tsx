// app/providers/[id]/page.tsx
import { supabase } from '../lib/supabase/server';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the Client Component with SSR turned off
// We use useMemo in the component itself for client-side rendering, but for passing props from server to client, simple dynamic import is fine.
const MapDisplay = dynamic(() => import('./mapComponent'), {
  ssr: false,
  loading: () => <div style={{height: '500px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading map...</div>
});

// Define the props for our page component
interface ProviderPageProps {
  params: {
    id: string;
  };
}

// This is an async Server Component
export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = params;

  // Fetch data from Supabase on the server
  const { data: provider, error } = await supabase
    .from('service_providers')
    .select('name, location')
    .eq('id', id)
    .single(); // .single() fetches one row and returns null if not found

  // If there's an error or the provider is not found, show a 404 page
  if (error || !provider) {
    console.error('Error fetching provider or provider not found:', error);
    notFound();
  }

  // If the provider has no location, we can handle that gracefully
  if (!provider.location) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>{provider.name}</h1>
        <p>This provider has not specified a location.</p>
      </main>
    );
  }

  // The Server Component renders the Client Component, passing the data as props
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
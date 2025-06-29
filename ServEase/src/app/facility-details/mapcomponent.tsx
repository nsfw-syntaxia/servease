"use client"; 

import { FC, useEffect, useRef, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/map-component.module.css';

// Fix for default marker icon
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// --- Type Definitions ---
interface MapDisplayProps {
  locationString: string;
  providerName: string;
}

interface MapTilerFeature {
  center: [number, number]; // [longitude, latitude]
}

interface MapTilerGeocodingResult {
  features: MapTilerFeature[];
}

// --- Component Definition ---
const MapComponent: FC<MapDisplayProps> = ({ locationString, providerName }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // This effect runs once on the client to perform geocoding and initialize the map
    if (!locationString || !mapContainerRef.current) return;

    const geocodeAndInitializeMap = async () => {
      try {
        // 1. Geocode the address string to get coordinates
        const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
        const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(locationString)}.json?key=${apiKey}`;
        
        const response = await fetch(url);
        const data: MapTilerGeocodingResult = await response.json();

        if (!data.features || data.features.length === 0) {
          throw new Error('Location could not be found. Please check the address.');
        }

        const firstResult = data.features[0];
        const [lon, lat] = firstResult.center;
        const coordinates: LatLngExpression = [lat, lon];

        // 2. Initialize the map
        // Fix for the default marker icon
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: iconRetinaUrl.src,
          iconUrl: iconUrl.src,
          shadowUrl: shadowUrl.src,
        });
        
        // Ensure map is not already initialized
        if (mapRef.current) {
            mapRef.current.remove();
        }

        mapRef.current = L.map(mapContainerRef.current!).setView(coordinates, 15);

        L.tileLayer(
          `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`,
          {
            attribution:
              '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
          }
        ).addTo(mapRef.current);

        // 3. Add a marker
        L.marker(coordinates)
          .addTo(mapRef.current)
          .bindPopup(`<b>${providerName}</b><br>${locationString}`)
          .openPopup();
        
        setStatus('success');

      } catch (err: any) {
        console.error('Map initialization error:', err);
        setErrorMsg(err.message || 'An unknown error occurred.');
        setStatus('error');
      }
    };

    geocodeAndInitializeMap();
    
    // Cleanup function to destroy map instance when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locationString, providerName]); // Re-run effect if location or name changes

  return (
    <div className={styles.mapContainer}>
      {status === 'loading' && <div className={styles.overlay}>Loading map...</div>}
      {status === 'error' && <div className={styles.overlayError}>Error: {errorMsg}</div>}
      <div ref={mapContainerRef} className={styles.map}></div>
    </div>
  );
};

export default MapComponent;
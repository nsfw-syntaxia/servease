// app/facility/[id]/Map.tsx
"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as maptilersdk from '@maptiler/sdk';

// Fix for default Leaflet icon issue with Webpack
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});


// Define the props the Map component will accept
interface MapProps {
  address: string;
  facilityName: string;
}

const Map = ({ address, facilityName }: MapProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  // Your MapTiler API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  useEffect(() => {
    if (!address || !apiKey) {
        setLoading(false);
        return;
    };

    maptilersdk.config.apiKey = apiKey;

    const geocodeAddress = async () => {
      try {
        setLoading(true);
        const results = await maptilersdk.geocoding.forward(address, { limit: 1 });
        if (results.features.length > 0) {
          const { center } = results.features[0];
          setPosition([center[1], center[0]]); // Leaflet uses [lat, lng]
        } else {
            console.warn("Could not find coordinates for the address:", address);
            setPosition(null); // Handle case where address is not found
        }
      } catch (error) {
        console.error("Error during geocoding:", error);
        setPosition(null);
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [address, apiKey]);

  if (loading) {
    return <div className={styles.mapLoading}>Loading map...</div>;
  }

  if (!position) {
    return <div className={styles.mapError}>Could not load map for this address.</div>;
  }

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
        url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`}
      />
      <Marker position={position}>
        <Popup>
          {facilityName} <br /> {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// Styles for loading/error states (add to your CSS module)
const styles = {
    mapLoading: "flex items-center justify-center h-full w-full bg-gray-200 text-gray-600",
    mapError: "flex items-center justify-center h-full w-full bg-red-100 text-red-700 p-4",
};


export default Map;
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapProps {
  selectedProfile?: Profile;
}

const Map = ({ selectedProfile }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;

    console.log('Initializing map with token...');

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 2
      });

      setIsMapInitialized(true);
      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsMapInitialized(false);
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !selectedProfile || !isMapInitialized) return;

    console.log('Updating marker for profile:', selectedProfile);

    try {
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }

      // Add new marker
      marker.current = new mapboxgl.Marker()
        .setLngLat([selectedProfile.coordinates.lng, selectedProfile.coordinates.lat])
        .addTo(map.current);

      // Fly to location
      map.current.flyTo({
        center: [selectedProfile.coordinates.lng, selectedProfile.coordinates.lat],
        zoom: 14,
        essential: true
      });

      console.log('Marker updated successfully');
    } catch (error) {
      console.error('Error updating marker:', error);
    }
  }, [selectedProfile, isMapInitialized]);

  if (!isMapInitialized) {
    return (
      <div className="flex flex-col gap-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-600">
          Please enter your Mapbox token to initialize the map. 
          You can find your token in the Mapbox dashboard at https://mapbox.com/
        </p>
        <Input
          type="text"
          placeholder="Enter your Mapbox token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button onClick={initializeMap}>Initialize Map</Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default Map;
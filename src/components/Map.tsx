import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '@/lib/types';

// Set your Mapbox token here
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMxYzBtYnQwMGF4MnFxcTRoNjVqZm1qIn0.O2Y9sZnF-K1k_KhC8VZ9pg';

interface MapProps {
  selectedProfile?: Profile;
}

const Map = ({ selectedProfile }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log('Initializing map...');

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 2
      });

      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !selectedProfile) return;

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
  }, [selectedProfile]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default Map;
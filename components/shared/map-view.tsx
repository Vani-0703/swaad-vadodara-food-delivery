"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
  center: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  riderPosition?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

/**
 * Live order tracking map. Renders a real Google Map when
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is configured; otherwise falls back to a
 * styled placeholder so the page still looks intentional in local/dev use
 * without billing enabled.
 */
export function MapView({ center, destination, riderPosition, zoom = 14, className }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-mesh bg-ink-900 ${className}`}>
        <div className="glass-dark flex flex-col items-center gap-2 rounded-2xl px-6 py-5 text-center text-white">
          <Navigation className="h-8 w-8 text-turmeric-500" />
          <p className="text-sm font-semibold">Live map preview</p>
          <p className="max-w-[220px] text-xs text-white/60">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to see live rider tracking here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="swaad-tracking-map"
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI
          style={{ width: "100%", height: "100%" }}
        >
          {destination && (
            <AdvancedMarker position={destination}>
              <Pin background="#FF4757" borderColor="#C41E2E" glyphColor="#fff" />
            </AdvancedMarker>
          )}
          {riderPosition && (
            <AdvancedMarker position={riderPosition}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-spice text-white shadow-glow">
                <MapPin className="h-5 w-5" />
              </div>
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

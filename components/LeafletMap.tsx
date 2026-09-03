"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

interface MarkerData {
  id: string;
  price: string;
  lat: number;
  lng: number;
  title: string;
  beds: number;
  baths: number;
  sqft: number;
}

const AUSTIN_MARKERS: MarkerData[] = [
  {
    id: "1",
    price: "$825K",
    lat: 30.285,
    lng: -97.775,
    title: "1234 Maple Ridge Dr",
    beds: 4,
    baths: 3.5,
    sqft: 2850,
  },
  {
    id: "2",
    price: "$620K",
    lat: 30.270,
    lng: -97.752,
    title: "310 Bowie St, #2205",
    beds: 2,
    baths: 2,
    sqft: 1145,
  },
  {
    id: "3",
    price: "$545K",
    lat: 30.245,
    lng: -97.798,
    title: "8809 Summit Oaks Ln",
    beds: 3,
    baths: 2.5,
    sqft: 1780,
  },
  {
    id: "4",
    price: "$1.20M",
    lat: 30.231,
    lng: -97.772,
    title: "6701 Westview Dr",
    beds: 4,
    baths: 3,
    sqft: 2950,
  },
  {
    id: "5",
    price: "$745K",
    lat: 30.262,
    lng: -97.712,
    title: "4208 Eastside Ave",
    beds: 3,
    baths: 2,
    sqft: 1920,
  },
  {
    id: "6",
    price: "$1.05M",
    lat: 30.315,
    lng: -97.702,
    title: "1504 Crestview Blvd",
    beds: 4,
    baths: 3.5,
    sqft: 3100,
  },
  {
    id: "7",
    price: "$1.35M",
    lat: 30.222,
    lng: -97.705,
    title: "2810 River Crossing Way",
    beds: 5,
    baths: 4,
    sqft: 3600,
  },
];

interface LeafletMapProps {
  selectedHouseId?: string | null;
  onSelectHouse?: (id: string) => void;
}

export default function LeafletMap({
  selectedHouseId,
  onSelectHouse,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [searchAsMove, setSearchAsMove] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Initialize map instance centered on Austin, TX
      const map = L.map(mapContainerRef.current, {
        center: [30.2672, -97.7431],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Use clean light carto tiles matching the UI design
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Add markers
      AUSTIN_MARKERS.forEach((item) => {
        const isSelected = selectedHouseId === item.id;
        const iconHtml = `
          <div class="relative flex flex-col items-center group cursor-pointer">
            <div class="${
              isSelected
                ? "bg-[#d99738] text-white scale-110 ring-2 ring-white"
                : "bg-[#0A192F] text-white hover:bg-[#112d59]"
            } font-bold text-[11px] px-2.5 py-1 rounded-md shadow-lg border border-white/20 transition-all flex items-center justify-center whitespace-nowrap">
              ${item.price}
            </div>
            <div class="w-2 h-2 ${
              isSelected ? "bg-[#d99738]" : "bg-[#0A192F]"
            } rotate-45 -mt-1 shadow-sm"></div>
            <div class="w-1.5 h-1.5 rounded-full ${
              isSelected ? "bg-[#d99738]" : "bg-[#0A192F]"
            } mt-0.5"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-price-pin",
          iconSize: [60, 32],
          iconAnchor: [30, 32],
        });

        const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          if (onSelectHouse) {
            onSelectHouse(item.id);
          }
        });
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedHouseId, onSelectHouse]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-full overflow-hidden bg-slate-100">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left: Search as I move the map toggle */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200 px-3 py-2 flex items-center gap-2 select-none">
        <input
          type="checkbox"
          id="search-move"
          checked={searchAsMove}
          onChange={(e) => setSearchAsMove(e.target.checked)}
          className="w-4 h-4 rounded text-[#0A192F] focus:ring-[#0A192F] accent-[#0A192F] cursor-pointer"
        />
        <label
          htmlFor="search-move"
          className="text-xs font-semibold text-slate-800 cursor-pointer"
        >
          Search as I move the map
        </label>
      </div>

      {/* Top Right: Zoom in / Zoom out controls */}
      <div className="absolute top-4 right-4 z-[400] bg-white rounded-lg shadow-md border border-slate-200 flex flex-col divide-y divide-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer"
          aria-label="Zoom out"
        >
          &minus;
        </button>
      </div>

      {/* Bottom Right: Draw Search Area floating button */}
      <div className="absolute bottom-6 right-6 z-[400]">
        <button
          type="button"
          className="bg-white hover:bg-slate-50 text-[#0a192f] text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2.5 transition duration-150 cursor-pointer"
        >
          <div className="relative w-4 h-4">
            <Image
              src="/icons/search-house/draw-search-area-icon.png"
              alt="Draw Search Area"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <span>Draw Search Area</span>
        </button>
      </div>
    </div>
  );
}

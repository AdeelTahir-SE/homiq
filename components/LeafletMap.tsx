"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface MarkerData {
  id: string;
  price: string;
  lat: number;
  lng: number;
  title: string;
}

const AUSTIN_MARKERS: MarkerData[] = [
  { id: "1", price: "$825K", lat: 30.285, lng: -97.775, title: "1234 Maple Ridge Dr" },
  { id: "2", price: "$620K", lat: 30.270, lng: -97.752, title: "310 Bowie St, #2205" },
  { id: "3", price: "$545K", lat: 30.245, lng: -97.798, title: "8809 Summit Oaks Ln" },
  { id: "4", price: "$1.20M", lat: 30.231, lng: -97.772, title: "6701 Westview Dr" },
  { id: "5", price: "$745K", lat: 30.262, lng: -97.712, title: "4208 Eastside Ave" },
  { id: "6", price: "$1.05M", lat: 30.315, lng: -97.702, title: "1504 Crestview Blvd" },
  { id: "7", price: "$1.35M", lat: 30.222, lng: -97.705, title: "2810 River Crossing Way" },
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
  const leafletModuleRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [searchAsMove, setSearchAsMove] = useState(true);

  // Initialize map once on mount
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;
      leafletModuleRef.current = L;

      if (!isMounted || !mapContainerRef.current) return;

      // Create Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [30.2672, -97.7431],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add Carto Voyager light tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Create and store markers
      AUSTIN_MARKERS.forEach((item) => {
        const isSelected = selectedHouseId === item.id;
        const icon = createPriceIcon(L, item.price, isSelected);
        const marker = L.marker([item.lat, item.lng], { icon }).addTo(map);

        marker.on("click", () => {
          if (onSelectHouse) {
            onSelectHouse(item.id);
          }
        });

        markersRef.current[item.id] = marker;
      });

      // Force recalculation of container size after mounting
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);
    }

    initMap();

    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker icons when selectedHouseId changes
  useEffect(() => {
    const L = leafletModuleRef.current;
    if (!L || !mapInstanceRef.current) return;

    AUSTIN_MARKERS.forEach((item) => {
      const marker = markersRef.current[item.id];
      if (marker) {
        const isSelected = selectedHouseId === item.id;
        marker.setIcon(createPriceIcon(L, item.price, isSelected));
        if (isSelected) {
          marker.setZIndexOffset(1000);
        } else {
          marker.setZIndexOffset(0);
        }
      }
    });
  }, [selectedHouseId]);

  function createPriceIcon(L: any, price: string, isSelected: boolean) {
    const html = `
      <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
        <div style="
          background-color: ${isSelected ? "#d99738" : "#0A192F"};
          color: #ffffff;
          font-weight: 700;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255,255,255,0.4);
          white-space: nowrap;
          transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
          transition: all 0.15s ease;
        ">
          ${price}
        </div>
        <div style="
          width: 8px;
          height: 8px;
          background-color: ${isSelected ? "#d99738" : "#0A192F"};
          transform: rotate(45deg);
          margin-top: -4px;
        "></div>
        <div style="
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: ${isSelected ? "#d99738" : "#0A192F"};
          margin-top: 2px;
        "></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: "custom-leaflet-price-pin",
      iconSize: [60, 34],
      iconAnchor: [30, 34],
    });
  }

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
    <div className="relative w-full h-full min-h-[500px] lg:min-h-full overflow-hidden bg-slate-100 flex-1">
      {/* Leaflet map canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[500px] lg:min-h-full absolute inset-0 z-0"
        style={{ height: "100%", width: "100%" }}
      />

      {/* Top Left: Search as I move the map toggle */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200 px-3 py-2 flex items-center gap-2 select-none">
        <input
          type="checkbox"
          id="search-move-input"
          checked={searchAsMove}
          onChange={(e) => setSearchAsMove(e.target.checked)}
          className="w-4 h-4 rounded text-[#0A192F] focus:ring-[#0A192F] accent-[#0A192F] cursor-pointer"
        />
        <label
          htmlFor="search-move-input"
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
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer select-none"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer select-none"
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

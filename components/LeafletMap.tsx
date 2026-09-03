"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Polyline,
  CircleMarker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

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

function createPriceIcon(price: string, isSelected: boolean) {
  return L.divIcon({
    html: `
      <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
        <div style="
          background-color: ${isSelected ? "#d99738" : "#0A192F"};
          color: #ffffff;
          font-weight: 700;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.25);
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
    `,
    className: "custom-leaflet-price-pin",
    iconSize: [60, 34],
    iconAnchor: [30, 34],
  });
}

function CustomMapControls() {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md border border-slate-200 flex flex-col divide-y divide-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer select-none"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition font-bold text-lg cursor-pointer select-none"
        aria-label="Zoom out"
      >
        &minus;
      </button>
    </div>
  );
}

function MapDrawingEvents({
  isDrawingMode,
  onAddPoint,
}: {
  isDrawingMode: boolean;
  onAddPoint: (point: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      if (isDrawingMode) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
}

interface LeafletMapProps {
  selectedHouseId?: string | null;
  onSelectHouse?: (id: string) => void;
}

export default function LeafletMap({
  selectedHouseId,
  onSelectHouse,
}: LeafletMapProps) {
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);

  const handleAddPoint = useCallback((point: [number, number]) => {
    setDrawnPoints((prev) => [...prev, point]);
  }, []);

  const handleToggleDraw = () => {
    if (!isDrawingMode && drawnPoints.length === 0) {
      // Start fresh drawing mode
      setIsDrawingMode(true);
    } else if (isDrawingMode) {
      setIsDrawingMode(false);
    } else {
      setIsDrawingMode(true);
    }
  };

  const handleClearDrawing = () => {
    setDrawnPoints([]);
  };

  const handleLoadSampleBoundary = () => {
    // Sample custom search area around Central/Downtown Austin
    setDrawnPoints([
      [30.295, -97.785],
      [30.302, -97.720],
      [30.245, -97.705],
      [30.230, -97.770],
    ]);
  };

  return (
    <div className={`relative w-full h-full flex-1 overflow-hidden bg-slate-100 ${isDrawingMode ? "cursor-crosshair" : ""}`}>
      {/* React Leaflet Map Container */}
      <MapContainer
        center={[30.2672, -97.7431]}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full z-0"
        style={{ height: "100%", width: "100%", position: "absolute", inset: 0 }}
      >
        {/* Carto Voyager Light Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Custom Zoom Controls inside map context */}
        <CustomMapControls />

        {/* Drawing Events Handler */}
        <MapDrawingEvents isDrawingMode={isDrawingMode} onAddPoint={handleAddPoint} />

        {/* Render Drawn Shape (Polygon when >= 3 points, Polyline when 2 points) */}
        {drawnPoints.length >= 3 && (
          <Polygon
            positions={drawnPoints}
            pathOptions={{
              color: "#0D2349",
              fillColor: "#0D2349",
              fillOpacity: 0.18,
              weight: 2.5,
              dashArray: isDrawingMode ? "6, 6" : undefined,
            }}
          />
        )}

        {drawnPoints.length === 2 && (
          <Polyline
            positions={drawnPoints}
            pathOptions={{
              color: "#0D2349",
              weight: 2.5,
              dashArray: "6, 6",
            }}
          />
        )}

        {/* Vertex Marker Points during drawing */}
        {drawnPoints.map((point, index) => (
          <CircleMarker
            key={`vertex-${index}`}
            center={point}
            radius={index === 0 ? 6 : 4.5}
            pathOptions={{
              color: "#ffffff",
              fillColor: index === 0 ? "#d99738" : "#0D2349",
              fillOpacity: 1,
              weight: 2,
            }}
          />
        ))}

        {/* Dynamic Markers */}
        {AUSTIN_MARKERS.map((item) => {
          const isSelected = selectedHouseId === item.id;
          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={createPriceIcon(item.price, isSelected)}
              eventHandlers={{
                click: () => {
                  if (onSelectHouse) {
                    onSelectHouse(item.id);
                  }
                },
              }}
            />
          );
        })}
      </MapContainer>

      {/* Top Left: Search as I move the map toggle */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200 px-3 py-2 flex items-center gap-2 select-none">
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

      {/* Bottom Floating Drawing Controls (Unified at the bottom right) */}
      <div
        className={`absolute ${
          selectedHouseId ? "bottom-48 md:bottom-6" : "bottom-20 md:bottom-6"
        } right-3 sm:right-4 md:right-6 z-[900] transition-all duration-200`}
      >
        {isDrawingMode ? (
          /* Active Drawing Mode Toolbar */
          <div className="bg-[#0D2349] text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 max-w-[92vw] sm:max-w-md animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 px-1">
              <span className="w-2 h-2 rounded-full bg-[#d99738] animate-pulse flex-shrink-0" />
              <div className="text-xs text-slate-200">
                <p className="font-semibold text-white">
                  {drawnPoints.length === 0
                    ? "Click on map to place boundary points"
                    : drawnPoints.length < 3
                    ? `Click ${3 - drawnPoints.length} more point${3 - drawnPoints.length > 1 ? "s" : ""} to close`
                    : `Custom area (${drawnPoints.length} points)`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t border-white/10 sm:border-t-0">
              {drawnPoints.length === 0 ? (
                <button
                  type="button"
                  onClick={handleLoadSampleBoundary}
                  className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap"
                >
                  Sample Area
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClearDrawing}
                  className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap"
                >
                  Clear
                </button>
              )}

              {drawnPoints.length >= 3 && (
                <button
                  type="button"
                  onClick={() => setIsDrawingMode(false)}
                  className="px-3.5 py-1.5 bg-[#d99738] hover:bg-[#c5852b] text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer whitespace-nowrap"
                >
                  Apply Area
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsDrawingMode(false);
                  if (drawnPoints.length < 3) setDrawnPoints([]);
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                aria-label="Cancel drawing"
                title="Cancel"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : drawnPoints.length >= 3 ? (
          /* Area Applied State */
          <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 flex items-center p-1 gap-1">
            <button
              type="button"
              onClick={() => setIsDrawingMode(true)}
              className="bg-[#0D2349] hover:bg-[#071933] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5 text-[#d99738]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Edit Area</span>
            </button>

            <button
              type="button"
              onClick={handleClearDrawing}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold px-2.5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1"
              title="Clear custom area"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear</span>
            </button>
          </div>
        ) : (
          /* Default Button - Original Design */
          <button
            type="button"
            onClick={handleToggleDraw}
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
        )}
      </div>
    </div>
  );
}

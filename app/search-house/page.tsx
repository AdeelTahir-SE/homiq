"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

interface PropertyItem {
  id: string;
  badge?: { text: string; type: "new" | "open" | "drop" };
  title: string;
  cityZip: string;
  price: string;
  oldPrice?: string;
  beds: number;
  baths: number;
  sqft: string;
  propertyType: string;
  listedTime: string;
  agent: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: "1",
    badge: { text: "New", type: "new" },
    title: "1234 Maple Ridge Dr",
    cityZip: "Austin, TX 78746",
    price: "$825,000",
    beds: 4,
    baths: 3.5,
    sqft: "2,850",
    propertyType: "Single Family Home",
    listedTime: "Listed 2 hours ago",
    agent: "Emma Clark",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "2",
    badge: { text: "Open House", type: "open" },
    title: "310 Bowie St, #2205",
    cityZip: "Austin, TX 78703",
    price: "$620,000",
    beds: 2,
    baths: 2,
    sqft: "1,145",
    propertyType: "Condominium",
    listedTime: "Listed 1 day ago",
    agent: "Michael Torres",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "3",
    badge: { text: "Price Drop", type: "drop" },
    title: "8809 Summit Oaks Ln",
    cityZip: "Austin, TX 78759",
    price: "$545,000",
    oldPrice: "$575,000",
    beds: 3,
    baths: 2.5,
    sqft: "1,780",
    propertyType: "Townhouse",
    listedTime: "Listed 3 days ago",
    agent: "Sarah Nguyen",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "4",
    title: "6701 Westview Dr",
    cityZip: "Austin, TX 78731",
    price: "$1,195,000",
    beds: 4,
    baths: 3,
    sqft: "2,950",
    propertyType: "Single Family Home",
    listedTime: "Listed 3 days ago",
    agent: "Sarah Nguyen",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
];

export default function SearchHousePage() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("all");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBaths, setSelectedBaths] = useState("Any");
  const [minPrice, setMinPrice] = useState(250000);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [locationQuery, setLocationQuery] = useState("Austin, TX");
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);
  const [isSaved, setIsSaved] = useState(false);

  // Accordion filters open/close state
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Active filter tags
  const [activeTags, setActiveTags] = useState<string[]>([
    "Austin, TX",
    "$250K - $2M+",
    "House, Condo, Townhome",
    "3+ Beds",
  ]);

  const toggleFavorite = (id: string) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const removeTag = (tag: string) => {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/components/LeafletMap"), {
        loading: () => (
          <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-50 text-slate-400 font-medium">
            Loading interactive map...
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a192f]">
      {/* 1. Global Navigation Bar */}
      <Navbar activeTab="Buy" />

      {/* 2. Main 3-Column Split Content Layout */}
      <div className="flex-1 flex flex-row min-h-0 w-full" style={{ height: 'calc(100vh - 64px)' }}>
        {/* ========================================================= */}
        {/* LEFT COLUMN: FILTERS SIDEBAR (~260px) - Fixed to bottom */}
        {/* ========================================================= */}
        <aside className="w-[250px] xl:w-[265px] flex-shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
          <div className="p-4 space-y-4 flex-1 overflow-y-auto min-h-0">
            {/* Location Input */}
            <div>
              <label className="text-xs font-bold text-[#0a192f] block mb-1.5">
                Location
              </label>
              <div className="relative flex items-center border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus-within:border-[#0a192f] focus-within:ring-1 focus-within:ring-[#0a192f] transition">
                <div className="relative w-3.5 h-3.5 mr-2 text-slate-400 flex-shrink-0">
                  <Image
                    src="/icons/search-house/location-icon.png"
                    alt="Location Pin"
                    fill
                    sizes="14px"
                    className="object-contain"
                  />
                </div>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, neighborhood, or ZIP"
                  className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#0a192f]">
                  Price Range
                </span>
              </div>

              {/* Slider Representation matching design */}
              <div className="px-1.5 py-2.5">
                <div className="relative flex items-center w-full">
                  <div className="h-[2px] bg-[#d99738] rounded-full w-full" />
                  <div className="absolute left-0 w-3 h-3 bg-white border border-[#d99738] rounded-full shadow-sm cursor-pointer -translate-x-1/2" />
                  <div className="absolute right-0 w-3 h-3 bg-white border border-[#d99738] rounded-full shadow-sm cursor-pointer translate-x-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span>$250,000</span>
                <span>$2,000,000+</span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#0a192f]">
                  Property Type
                </span>
                <button
                  type="button"
                  className="text-[11px] font-medium text-slate-500 hover:text-[#0a192f] transition cursor-pointer"
                >
                  See all
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {/* All Types */}
                <button
                  type="button"
                  onClick={() => setSelectedPropertyType("all")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-md border text-center transition cursor-pointer ${
                    selectedPropertyType === "all"
                      ? "border-[#d99738] bg-[#fffdf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-5 h-5 mb-1">
                    <Image
                      src="/icons/search-house/all-types-icon.png"
                      alt="All Types"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0a192f] leading-tight">
                    All Types
                  </span>
                </button>

                {/* House */}
                <button
                  type="button"
                  onClick={() => setSelectedPropertyType("house")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-md border text-center transition cursor-pointer ${
                    selectedPropertyType === "house"
                      ? "border-[#d99738] bg-[#fffdf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-5 h-5 mb-1">
                    <Image
                      src="/icons/search-house/house-icon.png"
                      alt="House"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0a192f] leading-tight">
                    House
                  </span>
                </button>

                {/* Condo */}
                <button
                  type="button"
                  onClick={() => setSelectedPropertyType("condo")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-md border text-center transition cursor-pointer ${
                    selectedPropertyType === "condo"
                      ? "border-[#d99738] bg-[#fffdf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-5 h-5 mb-1">
                    <Image
                      src="/icons/search-house/condo-icon.png"
                      alt="Condo"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0a192f] leading-tight">
                    Condo
                  </span>
                </button>

                {/* Townhome */}
                <button
                  type="button"
                  onClick={() => setSelectedPropertyType("townhome")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-md border text-center transition cursor-pointer ${
                    selectedPropertyType === "townhome"
                      ? "border-[#d99738] bg-[#fffdf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-5 h-5 mb-1">
                    <Image
                      src="/icons/search-house/townhouse-icon.png"
                      alt="Townhome"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0a192f] leading-tight">
                    Townhome
                  </span>
                </button>
              </div>
            </div>

            {/* Beds */}
            <div>
              <span className="text-xs font-bold text-[#0a192f] block mb-1.5">
                Beds
              </span>
              <div className="grid grid-cols-5 gap-1">
                {["Any", "1+", "2+", "3+", "4+"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedBeds(option)}
                    className={`h-7 text-[11px] font-semibold rounded-md border text-center transition cursor-pointer flex items-center justify-center ${
                      selectedBeds === option
                        ? "border-[#d99738] bg-[#fffdf7] text-[#0a192f] ring-1 ring-[#d99738]"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Baths */}
            <div>
              <span className="text-xs font-bold text-[#0a192f] block mb-1.5">
                Baths
              </span>
              <div className="grid grid-cols-5 gap-1">
                {["Any", "1+", "2+", "3+", "4+"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedBaths(option)}
                    className={`h-7 text-[11px] font-semibold rounded-md border text-center transition cursor-pointer flex items-center justify-center ${
                      selectedBaths === option
                        ? "border-[#d99738] bg-[#fffdf7] text-[#0a192f] ring-1 ring-[#d99738]"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* More Filters Accordions */}
            <div className="pt-1 border-t border-slate-100">
              <span className="text-xs font-bold text-[#0a192f] block mb-2">
                More Filters
              </span>

              <div className="space-y-1">
                {["Square Footage", "Year Built", "Amenities", "Availability"].map(
                  (filter) => (
                    <div
                      key={filter}
                      className="border-b border-slate-100 pb-1"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(filter)}
                        className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-700 hover:text-[#0a192f] transition cursor-pointer py-1.5"
                      >
                        <span>{filter}</span>
                        <svg
                          className={`w-3 h-3 text-slate-400 transition-transform ${
                            openAccordion === filter ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {openAccordion === filter && (
                        <div className="py-1 text-[10px] text-slate-500">
                          Configure {filter.toLowerCase()} preferences.
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bottom Sidebar Action Buttons - Fixed at bottom */}
          <div className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={clearAllTags}
              className="px-3 py-2 text-[11px] font-medium text-slate-700 hover:text-[#0a192f] border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
            >
              Clear All
            </button>
            <button
              type="button"
              className="flex-1 bg-[#0A192F] hover:bg-[#071325] text-white text-[11px] font-semibold py-2 px-3 rounded-lg shadow transition duration-150 cursor-pointer text-center"
            >
              Show 128 Results
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT MAIN CONTENT AREA: FULL WIDTH TOP BAR + SPLIT VIEW */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
          {/* Top Full-Width Results Header & Filter Tags Bar */}
          <div className="px-6 py-4 border-b border-slate-100 flex-shrink-0 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0a192f] tracking-tight">
                  Homes for Sale
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">128 results</p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg py-2 px-3.5 pr-8 appearance-none outline-none cursor-pointer shadow-sm hover:border-slate-300">
                    <option>Sort by: Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Square Feet</option>
                  </select>
                  <svg
                    className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Save Search Button */}
                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className="bg-[#0A192F] hover:bg-[#071325] text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition duration-150 cursor-pointer flex-shrink-0"
                >
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill={isSaved ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <span>{isSaved ? "Saved" : "Save Search"}</span>
                </button>
              </div>
            </div>

            {/* Active Filter Tags Bar (#FDF4E1 background, no border) */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-[#FDF4E1] text-[#7d5312] text-xs font-medium px-3 py-1.5 rounded-full select-none"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-[#7d5312]/70 hover:text-[#7d5312] cursor-pointer leading-none ml-0.5"
                    aria-label={`Remove filter ${tag}`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}

              {activeTags.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllTags}
                  className="text-xs font-bold text-[#d99738] hover:underline ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Split Content: Property Cards List on Left + Map on Right */}
          <div className="flex-1 flex flex-row min-h-0 w-full">
            {/* Property Cards Column - THE ONLY SCROLLABLE AREA */}
            <div className="w-[470px] xl:w-[500px] flex-shrink-0 border-r border-slate-200 bg-white h-full overflow-y-auto p-4 space-y-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {properties.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedHouseId(item.id)}
                  className={`bg-white rounded-xl border p-2.5 flex flex-row gap-3.5 items-stretch transition-all duration-150 cursor-pointer relative ${
                    selectedHouseId === item.id
                      ? "border-[#0a192f] ring-1 ring-[#0a192f]/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Image Container on Left */}
                  <div className="relative w-[170px] sm:w-[185px] min-h-[140px] flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 170px, 185px"
                      className="object-cover"
                    />

                    {/* Status Badge */}
                    {item.badge && (
                      <div className="absolute top-2 left-2 z-10">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded text-white shadow-sm ${
                            item.badge.type === "new"
                              ? "bg-[#0A192F]"
                              : item.badge.type === "open"
                              ? "bg-[#059669]"
                              : "bg-[#d99738]"
                          }`}
                        >
                          {item.badge.text}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Container on Right */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                    {/* Address */}
                    <div>
                      <h3 className="text-sm font-bold text-[#0a192f] leading-snug truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {item.cityZip}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-1">
                      <span className="text-base font-black text-[#0a192f]">
                        {item.price}
                      </span>
                      {item.oldPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Spec Row (Beds, Baths, Sqft) */}
                    <div className="flex items-center gap-3.5 text-xs font-semibold text-slate-600 mt-1.5">
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/bed-icon.png"
                            alt="Beds"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span>{item.beds} bd</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/bathtub-icon.png"
                            alt="Baths"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span>{item.baths} ba</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/sqft-icon.png"
                            alt="Square Feet"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span>{item.sqft} sqft</span>
                      </div>
                    </div>

                    {/* Property Type */}
                    <p className="text-xs text-slate-500 mt-1.5">
                      {item.propertyType}
                    </p>

                    {/* Footer Timestamp & Agent */}
                    <div className="text-[11px] text-slate-400 mt-1.5">
                      <span>{item.listedTime}  ·  By </span>
                      <span className="text-[#d99738] font-semibold">
                        {item.agent}
                      </span>
                    </div>
                  </div>

                  {/* Favorite Heart Outline Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 transition cursor-pointer"
                    aria-label="Favorite property"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        item.isFavorite
                          ? "fill-red-500 text-red-500"
                          : "fill-none text-slate-500 hover:text-slate-700"
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Interactive Leaflet Map on Right - STRETCHES FULLY */}
            <div className="flex-1 min-w-0 min-h-[500px] relative bg-slate-100">
              <LeafletMap
                selectedHouseId={selectedHouseId}
                onSelectHouse={(id) => setSelectedHouseId(id)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

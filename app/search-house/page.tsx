"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>("1");
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);
  const [isSaved, setIsSaved] = useState(false);

  // Responsive & view switcher states
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "map">("list");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

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

  const selectedProperty = useMemo(
    () => (selectedHouseId ? properties.find((p) => p.id === selectedHouseId) || null : null),
    [properties, selectedHouseId]
  );

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/components/LeafletMap"), {
        loading: () => (
          <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-slate-50 text-slate-400 font-medium">
            Loading interactive map...
          </div>
        ),
        ssr: false,
      }),
    []
  );

  // Reusable Filter Sidebar Content Component
  const renderFilterContent = (onClose?: () => void) => (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4 flex-1 overflow-y-auto min-h-0">
        {/* Location Input */}
        <div>
          <label className="text-xs font-bold text-[#0C2346] block mb-1.5">
            Location
          </label>
          <div className="relative flex items-center border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus-within:border-[#0C2346] focus-within:ring-1 focus-within:ring-[#0C2346] transition">
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
            <span className="text-xs font-bold text-[#0C2346]">
              Price Range
            </span>
          </div>

          {/* Slider Representation */}
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
            <span className="text-xs font-bold text-[#0C2346]">
              Property Type
            </span>
            <button
              type="button"
              className="text-[11px] font-medium text-slate-500 hover:text-[#0C2346] transition cursor-pointer"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {/* All Types */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType("all")}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-center transition cursor-pointer ${
                selectedPropertyType === "all"
                  ? "border-[#d99738] bg-[#fffdf7]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="relative w-5 h-5 mb-1">
                <Image
                  src="/icons/search-house/all-types-icon.png"
                  alt="All Types"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-bold text-[#0C2346] leading-tight">
                All Types
              </span>
            </button>

            {/* House */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType("house")}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-center transition cursor-pointer ${
                selectedPropertyType === "house"
                  ? "border-[#d99738] bg-[#fffdf7]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="relative w-5 h-5 mb-1">
                <Image
                  src="/icons/search-house/house-icon.png"
                  alt="House"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-bold text-[#0C2346] leading-tight">
                House
              </span>
            </button>

            {/* Condo */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType("condo")}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-center transition cursor-pointer ${
                selectedPropertyType === "condo"
                  ? "border-[#d99738] bg-[#fffdf7]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="relative w-5 h-5 mb-1">
                <Image
                  src="/icons/search-house/condo-icon.png"
                  alt="Condo"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-bold text-[#0C2346] leading-tight">
                Condo
              </span>
            </button>

            {/* Townhome */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType("townhome")}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-center transition cursor-pointer ${
                selectedPropertyType === "townhome"
                  ? "border-[#d99738] bg-[#fffdf7]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="relative w-5 h-5 mb-1">
                <Image
                  src="/icons/search-house/townhouse-icon.png"
                  alt="Townhome"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-bold text-[#0C2346] leading-tight">
                Townhome
              </span>
            </button>
          </div>
        </div>

        {/* Beds */}
        <div>
          <span className="text-xs font-bold text-[#0C2346] block mb-1.5">
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
                    ? "border-[#d99738] bg-[#fffdf7] text-[#0C2346]"
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
          <span className="text-xs font-bold text-[#0C2346] block mb-1.5">
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
                    ? "border-[#d99738] bg-[#fffdf7] text-[#0C2346]"
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
          <span className="text-xs font-bold text-[#0C2346] block mb-2">
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
                    className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-700 hover:text-[#0C2346] transition cursor-pointer py-1.5"
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

      {/* Bottom Sidebar Action Buttons */}
      <div className="p-3.5 bg-white flex items-center gap-2.5 flex-shrink-0 border-t border-slate-100">
        <button
          type="button"
          onClick={clearAllTags}
          className="px-3 py-2 text-[11px] font-medium text-slate-700 hover:text-[#0C2346] border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="flex-1 bg-[#0C2346] hover:bg-[#091b37] text-white text-[11px] font-semibold py-2 px-3 rounded-lg shadow transition duration-150 cursor-pointer text-center"
        >
          Show 128 Results
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0C2346]">
      {/* 1. Global Navigation Bar */}
      <Navbar activeTab="Buy" />

      {/* 2. Main Layout Container */}
      <div className="flex-1 flex flex-row min-h-0 w-full relative" style={{ height: 'calc(100vh - 64px)' }}>
        {/* ========================================================= */}
        {/* DESKTOP LEFT COLUMN: FILTERS SIDEBAR (>= 1024px) */}
        {/* ========================================================= */}
        <aside className="hidden lg:flex w-[250px] xl:w-[265px] flex-shrink-0 border-r border-slate-200 bg-white flex-col overflow-hidden">
          {renderFilterContent()}
        </aside>

        {/* ========================================================= */}
        {/* MOBILE & TABLET SLIDE-OVER FILTER DRAWER (< 1024px) */}
        {/* ========================================================= */}
        {isFilterDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsFilterDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[#0C2346]">Filter Properties</h2>
                  <span className="text-[10px] font-semibold bg-[#d99738]/15 text-[#d99738] px-2 py-0.5 rounded-full">
                    {activeTags.length} Active
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Filter Content */}
              <div className="flex-1 overflow-hidden">
                {renderFilterContent(() => setIsFilterDrawerOpen(false))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN CONTENT AREA: HEADER + (CARDS LIST / MAP) */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white relative">
          {/* Top Full-Width Results Header & Filter Tags Bar */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex-shrink-0 bg-white border-b border-slate-100 lg:border-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Title & Count */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-[#0C2346] tracking-tight">
                    Homes for Sale
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">128 results</p>
                </div>

                {/* Filter Trigger Button for Mobile & Tablet (< 1024px) */}
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-[#0C2346] hover:bg-slate-50 shadow-xs transition cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#d99738]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Filters</span>
                  {activeTags.length > 0 && (
                    <span className="w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center ml-0.5">
                      {activeTags.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Controls: Sort Dropdown & Save Search Button */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="relative flex-1 sm:flex-initial">
                  <select className="w-full sm:w-auto text-xs font-semibold text-[#0C2346] bg-white border border-slate-200 rounded-lg py-2.5 pl-3 sm:pl-4 pr-9 sm:pr-10 appearance-none outline-none cursor-pointer shadow-sm hover:border-slate-300">
                    <option>Sort by: Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Square Feet</option>
                  </select>
                  <svg
                    className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3.5 pointer-events-none"
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
                  className="bg-[#0C2346] hover:bg-[#091b37] text-white text-xs font-semibold py-2.5 px-4 sm:px-6 rounded-lg flex items-center gap-2 shadow-sm transition duration-150 cursor-pointer flex-shrink-0"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="hidden xs:inline">{isSaved ? "Saved" : "Save Search"}</span>
                </button>
              </div>
            </div>

            {/* Active Filter Tags Bar (Scrollable on small mobile screens) */}
            <div className="flex items-center gap-2 mt-3 pt-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-[#FDF4E1] text-[#7d5312] text-xs font-medium px-3 py-1.5 rounded-md select-none flex-shrink-0"
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
                  className="text-xs font-bold text-[#d99738] hover:underline ml-1 cursor-pointer flex-shrink-0"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Split Content Area: Property Cards Column + Interactive Map */}
          <div className="flex-1 flex flex-row min-h-0 w-full relative">
            {/* ========================================================= */}
            {/* PROPERTY CARDS COLUMN */}
            {/* Mobile: visible when mobileViewMode === 'list' */}
            {/* Tablet: taking ~45-48% width */}
            {/* Desktop: taking 470px - 500px */}
            {/* ========================================================= */}
            <div
              className={`
                ${mobileViewMode === "list" ? "flex" : "hidden"}
                md:flex flex-col
                w-full md:w-[380px] lg:w-[470px] xl:w-[500px]
                flex-shrink-0 bg-white h-full overflow-y-auto px-3 sm:px-4 space-y-3.5
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-20 md:pb-4
              `}
            >
              {properties.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedHouseId(item.id)}
                  className={`bg-white rounded-xl border p-2.5 sm:p-3 flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-stretch transition-all duration-150 cursor-pointer relative ${
                    selectedHouseId === item.id
                      ? "border-[#0C2346] ring-1 ring-[#0C2346]/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative w-full sm:w-[170px] lg:w-[185px] h-[180px] sm:h-auto sm:min-h-[140px] flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 170px, 185px"
                      className="object-cover"
                    />

                    {/* Status Badge */}
                    {item.badge && (
                      <div className="absolute top-2 left-2 z-10">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded text-white shadow-sm ${
                            item.badge.type === "new"
                              ? "bg-[#0C2346]"
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

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                    {/* Address */}
                    <div>
                      <Link
                        href="/house-detail"
                        className="text-sm font-bold text-[#0C2346] hover:text-[#d99738] leading-snug truncate block transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {item.cityZip}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-1">
                      <span className="text-base font-black text-[#0C2346]">
                        {item.price}
                      </span>
                      {item.oldPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Spec Row (Beds, Baths, Sqft) */}
                    <div className="flex items-center gap-3 sm:gap-3.5 text-xs font-semibold text-slate-600 mt-1.5 flex-wrap">
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
                    <div className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
                      <span>{item.listedTime}</span>
                      <span className="text-[#d99738] font-semibold truncate ml-2">
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
                    className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-500 transition cursor-pointer"
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

            {/* ========================================================= */}
            {/* INTERACTIVE LEAFLET MAP */}
            {/* Mobile: visible when mobileViewMode === 'map' */}
            {/* Tablet & Desktop: fills the remainder of the right area */}
            {/* ========================================================= */}
            <div
              className={`
                ${mobileViewMode === "map" ? "flex" : "hidden"}
                md:flex flex-1 min-w-0 h-full relative bg-slate-100
              `}
            >
              <LeafletMap
                selectedHouseId={selectedHouseId}
                onSelectHouse={(id) => setSelectedHouseId(id)}
              />

              {/* Mobile Selected Property Floating Preview Card (over map) */}
              {mobileViewMode === "map" && selectedProperty && (
                <div className="md:hidden absolute bottom-20 left-4 right-4 z-[1000] bg-white rounded-xl shadow-xl border border-slate-200 p-3 flex gap-3 items-center animate-in slide-in-from-bottom-3 duration-150">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#0C2346]">
                        {selectedProperty.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedHouseId(null)}
                        className="text-slate-400 hover:text-slate-700 p-1.5 -mr-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
                        aria-label="Close preview"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <Link
                      href="/house-detail"
                      className="text-xs font-bold text-[#0C2346] hover:text-[#d99738] truncate block"
                    >
                      {selectedProperty.title}
                    </Link>
                    <p className="text-[11px] text-slate-500 truncate">
                      {selectedProperty.beds} bd · {selectedProperty.baths} ba · {selectedProperty.sqft} sqft
                    </p>
                    <Link
                      href="/house-detail"
                      className="text-[11px] font-bold text-[#d99738] hover:underline mt-1 inline-block"
                    >
                      View House Details &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================= */}
            {/* FLOATING MOBILE VIEW SWITCHER (List vs Map) (< 768px) */}
            {/* ========================================================= */}
            <div className="md:hidden fixed bottom-5 left-1/2 -translate-y-0 -translate-x-1/2 z-30 shadow-xl rounded-full bg-[#0C2346] text-white p-1 flex items-center border border-white/20">
              <button
                type="button"
                onClick={() => setMobileViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  mobileViewMode === "list"
                    ? "bg-[#d99738] text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>List</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileViewMode("map")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  mobileViewMode === "map"
                    ? "bg-[#d99738] text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Map</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


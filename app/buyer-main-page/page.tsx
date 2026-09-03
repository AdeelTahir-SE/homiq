"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface SavedProperty {
  id: string;
  title: string;
  cityZip: string;
  price: string;
  beds: number;
  baths: number | string;
  sqft: string;
  tag: "For Sale" | "Condo" | "For Rent";
  tagColor: "green" | "gold" | "blue";
  savedTime: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface SavedSearch {
  id: string;
  title: string;
  criteria: string;
  matchesCount: string;
  timestamp: string;
  iconType: "house" | "condo" | "key";
  enabled: boolean;
}

interface RecommendedProperty {
  id: string;
  title: string;
  cityZip: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface TourItem {
  id: string;
  month: string;
  day: string;
  dayOfWeek: string;
  title: string;
  cityZip: string;
  dateStr: string;
  timeStr: string;
  imageUrl: string;
  status: string;
}

const INITIAL_SAVED_PROPERTIES: SavedProperty[] = [
  {
    id: "prop-1",
    title: "1234 Maple Ridge Dr",
    cityZip: "Austin, TX 78746",
    price: "$825,000",
    beds: 4,
    baths: 3.5,
    sqft: "2,850 sqft",
    tag: "For Sale",
    tagColor: "green",
    savedTime: "Saved 2 days ago",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    isFavorite: true,
  },
  {
    id: "prop-2",
    title: "310 Bowie St, #2205",
    cityZip: "Austin, TX 78703",
    price: "$620,000",
    beds: 2,
    baths: 2,
    sqft: "1,145 sqft",
    tag: "Condo",
    tagColor: "gold",
    savedTime: "Saved 3 days ago",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    isFavorite: true,
  },
  {
    id: "prop-3",
    title: "8809 Summit Oaks Ln",
    cityZip: "Austin, TX 78759",
    price: "$545,000",
    beds: 3,
    baths: 2.5,
    sqft: "1,780 sqft",
    tag: "For Sale",
    tagColor: "green",
    savedTime: "Saved 1 week ago",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    isFavorite: true,
  },
  {
    id: "prop-4",
    title: "2600 Wooten Dr, #431",
    cityZip: "Austin, TX 78757",
    price: "$2,100/mo",
    beds: 1,
    baths: 1,
    sqft: "720 sqft",
    tag: "For Rent",
    tagColor: "blue",
    savedTime: "Saved 1 week ago",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
];

const INITIAL_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: "search-1",
    title: "Homes for Sale in Austin",
    criteria: "$500K • $900K • 3+ Beds • Central Austin",
    matchesCount: "12 new matches",
    timestamp: "Today at 8:15 AM",
    iconType: "house",
    enabled: true,
  },
  {
    id: "search-2",
    title: "Condos in Downtown Austin",
    criteria: "$400K • $700K • 1-2 Beds",
    matchesCount: "5 new matches",
    timestamp: "Yesterday at 6:20 PM",
    iconType: "condo",
    enabled: true,
  },
  {
    id: "search-3",
    title: "Houses for Rent",
    criteria: "$2,000 • $3,000/mo • 2+ Beds • North Austin",
    matchesCount: "8 new matches",
    timestamp: "May 11 at 9:30 AM",
    iconType: "key",
    enabled: true,
  },
];

const RECOMMENDED_PROPERTIES: RecommendedProperty[] = [
  {
    id: "rec-1",
    title: "310 Bowie St, #2205",
    cityZip: "Austin, TX 78703",
    price: "$620,000",
    beds: 2,
    baths: 2,
    sqft: "1,145 sqft",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "rec-2",
    title: "1234 Maple Ridge Dr",
    cityZip: "Austin, TX 78746",
    price: "$825,000",
    beds: 4,
    baths: 3.5,
    sqft: "2,850 sqft",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "rec-3",
    title: "8809 Summit Oaks Ln",
    cityZip: "Austin, TX 78759",
    price: "$545,000",
    beds: 3,
    baths: 2.5,
    sqft: "1,780 sqft",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "rec-4",
    title: "1504 West Ave, #302",
    cityZip: "Austin, TX 78701",
    price: "$495,000",
    beds: 2,
    baths: 1.5,
    sqft: "980 sqft",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
  {
    id: "rec-5",
    title: "2600 Wooten Dr, #431",
    cityZip: "Austin, TX 78757",
    price: "$2,100/mo",
    beds: 1,
    baths: 1,
    sqft: "720 sqft",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    isFavorite: false,
  },
];

const UPCOMING_TOURS: TourItem[] = [
  {
    id: "tour-1",
    month: "MAY",
    day: "14",
    dayOfWeek: "TUE",
    title: "1234 Maple Ridge Dr",
    cityZip: "Austin, TX 78746",
    dateStr: "Tuesday, May 14",
    timeStr: "11:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    status: "Upcoming",
  },
  {
    id: "tour-2",
    month: "MAY",
    day: "16",
    dayOfWeek: "THU",
    title: "310 Bowie St, #2205",
    cityZip: "Austin, TX 78703",
    dateStr: "Thursday, May 16",
    timeStr: "1:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    status: "Upcoming",
  },
];

export default function BuyerMainPage() {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>(INITIAL_SAVED_PROPERTIES);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(INITIAL_SAVED_SEARCHES);
  const [recIndex, setRecIndex] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isCreateSearchOpen, setIsCreateSearchOpen] = useState(false);
  const [newSearchTitle, setNewSearchTitle] = useState("");
  const [newSearchLocation, setNewSearchLocation] = useState("");
  const [newSearchPrice, setNewSearchPrice] = useState("");

  const toggleFavoriteProperty = (id: string) => {
    setSavedProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const toggleSearchAlert = (id: string) => {
    setSavedSearches((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleCreateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSearchTitle.trim()) return;
    const newSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      title: newSearchTitle.trim(),
      criteria:
        newSearchPrice || newSearchLocation
          ? `${newSearchPrice || "$400K - $800K"} • ${newSearchLocation || "Austin, TX"}`
          : "$400K • $800K • 2+ Beds",
      matchesCount: "0 new matches",
      timestamp: "Just now",
      iconType: "house",
      enabled: true,
    };
    setSavedSearches((prev) => [...prev, newSearch]);
    setNewSearchTitle("");
    setNewSearchLocation("");
    setNewSearchPrice("");
    setIsCreateSearchOpen(false);
  };

  const currentRec = RECOMMENDED_PROPERTIES[recIndex];

  return (
    <div className="min-h-screen bg-[#FAF8F7] text-[#0a192f] flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        activeTab="Buy"
        showSearch={true}
        searchPlaceholder="Search properties, neighborhoods..."
        favoriteCount={7}
        notificationCount={3}
        userName="Olivia"
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 space-y-6 sm:space-y-7">
        {/* ========================================================================= */}
        {/* TWO MAIN COLUMNS: Column 1 (Left) & Column 2 (Right)                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* ===================================================================== */}
          {/* FIRST COLUMN (LEFT): Welcome + 4 Stat Cards + Saved Properties + Alerts */}
          {/* ===================================================================== */}
          <div className="xl:col-span-7 space-y-6 sm:space-y-7">
            {/* 1. Welcome Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0a192f] tracking-tight flex items-center gap-2">
                Welcome back, Olivia <span>👋</span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1 font-normal">
                You&apos;re one step closer to finding your perfect home.
              </p>
            </div>

            {/* 2. 4 Metric Summary Cards in a row using buyer-main-page-icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              {/* Card 1: Saved Properties */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                    <Image
                      src="/icons/buyer-main-page-icons/saved-properties-icon.png"
                      alt="Saved Properties Icon"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a192f] leading-none">24</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">Saved Properties</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Link href="/search-house" className="text-xs font-semibold text-[#1B365D] hover:underline transition inline-block">
                    View all
                  </Link>
                </div>
              </div>

              {/* Card 2: Saved Searches */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                    <Image
                      src="/icons/buyer-main-page-icons/saved-searches-icon.png"
                      alt="Saved Searches Icon"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a192f] leading-none">3</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">Saved Searches</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Link href="#saved-searches" className="text-xs font-semibold text-[#1B365D] hover:underline transition inline-block">
                    View all
                  </Link>
                </div>
              </div>

              {/* Card 3: Upcoming Tours */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                    <Image
                      src="/icons/buyer-main-page-icons/upcoming-tours-icon.png"
                      alt="Upcoming Tours Icon"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a192f] leading-none">2</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">Upcoming Tours</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Link href="/schedule-tour" className="text-xs font-semibold text-[#1B365D] hover:underline transition inline-block">
                    View schedule
                  </Link>
                </div>
              </div>

              {/* Card 4: Applications */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                    <Image
                      src="/icons/buyer-main-page-icons/applications-icon.png"
                      alt="Applications Icon"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a192f] leading-none">1</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">Applications</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Link href="/applications" className="text-xs font-semibold text-[#1B365D] hover:underline transition inline-block">
                    View status
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Saved Properties Section */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0a192f] tracking-tight">
                  Saved Properties
                </h2>
                <Link
                  href="/search-house"
                  className="text-xs font-semibold text-[#1B365D] hover:underline transition"
                >
                  View all
                </Link>
              </div>

              {/* Property Cards Row */}
              <div className="relative group">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {savedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
                    >
                      {/* Thumbnail with floating heart */}
                      <div className="relative w-full h-32 bg-slate-100 overflow-hidden">
                        <Image
                          src={prop.imageUrl}
                          alt={prop.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => toggleFavoriteProperty(prop.id)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0a192f]/85 hover:bg-[#0a192f] text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                          aria-label={prop.isFavorite ? "Unsave property" : "Save property"}
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${
                              prop.isFavorite ? "fill-white stroke-white" : "stroke-white fill-none"
                            }`}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <Link href="/house-detail" className="block group/link">
                            <h3 className="font-bold text-xs text-[#0a192f] truncate group-hover/link:text-[#d99738] transition">
                              {prop.title}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {prop.cityZip}
                          </p>

                          <div className="text-sm font-bold text-[#0a192f] mt-1.5">
                            {prop.price}
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-2">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <span>{prop.beds} bd</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{prop.baths} ba</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              <span>{prop.sqft}</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer Badges */}
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-50">
                          {prop.tagColor === "green" && (
                            <span className="bg-[#eaf5ea] text-[#137333] border border-[#d2ecd2] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                              {prop.tag}
                            </span>
                          )}
                          {prop.tagColor === "gold" && (
                            <span className="bg-[#fef3c7] text-[#b45309] border border-[#fde68a] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                              {prop.tag}
                            </span>
                          )}
                          {prop.tagColor === "blue" && (
                            <span className="bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                              {prop.tag}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-normal">
                            {prop.savedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating right scroll button */}
                <button
                  type="button"
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md text-[#0a192f] items-center justify-center hover:bg-slate-50 transition cursor-pointer z-10"
                  aria-label="Next property"
                >
                  <svg className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </section>

            {/* 4. Saved Searches & Alerts Section */}
            <section id="saved-searches" className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0a192f] tracking-tight">
                  Saved Searches & Alerts
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCreateSearchOpen(true)}
                  className="text-xs font-semibold text-[#1B365D] hover:underline transition cursor-pointer"
                >
                  View all
                </button>
              </div>

              {/* White Container Card */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 shadow-xs divide-y divide-slate-100">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="py-3.5 first:pt-0 last:pb-3 flex items-center justify-between gap-4"
                  >
                    {/* Left Icon & Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex-shrink-0">
                        {search.iconType === "house" && (
                          <div className="w-9 h-9 rounded-full bg-[#fef3e9] flex items-center justify-center text-[#e87a2d]">
                            <svg className="w-4.5 h-4.5 stroke-[#e87a2d]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                          </div>
                        )}
                        {search.iconType === "condo" && (
                          <div className="w-9 h-9 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                            <svg className="w-4.5 h-4.5 stroke-[#0284c7]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                          </div>
                        )}
                        {search.iconType === "key" && (
                          <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#9333ea]">
                            <svg className="w-4.5 h-4.5 stroke-[#9333ea]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-[#0a192f] truncate">
                          {search.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {search.criteria}
                        </p>
                      </div>
                    </div>

                    {/* Right Matches & Toggle Switch */}
                    <div className="flex items-center gap-3.5 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-[#0a192f] leading-none">
                          {search.matchesCount}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {search.timestamp}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSearchAlert(search.id)}
                        className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          search.enabled ? "bg-[#0a192f]" : "bg-slate-200"
                        }`}
                        role="switch"
                        aria-checked={search.enabled}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            search.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Bottom Action */}
                <div className="pt-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => setIsCreateSearchOpen(true)}
                    className="text-xs font-semibold text-[#1B365D] hover:underline transition inline-flex items-center justify-center gap-1.5 cursor-pointer group"
                  >
                    <span>Create New Search</span>
                    <span className="text-sm leading-none font-bold group-hover:scale-110 transition-transform">+</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================================== */}
          {/* SECOND COLUMN (RIGHT): Recommended + Upcoming Tours + Application     */}
          {/* ===================================================================== */}
          <div className="xl:col-span-5 space-y-5">
            {/* 1. RECOMMENDED FOR YOU */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0a192f] tracking-tight">
                  Recommended for you
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Based on your saved searches and activity
                </p>
              </div>

              {/* Spotlight Property Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Left Thumbnail Image */}
                <div className="sm:col-span-5 relative h-36 sm:h-32 rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={currentRec.imageUrl}
                    alt={currentRec.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>

                {/* Right Details */}
                <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-[#0a192f]">
                          {currentRec.title}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {currentRec.cityZip}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...RECOMMENDED_PROPERTIES];
                          updated[recIndex].isFavorite = !updated[recIndex].isFavorite;
                        }}
                        className="text-slate-400 hover:text-[#0a192f] transition p-0.5 cursor-pointer"
                        aria-label="Save recommended property"
                      >
                        <svg className="w-5 h-5 stroke-[#0a192f] fill-none" viewBox="0 0 24 24" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-[#0a192f] mt-1">
                      {currentRec.price}
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-slate-600 mt-1">
                      <span>{currentRec.beds} bd</span>
                      <span>•</span>
                      <span>{currentRec.baths} ba</span>
                      <span>•</span>
                      <span>{currentRec.sqft}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href="/house-detail"
                    className="w-full text-center bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-[#0a192f] py-1.5 px-3 rounded-lg shadow-2xs transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* 5 Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {RECOMMENDED_PROPERTIES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRecIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      recIndex === i ? "w-3.5 bg-[#0a192f]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 2. UPCOMING TOUR SCHEDULE */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#0a192f] tracking-tight">
                  Upcoming Tour Schedule
                </h2>
                <Link
                  href="/schedule-tour"
                  className="text-xs font-semibold text-[#1B365D] hover:underline transition"
                >
                  View full calendar
                </Link>
              </div>

              {/* Tours List */}
              <div className="space-y-3 divide-y divide-slate-100">
                {UPCOMING_TOURS.map((tour) => (
                  <div key={tour.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center w-10 text-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                          {tour.month}
                        </span>
                        <span className="text-lg font-extrabold text-[#0a192f] leading-none my-0.5">
                          {tour.day}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                          {tour.dayOfWeek}
                        </span>
                      </div>

                      {/* Thumbnail */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image
                          src={tour.imageUrl}
                          alt={tour.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs text-[#0a192f] truncate">
                          {tour.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 truncate">
                          {tour.cityZip}
                        </p>
                        <p className="text-[11px] text-slate-600 font-medium mt-1">
                          {tour.dateStr}
                        </p>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {tour.timeStr}
                        </p>
                      </div>
                    </div>

                    {/* Right Badge & Menu */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5] text-[10px] font-semibold px-2 py-0.5 rounded">
                        {tour.status}
                      </span>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        aria-label="More options"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule Tour Action */}
              <div className="pt-1">
                <Link
                  href="/schedule-tour"
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-[#0a192f] py-2.5 px-4 rounded-xl shadow-2xs transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 stroke-[#0a192f]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span>Schedule a Tour</span>
                </Link>
              </div>
            </div>

            {/* 3. APPLICATION STATUS */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#0a192f] tracking-tight">
                  Application Status
                </h2>
                <Link
                  href="/applications"
                  className="text-xs font-semibold text-[#1B365D] hover:underline transition"
                >
                  View all applications
                </Link>
              </div>

              {/* Stepper Progress Bar */}
              <div className="py-1">
                <div className="flex items-center justify-between relative">
                  {/* Step 1: Submitted */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-[#0a192f] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                      <svg className="w-3 h-3 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-[#0a192f] mt-1.5">Submitted</span>
                  </div>

                  {/* Line 1 -> 2 */}
                  <div className="flex-1 h-0.5 bg-[#d99738] mx-1 mb-4" />

                  {/* Step 2: Under Review */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-[#d99738] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      2
                    </div>
                    <span className="text-[10px] font-semibold text-[#0a192f] mt-1.5">Under Review</span>
                  </div>

                  {/* Line 2 -> 3 */}
                  <div className="flex-1 border-t-2 border-dotted border-slate-200 mx-1 mb-4" />

                  {/* Step 3: Approved */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px] font-medium">
                      3
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5">Approved</span>
                  </div>

                  {/* Line 3 -> 4 */}
                  <div className="flex-1 border-t-2 border-dotted border-slate-200 mx-1 mb-4" />

                  {/* Step 4: Lease Sent */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px] font-medium">
                      4
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5">Lease Sent</span>
                  </div>

                  {/* Line 4 -> 5 */}
                  <div className="flex-1 border-t-2 border-dotted border-slate-200 mx-1 mb-4" />

                  {/* Step 5: Signed */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px] font-medium">
                      5
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5">Signed</span>
                  </div>
                </div>
              </div>

              {/* Application Details Card */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80"
                      alt="310 Bowie St"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs text-[#0a192f] truncate">
                      310 Bowie St, #2205
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate">
                      Austin, TX 78703
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Applied on May 10, 2024
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Application ID: APP-8392
                    </p>
                  </div>
                </div>

                {/* Status & Decision */}
                <div className="text-right flex-shrink-0 flex flex-col items-end">
                  <span className="bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5] text-[10px] font-semibold px-2 py-0.5 rounded">
                    Under Review
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Est. decision
                  </div>
                  <div className="text-[11px] font-bold text-[#0a192f]">
                    May 17, 2024
                  </div>
                  <Link
                    href="/applications"
                    className="mt-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-[11px] font-semibold text-[#0a192f] py-1 px-2.5 rounded-lg shadow-2xs transition inline-block text-center"
                  >
                    View Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM REAL-TIME ALERTS MOBILE APP PROMOTION BANNER                       */}
        {/* ========================================================================= */}
        {isBannerVisible && (
          <section className="relative bg-[#FEF8F2] border border-[#F5EBD9] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-12 h-12 rounded-xl bg-white border border-[#f3e5ce] flex items-center justify-center flex-shrink-0 shadow-xs p-2">
                <Image
                  src="/icons/buyer-main-page-icons/bottom-mobile-icon.png"
                  alt="Mobile Alerts Icon"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                  Get real-time alerts on the go
                </h3>
                <p className="text-xs text-slate-600 font-normal mt-0.5">
                  Download the HOMIQ app to receive instant notifications for new matches and updates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2.5">
                {/* Apple App Store Button */}
                <button
                  type="button"
                  onClick={() => alert("HOMIQ iOS App coming soon to Apple App Store!")}
                  className="bg-black hover:bg-slate-900 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2.5 shadow-xs transition cursor-pointer"
                >
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src="/icons/apple-icon.png"
                      alt="Apple Logo"
                      fill
                      sizes="20px"
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] uppercase tracking-wide leading-none text-slate-300">Download on the</div>
                    <div className="text-xs font-semibold leading-tight text-white">App Store</div>
                  </div>
                </button>

                {/* Google Play Store Button */}
                <button
                  type="button"
                  onClick={() => alert("HOMIQ Android App coming soon to Google Play!")}
                  className="bg-black hover:bg-slate-900 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2.5 shadow-xs transition cursor-pointer"
                >
                  <div className="relative w-4 h-4 flex-shrink-0">
                    <Image
                      src="/icons/playstore-icon.png"
                      alt="Google Play Logo"
                      fill
                      sizes="18px"
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] uppercase tracking-wide leading-none text-slate-300">GET IT ON</div>
                    <div className="text-xs font-semibold leading-tight text-white">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsBannerVisible(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-black/5 transition cursor-pointer"
                aria-label="Dismiss banner"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* CREATE NEW SEARCH MODAL */}
      {isCreateSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0a192f]">Create New Saved Search</h3>
              <button
                type="button"
                onClick={() => setIsCreateSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateSearch} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Search Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Homes in South Congress"
                  value={newSearchTitle}
                  onChange={(e) => setNewSearchTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a192f]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Location / Neighborhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX 78704"
                  value={newSearchLocation}
                  onChange={(e) => setNewSearchLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a192f]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Price Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. $450K - $750K"
                  value={newSearchPrice}
                  onChange={(e) => setNewSearchPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a192f]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateSearchOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0a192f] hover:bg-[#071325] rounded-lg shadow-xs cursor-pointer"
                >
                  Save Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

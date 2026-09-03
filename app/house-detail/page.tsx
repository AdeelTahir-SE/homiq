"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BuyerSidebar from "@/components/BuyerSidebar";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=85",
    caption: "Front Exterior & Modern Architecture at Dusk",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=85",
    caption: "Spacious Open-Concept Living Room with Natural Light",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&auto=format&fit=crop&q=85",
    caption: "Chef's Kitchen with Quartz Countertops & Waterfall Island",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85",
    caption: "Primary Master Suite with Panoramic Hill Country Views",
  },
  {
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&auto=format&fit=crop&q=85",
    caption: "Spa-like Primary Bathroom with Free-Standing Soaking Tub",
  },
  {
    url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1600&auto=format&fit=crop&q=85",
    caption: "Covered Outdoor Patio and Private Backyard Lounge",
  },
  {
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&auto=format&fit=crop&q=85",
    caption: "Designer Dining Area with Architectural Chandelier",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=85",
    caption: "Secondary Bedroom with En-Suite Full Bathroom",
  },
  {
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=85",
    caption: "Custom Walk-in Closet with Built-in Cabinetry",
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=85",
    caption: "Dedicated Home Office / Study with High-Speed Setup",
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&auto=format&fit=crop&q=85",
    caption: "Modern Laundry Room with High-Efficiency Washer & Dryer",
  },
  {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&auto=format&fit=crop&q=85",
    caption: "Private Backyard Garden and Heated Pool Area",
  },
  {
    url: "https://images.unsplash.com/photo-1502005229762-ee1b2b814660?w=1600&auto=format&fit=crop&q=85",
    caption: "Two-Car Attached Garage with EV Charger Outlet",
  },
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&auto=format&fit=crop&q=85",
    caption: "Entry Foyer and Floating Architectural Staircase",
  },
  {
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&auto=format&fit=crop&q=85",
    caption: "Smart Home Integration Hub and Security System",
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=85",
    caption: "Upstairs Media Room and Entertainment Lounge",
  },
  {
    url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&auto=format&fit=crop&q=85",
    caption: "Lush Front Landscaping and Exterior Lighting",
  },
  {
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1600&auto=format&fit=crop&q=85",
    caption: "Guest Suite with Walk-In Shower",
  },
  {
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop&q=85",
    caption: "Butler's Pantry & Walk-In Wine Cellar",
  },
  {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop&q=85",
    caption: "Floor Plan Architectural Perspective and Sun Orientation",
  },
];

const AMENITIES_LIST = [
  { name: "Open Floor Plan", icon: "/icons/house-detail/open-floor-plan-icon.png" },
  { name: "Chef's Kitchen", icon: "/icons/house-detail/chef's-kitchen-icon.png" },
  { name: "Smart Home", icon: "/icons/house-detail/smart-home-icon.png" },
  { name: "Primary Suite", icon: "/icons/house-detail/primary-suite-icon.png" },
  { name: "Private Backyard", icon: "/icons/house-detail/private-backyard-icon.png" },
  { name: "2-Car Garage", icon: "/icons/house-detail/car-garbage-icon.png" },
  { name: "Walk-in Closets", icon: "/icons/house-detail/closets-icon.png" },
  { name: "Energy Efficient", icon: "/icons/house-detail/energy-efficient-icon.png" },
  { name: "Washer & Dryer", icon: "/icons/house-detail/washer-and-dryer-icon.png" },
  { name: "High-Speed Internet", icon: "/icons/house-detail/high-speed-internet-icon.png" },
];

const HIGHLIGHTS = [
  "Spacious open-concept living and dining area",
  "Modern kitchen with quartz countertops and stainless steel appliances",
  "Luxurious primary suite with walk-in closet and spa-like bathroom",
  "Private backyard with covered patio – perfect for entertaining",
  "Located near top-rated schools, parks, and downtown Austin",
];

export default function HouseDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Details" | "Amenities" | "Neighborhood" | "Floor Plan"
  >("Overview");
  const [isSaved, setIsSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourDate, setTourDate] = useState("2026-09-08");
  const [tourTime, setTourTime] = useState("10:00 AM");
  const [tourBooked, setTourBooked] = useState(false);
  const [showEstBreakdown, setShowEstBreakdown] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  const tabs: Array<"Overview" | "Details" | "Amenities" | "Neighborhood" | "Floor Plan"> = [
    "Overview",
    "Details",
    "Amenities",
    "Neighborhood",
    "Floor Plan",
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsShareModalOpen(true);
      setTimeout(() => setIsShareModalOpen(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a192f] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar activeTab="Buy" />

      {/* Main Body with Buyer Sidebar and Page Content */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1920px] mx-auto">
        {/* Buyer Sidebar Component */}
        <BuyerSidebar activeItem="Dashboard" />

        {/* House Detail Content Area */}
        <main className="flex-1 min-w-0 bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1320px] mx-auto space-y-6">
            {/* Top Navigation & Action Row */}
            <div className="flex items-center justify-between">
              {/* Back to Search */}
              <Link
                href="/search-house"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0a192f] transition-colors group cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Search</span>
              </Link>

              {/* Share and Save Actions */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#0a192f] transition cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-slate-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-2 text-sm font-medium transition cursor-pointer ${
                    isSaved ? "text-red-500 font-semibold" : "text-slate-700 hover:text-[#0a192f]"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? "fill-red-500 stroke-red-500" : "stroke-slate-700 fill-none"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>

            {/* Title & Address Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0a192f] tracking-tight">
                1234 Maple Ridge Drive
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <span className="text-sm font-medium text-slate-600">
                  Austin, TX 78746
                </span>
                <span className="inline-flex items-center bg-[#fef3e2] text-[#b45309] text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Near Downtown
                </span>
              </div>
            </div>

            {/* Split Content Grid: Left Main Details & Right Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (8 cols): Hero Image Carousel, Tabs, Details */}
              <div className="lg:col-span-8 space-y-6">
                {/* Hero Image Carousel */}
                <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-sm bg-slate-900 group">
                  <Image
                    src={GALLERY_IMAGES[currentImageIndex].url}
                    alt={GALLERY_IMAGES[currentImageIndex].caption}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center transition-all duration-300"
                  />

                  {/* Previous Arrow Button */}
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer active:scale-95"
                    aria-label="Previous photo"
                  >
                    <svg
                      className="w-5 h-5 text-slate-700 -ml-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Next Arrow Button */}
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer active:scale-95"
                    aria-label="Next photo"
                  >
                    <svg
                      className="w-5 h-5 text-slate-700 -mr-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Photo Counter Pill Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {currentImageIndex + 1} / {GALLERY_IMAGES.length}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-slate-200">
                  <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto [scrollbar-width:none]">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
                            isActive
                              ? "text-[#0a192f]"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {tab}
                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content Panels */}
                <div className="pt-2">
                  {/* OVERVIEW TAB */}
                  {activeTab === "Overview" && (
                    <div className="space-y-8">
                      {/* Property Description */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Modern design meets Hill Country charm in this stunning 4-bedroom, 3.5-bath home in one of Austin&apos;s most desirable neighborhoods. With an open-concept layout, high-end finishes, and a private outdoor space, this home is perfect for both entertaining and everyday living.
                      </p>

                      {/* Amenities Section */}
                      <div className="space-y-3.5">
                        <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                          Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2.5 sm:gap-3">
                          {AMENITIES_LIST.map((item) => (
                            <div
                              key={item.name}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-[#fbf9f5] border border-slate-200/90 rounded-xl text-xs sm:text-[13px] font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition"
                            >
                              <div className="relative w-4 h-4 flex-shrink-0">
                                <Image
                                  src={item.icon}
                                  alt={item.name}
                                  fill
                                  sizes="16px"
                                  className="object-contain"
                                />
                              </div>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Property Highlights Section */}
                      <div className="space-y-3.5">
                        <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                          Property Highlights
                        </h3>
                        <ul className="space-y-2.5">
                          {HIGHLIGHTS.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-700"
                            >
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fef3e2] text-[#d99738] flex items-center justify-center mt-0.5">
                                <svg
                                  className="w-3.5 h-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <span className="leading-snug">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* DETAILS TAB */}
                  {activeTab === "Details" && (
                    <div className="space-y-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                        Comprehensive Property Specifications
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-2xl p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Heating</span>
                            <span className="font-semibold text-slate-800">Central, Heat Pump</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Cooling</span>
                            <span className="font-semibold text-slate-800">Central Air, Dual Zone</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Foundation</span>
                            <span className="font-semibold text-slate-800">Slab</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Roof</span>
                            <span className="font-semibold text-slate-800">Architectural Shingle</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Stories</span>
                            <span className="font-semibold text-slate-800">2 Levels</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Annual Taxes</span>
                            <span className="font-semibold text-slate-800">$10,420 (2025)</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">School District</span>
                            <span className="font-semibold text-slate-800">Eanes ISD</span>
                          </div>
                          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
                            <span className="text-slate-500">Security</span>
                            <span className="font-semibold text-slate-800">Smart Cameras & Ring</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AMENITIES TAB */}
                  {activeTab === "Amenities" && (
                    <div className="space-y-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                        All Features & Equipment
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { category: "Interior", items: ["Open Floor Plan", "Chef's Kitchen", "Quartz Countertops", "Walk-in Closets", "Wine Cellar", "Custom Cabinetry"] },
                          { category: "Exterior", items: ["Private Backyard", "Covered Patio", "Outdoor Grill Hookup", "Lush Landscaping", "Automatic Sprinklers"] },
                          { category: "Utilities & Tech", items: ["Smart Home Automation", "Energy Efficient HVAC", "EV Charger In Garage", "High-Speed Fiber Ready", "Keyless Entry"] },
                        ].map((group) => (
                          <div key={group.category} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                            <h4 className="font-bold text-sm text-[#0a192f] border-b border-slate-100 pb-2">
                              {group.category}
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                              {group.items.map((i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#d99738]" />
                                  {i}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* NEIGHBORHOOD TAB */}
                  {activeTab === "Neighborhood" && (
                    <div className="space-y-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                        Neighborhood & Location Score
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                          <span className="text-3xl font-extrabold text-[#0a192f]">88/100</span>
                          <p className="text-xs font-semibold text-slate-500 mt-1">Walk Score (Very Walkable)</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                          <span className="text-3xl font-extrabold text-[#0a192f]">9/10</span>
                          <p className="text-xs font-semibold text-slate-500 mt-1">Top Rated School Rating</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                          <span className="text-3xl font-extrabold text-[#0a192f]">12 min</span>
                          <p className="text-xs font-semibold text-slate-500 mt-1">Drive to Downtown Austin</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FLOOR PLAN TAB */}
                  {activeTab === "Floor Plan" && (
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a192f]">
                        Architectural Floor Plan
                      </h3>
                      <div className="relative w-full h-[360px] bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden">
                        <div className="text-center p-6 space-y-3">
                          <div className="relative w-16 h-16 mx-auto opacity-70">
                            <Image
                              src="/icons/house-detail/open-floor-plan-icon.png"
                              alt="Floor plan"
                              fill
                              sizes="64px"
                              className="object-contain"
                            />
                          </div>
                          <h4 className="font-bold text-slate-800">2,850 Sq Ft – 2 Story Configuration</h4>
                          <p className="text-xs text-slate-500 max-w-md">
                            Main floor features open living, kitchen, dining, and primary suite. Upper level hosts 3 bedrooms, 2 bathrooms, and a media loft.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (4 cols): Pricing Card & Agent Card */}
              <div className="lg:col-span-4 space-y-6">
                {/* 1. PRICING & QUICK STATS CARD */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  {/* Price */}
                  <div>
                    <span className="text-3xl font-black text-[#0a192f]">
                      $825,000
                    </span>
                    <div className="relative inline-block ml-3">
                      <button
                        type="button"
                        onClick={() => setShowEstBreakdown(!showEstBreakdown)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Est. $4,862/mo</span>
                        <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Mortgage Breakdown Tooltip */}
                      {showEstBreakdown && (
                        <div className="absolute right-0 sm:left-0 mt-2 w-64 bg-slate-900 text-white rounded-xl p-3.5 shadow-xl text-xs z-30 space-y-2">
                          <p className="font-bold border-b border-slate-700 pb-1">Payment Breakdown</p>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Principal & Interest:</span>
                            <span className="font-medium">$3,840</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Property Taxes:</span>
                            <span className="font-medium">$690</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Home Insurance:</span>
                            <span className="font-medium">$247</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">HOA Fees:</span>
                            <span className="font-medium">$85</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4 Stats Grid: Beds, Baths, Sq Ft, Acres */}
                  <div className="grid grid-cols-4 gap-2 pt-6 pb-4 border-b border-slate-100 text-center">
                    {/* Beds */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1 text-slate-600">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/bed-icon.png"
                            alt="Beds"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0a192f]">4</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Beds</p>
                    </div>

                    {/* Baths */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1 text-slate-600">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/bathtub-icon.png"
                            alt="Baths"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0a192f]">3.5</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Baths</p>
                    </div>

                    {/* Sq Ft */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1 text-slate-600">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/icons/search-house/sqft-icon.png"
                            alt="Sq Ft"
                            fill
                            sizes="16px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0a192f]">2,850</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Sq Ft</p>
                    </div>

                    {/* Acres */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1 text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="text-sm font-bold text-[#0a192f]">0.24</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Acres</p>
                    </div>
                  </div>

                  {/* Metadata Spec Key-Value List */}
                  <div className="pt-4 space-y-2.5 text-xs sm:text-[13px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Year Built</span>
                      <span className="font-bold text-[#0a192f]">2021</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Property Type</span>
                      <span className="font-bold text-[#0a192f]">Single Family Home</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">MLS ID</span>
                      <span className="font-bold text-[#0a192f]">ATX-7845123</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">HOA</span>
                      <span className="font-bold text-[#0a192f]">$85/mo</span>
                    </div>
                  </div>
                </div>

                {/* 2. YOUR AGENT CARD */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                  <h3 className="text-base font-bold text-[#0a192f]">
                    Your Agent
                  </h3>

                  {/* Agent Info Row */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                        alt="Emma Clark"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0a192f] text-base">
                        Emma Clark
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Austin Real Estate Specialist
                      </p>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium">
                    <a
                      href="tel:5125550198"
                      className="flex items-center gap-3 text-slate-700 hover:text-[#0a192f] transition cursor-pointer"
                    >
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <Image
                          src="/icons/house-detail/phone-icon.png"
                          alt="Phone"
                          fill
                          sizes="16px"
                          className="object-contain"
                        />
                      </div>
                      <span>(512) 555-0198</span>
                    </a>

                    <a
                      href="mailto:emma.clark@homiq.com"
                      className="flex items-center gap-3 text-slate-700 hover:text-[#0a192f] transition cursor-pointer truncate"
                    >
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <Image
                          src="/icons/house-detail/mail-icon.png"
                          alt="Email"
                          fill
                          sizes="16px"
                          className="object-contain"
                        />
                      </div>
                      <span className="truncate">emma.clark@homiq.com</span>
                    </a>
                  </div>

                  {/* Schedule a Tour CTA Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsTourModalOpen(true)}
                      className="w-full bg-[#0a192f] hover:bg-[#071325] text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition duration-150 cursor-pointer active:scale-[0.99]"
                    >
                      <div className="relative w-4 h-4 flex-shrink-0 brightness-0 invert">
                        <Image
                          src="/icons/house-detail/schedule-icon.png"
                          alt="Schedule Tour"
                          fill
                          sizes="16px"
                          className="object-contain"
                        />
                      </div>
                      <span>Schedule a Tour</span>
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-2.5">
                      Usually responds in 1 hour
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer Footer */}
            <div className="pt-10 pb-6 text-center border-t border-slate-200/60 mt-8">
              <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
                All information is deemed reliable but not guaranteed. Verify all details with a licensed real estate professional.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Share Toast Modal */}
      {isShareModalOpen && (
        <div className="fixed bottom-6 right-6 bg-[#0a192f] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 text-sm font-medium animate-fade-in">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* Schedule a Tour Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scale-up relative">
            <button
              type="button"
              onClick={() => {
                setIsTourModalOpen(false);
                setTourBooked(false);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!tourBooked ? (
              <>
                <div>
                  <h3 className="text-lg font-bold text-[#0a192f]">Schedule a Private Tour</h3>
                  <p className="text-xs text-slate-500 mt-1">1234 Maple Ridge Drive • Host: Emma Clark</p>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["10:00 AM", "01:30 PM", "04:00 PM"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTourTime(slot)}
                          className={`py-2 px-2 text-xs font-semibold rounded-lg border cursor-pointer transition ${
                            tourTime === slot
                              ? "bg-[#0a192f] text-white border-[#0a192f]"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tour Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="py-2.5 px-3 text-xs font-semibold rounded-lg border bg-[#fef3e2] text-[#b45309] border-[#d99738]/40"
                      >
                        In-Person Walkthrough
                      </button>
                      <button
                        type="button"
                        className="py-2.5 px-3 text-xs font-semibold rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      >
                        Live Video Tour
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTourBooked(true)}
                  className="w-full bg-[#0a192f] hover:bg-[#071325] text-white font-semibold py-3 rounded-xl shadow-sm transition cursor-pointer text-sm"
                >
                  Confirm Tour Booking
                </button>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0a192f]">Tour Request Confirmed!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Emma Clark has been notified for {tourDate} at {tourTime}. You will receive a calendar invitation shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsTourModalOpen(false);
                    setTourBooked(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

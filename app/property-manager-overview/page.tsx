"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyManagerSidebar from "@/components/PropertyManagerSidebar";

interface MaintenanceRequest {
  id: string;
  title: string;
  propertyUnit: string;
  reportedBy: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  status: "open" | "in_progress" | "closed";
}

const INITIAL_MAINTENANCE: MaintenanceRequest[] = [
  {
    id: "m1",
    title: "Leaking pipe under kitchen sink",
    propertyUnit: "Maple Ridge Apartments – Unit 2A",
    reportedBy: "Sarah Johnson",
    time: "May 13, 9:15 AM",
    priority: "High",
    status: "open",
  },
  {
    id: "m2",
    title: "AC not cooling properly",
    propertyUnit: "Sunset Villas – Unit 103",
    reportedBy: "James Wilson",
    time: "May 12, 2:30 PM",
    priority: "Medium",
    status: "open",
  },
  {
    id: "m3",
    title: "Dryer not heating",
    propertyUnit: "Lakeside Townhomes – Unit 7",
    reportedBy: "Emily Davis",
    time: "May 11, 11:45 AM",
    priority: "Medium",
    status: "open",
  },
  {
    id: "m4",
    title: "Water heater leaking slightly",
    propertyUnit: "Oakwood Condos – Unit 104",
    reportedBy: "David Miller",
    time: "May 10, 4:20 PM",
    priority: "High",
    status: "in_progress",
  },
  {
    id: "m5",
    title: "Light fixture replacement in hallway",
    propertyUnit: "Pine Creek Estates – Unit 12",
    reportedBy: "Rachel Green",
    time: "May 9, 1:15 PM",
    priority: "Low",
    status: "closed",
  },
];

const VACANT_UNITS = [
  {
    id: "v1",
    unit: "Unit 3A",
    property: "Maple Ridge Apartments",
    beds: 2,
    baths: 2,
    sqft: "1,050",
    status: "Ready to Show",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "v2",
    unit: "Unit 105",
    property: "Sunset Villas",
    beds: 1,
    baths: 1,
    sqft: "750",
    status: "Vacant",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "v3",
    unit: "Unit 7",
    property: "Lakeside Townhomes",
    beds: 3,
    baths: 2.5,
    sqft: "1,420",
    status: "Make Ready",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "v4",
    unit: "Unit 203",
    property: "Oakwood Condos",
    beds: 2,
    baths: 2,
    sqft: "980",
    status: "Vacant",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "v5",
    unit: "Unit 4B",
    property: "Pine Creek Estates",
    beds: 2,
    baths: 1.5,
    sqft: "1,120",
    status: "Ready to Show",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format&fit=crop&q=80",
  },
];

export default function PropertyManagerOverviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("May 13, 2024");
  const [activeMaintenanceTab, setActiveMaintenanceTab] = useState<"all" | "open" | "in_progress" | "closed">("open");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskProperty, setTaskProperty] = useState("Maple Ridge Apartments");
  const [taskDate, setTaskDate] = useState("2024-05-14");
  const [vacantScrollIndex, setVacantScrollIndex] = useState(0);

  const filteredMaintenance = INITIAL_MAINTENANCE.filter((item) => {
    if (activeMaintenanceTab === "all") return true;
    return item.status === activeMaintenanceTab;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    alert(`Task "${taskTitle}" added for ${taskProperty}!`);
    setTaskTitle("");
    setIsAddTaskModalOpen(false);
  };

  const handleNextVacant = () => {
    setVacantScrollIndex((prev) => (prev + 1) % (VACANT_UNITS.length - 2));
  };

  return (
    <div className="min-h-screen bg-white text-[#0a192f] flex font-sans">
      {/* Property Manager Sidebar */}
      <PropertyManagerSidebar activeItem="Overview" />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-3 sm:gap-6 sticky top-0 z-40">
          <div className="flex items-center justify-end gap-3 sm:gap-6 flex-1 max-w-full">
            {/* Search Input (Aligned to Right) */}
            <div className="relative w-full max-w-[170px] sm:max-w-xs md:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search properties, tenants, leases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-300 focus:ring-1 focus:ring-slate-200 transition"
              />
            </div>

            {/* Bell Notification */}
            <button
              type="button"
              className="relative p-1.5 text-slate-600 hover:text-[#0a192f] transition cursor-pointer flex-shrink-0"
              aria-label="Notifications"
            >
              <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#d99738] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mail Icon */}
            <button
              type="button"
              className="p-1.5 text-slate-600 hover:text-[#0a192f] transition cursor-pointer flex-shrink-0"
              aria-label="Messages"
            >
              <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pl-1">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Daniel Carter"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs sm:text-sm font-bold text-[#0a192f] leading-tight">
                  Daniel Carter
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Property Manager</p>
              </div>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {/* Scrollable Main Body */}
        <main className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto bg-white">
          {/* Welcome Header with Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Welcome back, Daniel 👋
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Here&apos;s what&apos;s happening with your portfolio today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Date Filter */}
              <div className="relative">
                <button
                  type="button"
                  className="bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs transition cursor-pointer"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedDate}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Add Task Button */}
              <button
                type="button"
                onClick={() => setIsAddTaskModalOpen(true)}
                className="bg-[#13233c] hover:bg-[#0c1728] text-white text-xs font-semibold px-3.5 py-2 sm:px-4 sm:py-2 rounded-md flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <span className="text-sm leading-none font-bold">+</span>
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* 1. TOP 5 KPI SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {/* Total Properties */}
            <div className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/icons/property-manager-overview-icons/total-properties.png"
                  alt="Total Properties"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500 truncate" title="Total Properties">Total Properties</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-0.5 tracking-tight truncate leading-tight">12</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1 truncate leading-none">
                  <span>▲ 2</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Total Units */}
            <div className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/icons/property-manager-overview-icons/total-units.png"
                  alt="Total Units"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500 truncate" title="Total Units">Total Units</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-0.5 tracking-tight truncate leading-tight">142</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1 truncate leading-none">
                  <span>▲ 5</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Occupied Units */}
            <div className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/icons/property-manager-overview-icons/occupied-units.png"
                  alt="Occupied Units"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500 truncate" title="Occupied Units">Occupied Units</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-0.5 tracking-tight truncate leading-tight">
                  118 <span className="text-xs sm:text-sm font-semibold text-slate-500">(83%)</span>
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1 truncate leading-none">
                  <span>▲ 3%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Rent Collected (May) */}
            <div className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/icons/property-manager-overview-icons/rent-collection.png"
                  alt="Rent Collected"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500 truncate" title="Rent Collected (May)">Rent Collected (May)</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-0.5 tracking-tight truncate leading-tight">$198,450</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1 truncate leading-none">
                  <span>▲ 12%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Outstanding Rent */}
            <div className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/icons/property-manager-overview-icons/outstanding-rent.png"
                  alt="Outstanding Rent"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500 truncate" title="Outstanding Rent">Outstanding Rent</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-0.5 tracking-tight truncate leading-tight">$16,350</h3>
                <p className="text-[11px] font-semibold text-rose-600 mt-0.5 flex items-center gap-1 truncate leading-none">
                  <span>▼ 8%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. MAIN 2-COLUMN SECTION AFTER TOP 5 KPIS */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
            {/* FIRST MAIN COLUMN (FLEX-1 EXPANDED WIDTH) */}
            <div className="flex-1 min-w-0 w-full space-y-4 sm:space-y-5">
              {/* SUB-GRID: TWO COLUMNS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* SUB-COLUMN 1: Unit Occupancy Overview & Rent Collection by Property */}
                <div className="space-y-4 sm:space-y-5 min-w-0">
                  {/* Unit Occupancy Overview */}
                  <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Unit Occupancy Overview</h2>
                        <Link href="/properties" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                          View all
                        </Link>
                      </div>

                      {/* Donut Chart and Legend */}
                      <div className="mt-4 flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                        {/* SVG Donut Chart */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="14" />
                            
                            {/* Occupied: 83% (circumference ~ 238.76) */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#22c55e"
                              strokeWidth="14"
                              strokeDasharray="198.17 238.76"
                              strokeDashoffset="0"
                            />
                            {/* Vacant: 11% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#94a3b8"
                              strokeWidth="14"
                              strokeDasharray="26.26 238.76"
                              strokeDashoffset="-198.17"
                            />
                            {/* Notice Given: 4% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#f59e0b"
                              strokeWidth="14"
                              strokeDasharray="9.55 238.76"
                              strokeDashoffset="-224.43"
                            />
                            {/* Unavailable: 2% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#1e293b"
                              strokeWidth="14"
                              strokeDasharray="4.78 238.76"
                              strokeDashoffset="-233.98"
                            />
                          </svg>

                          {/* Center Text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-lg sm:text-xl font-black text-[#0a192f] leading-none">142</span>
                            <span className="text-[9px] text-slate-500 font-medium mt-0.5 leading-none">Total Units</span>
                          </div>
                        </div>

                        {/* Legend breakdown with strict no-wrap values */}
                        <div className="space-y-1.5 flex-1 min-w-0 text-xs">
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-md bg-[#22c55e] shrink-0"></span>
                              <span className="text-slate-600 font-medium truncate text-xs">Occupied</span>
                            </div>
                            <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                              118 <span className="font-normal text-slate-400 text-[10.5px]">(83%)</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-md bg-[#94a3b8] shrink-0"></span>
                              <span className="text-slate-600 font-medium truncate text-xs">Vacant</span>
                            </div>
                            <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                              16 <span className="font-normal text-slate-400 text-[10.5px]">(11%)</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-md bg-[#f59e0b] shrink-0"></span>
                              <span className="text-slate-600 font-medium truncate text-xs">Notice Given</span>
                            </div>
                            <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                              5 <span className="font-normal text-slate-400 text-[10.5px]">(4%)</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-md bg-[#1e293b] shrink-0"></span>
                              <span className="text-slate-600 font-medium truncate text-xs">Unavailable</span>
                            </div>
                            <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                              3 <span className="font-normal text-slate-400 text-[10.5px]">(2%)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rent Collection by Property */}
                  <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Rent Collection by Property</h2>
                        <Link href="/reports" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                          View report
                        </Link>
                      </div>

                      <div className="mt-3.5 overflow-x-auto no-scrollbar">
                        <table className="w-full min-w-[340px] text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-medium text-[11px]">
                              <th className="pb-1.5 font-medium whitespace-nowrap pr-2">Property</th>
                              <th className="pb-1.5 font-medium whitespace-nowrap px-1 text-right">Collected</th>
                              <th className="pb-1.5 font-medium whitespace-nowrap px-1 text-right">Outstanding</th>
                              <th className="pb-1.5 font-medium whitespace-nowrap px-1 text-right">Total</th>
                              <th className="pb-1.5 font-medium whitespace-nowrap pl-2 text-right">Rate</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            <tr>
                              <td className="py-2 font-medium text-[#0a192f] whitespace-nowrap pr-2">Maple Ridge Apts</td>
                              <td className="py-2 px-1 text-right whitespace-nowrap">$68,450</td>
                              <td className="py-2 px-1 text-slate-500 text-right whitespace-nowrap">$5,250</td>
                              <td className="py-2 px-1 font-medium text-right whitespace-nowrap">$73,700</td>
                              <td className="py-2 pl-2 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="font-semibold text-xs">93%</span>
                                  <div className="w-6 h-1.5 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                    <div className="w-[93%] h-full bg-emerald-500 rounded-md"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 font-medium text-[#0a192f] whitespace-nowrap pr-2">Sunset Villas</td>
                              <td className="py-2 px-1 text-right whitespace-nowrap">$52,800</td>
                              <td className="py-2 px-1 text-slate-500 text-right whitespace-nowrap">$3,200</td>
                              <td className="py-2 px-1 font-medium text-right whitespace-nowrap">$56,000</td>
                              <td className="py-2 pl-2 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="font-semibold text-xs">94%</span>
                                  <div className="w-6 h-1.5 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                    <div className="w-[94%] h-full bg-emerald-500 rounded-md"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 font-medium text-[#0a192f] whitespace-nowrap pr-2">Lakeside Townhomes</td>
                              <td className="py-2 px-1 text-right whitespace-nowrap">$41,600</td>
                              <td className="py-2 px-1 text-slate-500 text-right whitespace-nowrap">$4,900</td>
                              <td className="py-2 px-1 font-medium text-right whitespace-nowrap">$46,500</td>
                              <td className="py-2 pl-2 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="font-semibold text-xs">90%</span>
                                  <div className="w-6 h-1.5 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                    <div className="w-[90%] h-full bg-emerald-500 rounded-md"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 font-medium text-[#0a192f] whitespace-nowrap pr-2">Oakwood Condos</td>
                              <td className="py-2 px-1 text-right whitespace-nowrap">$25,600</td>
                              <td className="py-2 px-1 text-slate-500 text-right whitespace-nowrap">$1,000</td>
                              <td className="py-2 px-1 font-medium text-right whitespace-nowrap">$26,600</td>
                              <td className="py-2 pl-2 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="font-semibold text-xs">96%</span>
                                  <div className="w-6 h-1.5 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                    <div className="w-[96%] h-full bg-emerald-500 rounded-md"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 font-medium text-[#0a192f] whitespace-nowrap pr-2">Pine Creek Estates</td>
                              <td className="py-2 px-1 text-right whitespace-nowrap">$9,950</td>
                              <td className="py-2 px-1 text-slate-500 text-right whitespace-nowrap">$0</td>
                              <td className="py-2 px-1 font-medium text-right whitespace-nowrap">$9,950</td>
                              <td className="py-2 pl-2 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="font-semibold text-xs">100%</span>
                                  <div className="w-6 h-1.5 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                    <div className="w-[100%] h-full bg-emerald-500 rounded-md"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-slate-200 font-bold text-[#0a192f] text-xs">
                              <td className="pt-2 whitespace-nowrap pr-2">Total</td>
                              <td className="pt-2 px-1 text-right whitespace-nowrap">$198,450</td>
                              <td className="pt-2 px-1 text-slate-500 text-right whitespace-nowrap">$16,350</td>
                              <td className="pt-2 px-1 text-right whitespace-nowrap">$214,800</td>
                              <td className="pt-2 pl-2 text-right whitespace-nowrap font-bold">92%</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SUB-COLUMN 2: Rent Collection (May 2024) & Maintenance Requests */}
                <div className="space-y-4 sm:space-y-5 min-w-0">
                  {/* Rent Collection (May 2024) */}
                  <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Rent Collection (May 2024)</h2>
                        <Link href="/rent-collection" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                          View details
                        </Link>
                      </div>

                      {/* Donut & Stats */}
                      <div className="mt-4 flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                        {/* SVG Donut Chart */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="14" />
                            
                            {/* Collected: 92% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#22c55e"
                              strokeWidth="14"
                              strokeDasharray="219.66 238.76"
                              strokeDashoffset="0"
                            />
                            {/* Outstanding: 8% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke="#ef4444"
                              strokeWidth="14"
                              strokeDasharray="19.10 238.76"
                              strokeDashoffset="-219.66"
                            />
                          </svg>

                          {/* Center Text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-[9px] text-slate-400 font-medium leading-none">Total</span>
                            <span className="text-xs sm:text-sm font-black text-[#0a192f] mt-0.5 leading-tight">$214,800</span>
                          </div>
                        </div>

                        {/* Legend & Inset Box with strict no-wrap */}
                        <div className="space-y-2 flex-1 min-w-0 text-xs">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="w-2 h-2 rounded-md bg-[#22c55e] shrink-0"></span>
                                <span className="text-slate-600 font-medium truncate text-xs">Collected</span>
                              </div>
                              <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                                $198,450 <span className="font-normal text-slate-400 text-[10.5px]">(92%)</span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="w-2 h-2 rounded-md bg-[#ef4444] shrink-0"></span>
                                <span className="text-slate-600 font-medium truncate text-xs">Outstanding</span>
                              </div>
                              <span className="font-bold text-[#0a192f] text-xs whitespace-nowrap shrink-0">
                                $16,350 <span className="font-normal text-slate-400 text-[10.5px]">(8%)</span>
                              </span>
                            </div>
                          </div>

                          {/* Inset collections pill */}
                          <div className="bg-[#fcfaf6] border border-[#f0e3ce] rounded-md p-2 text-left">
                            <p className="text-[9.5px] text-slate-500 font-medium leading-none">This Month&apos;s Collections</p>
                            <p className="text-xs font-bold text-[#0a192f] mt-0.5">$198,450 of $214,800</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Requests */}
                  <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Maintenance Requests</h2>
                        <Link href="/maintenance" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                          View all
                        </Link>
                      </div>

                      {/* Filter Tabs */}
                      <div className="mt-3.5 grid grid-cols-4 gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveMaintenanceTab("all")}
                          className={`px-1.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer text-center truncate ${
                            activeMaintenanceTab === "all"
                              ? "bg-amber-100/70 text-amber-900 border border-amber-300/60"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                          }`}
                        >
                          All (18)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMaintenanceTab("open")}
                          className={`px-1.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer text-center truncate ${
                            activeMaintenanceTab === "open"
                              ? "bg-[#fff3e0] text-[#c05621] border border-[#fed7aa]"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                          }`}
                        >
                          Open (12)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMaintenanceTab("in_progress")}
                          className={`px-1 py-1 rounded-md text-[10.5px] font-semibold transition cursor-pointer text-center truncate ${
                            activeMaintenanceTab === "in_progress"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                          }`}
                          title="In Progress (4)"
                        >
                          In Progress (4)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMaintenanceTab("closed")}
                          className={`px-1.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer text-center truncate ${
                            activeMaintenanceTab === "closed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                          }`}
                        >
                          Closed (2)
                        </button>
                      </div>

                      {/* Requests List */}
                      <div className="mt-3.5 space-y-2.5">
                        {filteredMaintenance.slice(0, 3).map((item) => (
                          <div key={item.id} className="p-0.5 space-y-1">
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 w-14 text-center justify-center flex items-center gap-0.5 ${
                                  item.priority === "High"
                                    ? "bg-rose-50 text-rose-600 border border-rose-200/60"
                                    : item.priority === "Medium"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {item.priority === "High" && <span className="text-[8px]">▲</span>}
                                <span>{item.priority}</span>
                              </span>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-bold text-[#0a192f] leading-snug truncate">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {item.propertyUnit}
                                </p>
                                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                                  <span className="truncate">Reported by {item.reportedBy}</span>
                                  <span className="shrink-0 whitespace-nowrap">{item.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View All Requests link */}
                    <div className="mt-3 pt-2 text-center border-t border-slate-50">
                      <Link
                        href="/maintenance"
                        className="text-xs font-bold text-[#0a192f] hover:text-blue-600 transition"
                      >
                        View All Requests
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* BELOW THE TWO SUB-COLUMNS: VACANT UNITS */}
              <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3.5 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#0a192f]">Vacant Units</h2>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {VACANT_UNITS.slice(vacantScrollIndex, vacantScrollIndex + 3).map((unit) => (
                      <div
                        key={unit.id}
                        className="group border border-slate-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-all duration-200"
                      >
                        {/* Unit Image */}
                        <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={unit.image}
                            alt={`${unit.property} - ${unit.unit}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Unit Details */}
                        <div className="p-3 space-y-1.5">
                          <div>
                            <h4 className="text-xs font-bold text-[#0a192f] truncate">{unit.unit}</h4>
                            <p className="text-[11px] text-slate-500 truncate">{unit.property}</p>
                          </div>

                          <p className="text-[10px] text-slate-400 truncate">
                            {unit.beds} bd • {unit.baths} ba • {unit.sqft} sqft
                          </p>

                          <div>
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${unit.badgeColor}`}
                            >
                              {unit.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow Carousel Button */}
                  <button
                    type="button"
                    onClick={handleNextVacant}
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 shadow-md rounded-md flex items-center justify-center text-slate-600 hover:text-[#0a192f] hover:bg-slate-50 transition cursor-pointer z-10"
                    aria-label="Next vacant units"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* SECOND MAIN COLUMN: LEASE EXPIRATIONS AND RECENT ACTIVITY */}
            <div className="w-full lg:w-[310px] xl:w-[330px] shrink-0 space-y-4 sm:space-y-5">
              {/* Lease Expirations */}
              <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Lease Expirations</h2>
                    <Link href="/leases" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                      View all
                    </Link>
                  </div>

                  {/* Expirations List */}
                  <div className="mt-3.5 space-y-2.5">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between gap-2.5 p-0.5 min-w-0">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="bg-[#fff9eb] border border-[#fde68a] text-[#b45309] font-bold text-xs rounded-md px-2 py-1 text-center min-w-[48px] shrink-0 flex flex-col items-center justify-center">
                          <span className="text-xs leading-none">30</span>
                          <span className="text-[8.5px] font-medium leading-tight text-amber-700">Days</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0a192f] truncate">Maple Ridge Apts</h4>
                          <p className="text-[11px] text-slate-500 truncate">Unit 2B – Sarah Johnson</p>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-400 whitespace-nowrap shrink-0">Jun 12, 2024</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between gap-2.5 p-0.5 min-w-0">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="bg-[#fff9eb] border border-[#fde68a] text-[#b45309] font-bold text-xs rounded-md px-2 py-1 text-center min-w-[48px] shrink-0 flex flex-col items-center justify-center">
                          <span className="text-xs leading-none">45</span>
                          <span className="text-[8.5px] font-medium leading-tight text-amber-700">Days</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0a192f] truncate">Sunset Villas</h4>
                          <p className="text-[11px] text-slate-500 truncate">Unit 101 – Michael T.</p>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-400 whitespace-nowrap shrink-0">Jun 27, 2024</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between gap-2.5 p-0.5 min-w-0">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="bg-[#fff9eb] border border-[#fde68a] text-[#b45309] font-bold text-xs rounded-md px-2 py-1 text-center min-w-[48px] shrink-0 flex flex-col items-center justify-center">
                          <span className="text-xs leading-none">60</span>
                          <span className="text-[8.5px] font-medium leading-tight text-amber-700">Days</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0a192f] truncate">Lakeside Townhomes</h4>
                          <p className="text-[11px] text-slate-500 truncate">Unit 5 – Emily Davis</p>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-400 whitespace-nowrap shrink-0">Jul 12, 2024</span>
                    </div>
                  </div>
                </div>

                {/* View All Expirations Button */}
                <button
                  type="button"
                  className="mt-3.5 w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-md transition shadow-2xs cursor-pointer text-center"
                >
                  View All Expirations
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-[#0a192f] truncate">Recent Activity</h2>
                    <Link href="/reports" className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                      View all
                    </Link>
                  </div>

                  {/* Activity Timeline List */}
                  <div className="mt-3.5 space-y-2.5">
                    {/* Item 1 */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0a192f] truncate">Payment received</h4>
                        <p className="text-[11px] text-slate-600 truncate">$1,850 from Sarah Johnson</p>
                        <p className="text-[10px] text-slate-400 truncate">Maple Ridge Apts – Unit 2B</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">10:02 AM</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0a192f] truncate">New maintenance request</h4>
                        <p className="text-[11px] text-slate-600 truncate">Leaking faucet in bathroom</p>
                        <p className="text-[10px] text-slate-400 truncate">Sunset Villas – Unit 105</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">9:15 AM</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0a192f] truncate">Lease signed</h4>
                        <p className="text-[11px] text-slate-600 truncate">Michael Thompson signed lease</p>
                        <p className="text-[10px] text-slate-400 truncate">Sunset Villas – Unit 101</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">May 12</span>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0a192f] truncate">Payment received</h4>
                        <p className="text-[11px] text-slate-600 truncate">$2,100 from James Wilson</p>
                        <p className="text-[10px] text-slate-400 truncate">Lakeside Townhomes – Unit 3</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">May 12</span>
                    </div>
                  </div>
                </div>

                {/* View All Activity Button */}
                <button
                  type="button"
                  className="mt-3.5 w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-md transition shadow-2xs cursor-pointer text-center"
                >
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0a192f]">Add Property Task</h3>
              <button
                type="button"
                onClick={() => setIsAddTaskModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Inspect roof before monsoon"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#13233c]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Property</label>
                <select
                  value={taskProperty}
                  onChange={(e) => setTaskProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden"
                >
                  <option>Maple Ridge Apartments</option>
                  <option>Sunset Villas</option>
                  <option>Lakeside Townhomes</option>
                  <option>Oakwood Condos</option>
                  <option>Pine Creek Estates</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-md text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#13233c] text-white rounded-md font-semibold hover:bg-[#0c1728] shadow-xs cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

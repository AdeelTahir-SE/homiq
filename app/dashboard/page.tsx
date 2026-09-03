"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AgentSidebar from "@/components/AgentSidebar";

interface LeadItem {
  id: string;
  name: string;
  avatar?: string;
  role: "Buyer" | "Seller" | "Buyers";
  priceRange: string;
  location: string;
  statusInfo: string;
  badgeType?: "offer" | "negotiating" | "closed" | "time" | "neutral";
  actionType: "phone" | "email" | "calendar" | "none";
}

interface PipelineColumn {
  id: string;
  title: string;
  count: number;
  badgeBg: string;
  badgeText: string;
  leads: LeadItem[];
}

const INITIAL_PIPELINE: PipelineColumn[] = [
  {
    id: "new",
    title: "New",
    count: 23,
    badgeBg: "bg-[#fff3e0]",
    badgeText: "text-[#c05621]",
    leads: [
      {
        id: "l1",
        name: "Jessica Martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$450K – $650K",
        location: "Austin, TX",
        statusInfo: "5m ago",
        badgeType: "time",
        actionType: "phone",
      },
      {
        id: "l2",
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$300K – $500K",
        location: "Austin, TX",
        statusInfo: "15m ago",
        badgeType: "time",
        actionType: "phone",
      },
      {
        id: "l3",
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$500K – $800K",
        location: "Round Rock, TX",
        statusInfo: "1h ago",
        badgeType: "time",
        actionType: "phone",
      },
      {
        id: "l4",
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        role: "Seller",
        priceRange: "$600K+",
        location: "Austin, TX",
        statusInfo: "2h ago",
        badgeType: "time",
        actionType: "phone",
      },
    ],
  },
  {
    id: "contacted",
    title: "Contacted",
    count: 31,
    badgeBg: "bg-[#fef9c3]",
    badgeText: "text-[#854d0e]",
    leads: [
      {
        id: "l5",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$400K – $600K",
        location: "Austin, TX",
        statusInfo: "Today",
        badgeType: "time",
        actionType: "email",
      },
      {
        id: "l6",
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$350K – $550K",
        location: "Pflugerville, TX",
        statusInfo: "Today",
        badgeType: "time",
        actionType: "email",
      },
      {
        id: "l7",
        name: "Amanda Lee",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
        role: "Seller",
        priceRange: "$550K+",
        location: "Austin, TX",
        statusInfo: "Yesterday",
        badgeType: "time",
        actionType: "email",
      },
      {
        id: "l8",
        name: "Chris Davis",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$450K – $700K",
        location: "Cedar Park, TX",
        statusInfo: "Yesterday",
        badgeType: "time",
        actionType: "email",
      },
    ],
  },
  {
    id: "touring",
    title: "Touring",
    count: 18,
    badgeBg: "bg-[#e0f2fe]",
    badgeText: "text-[#0369a1]",
    leads: [
      {
        id: "l9",
        name: "Ryan Anderson",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$500K – $900K",
        location: "Austin, TX",
        statusInfo: "Today at 11:00 AM",
        badgeType: "time",
        actionType: "calendar",
      },
      {
        id: "l10",
        name: "Megan Sullivan",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$600K – $1M+",
        location: "West Lake Hills, TX",
        statusInfo: "Today at 1:30 PM",
        badgeType: "time",
        actionType: "calendar",
      },
      {
        id: "l11",
        name: "Brandon Lee",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$400K – $650K",
        location: "Austin, TX",
        statusInfo: "Tomorrow at 10:00 AM",
        badgeType: "time",
        actionType: "calendar",
      },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    count: 9,
    badgeBg: "bg-[#f3e8ff]",
    badgeText: "text-[#7e22ce]",
    leads: [
      {
        id: "l12",
        name: "Nicole Garcia",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$750K",
        location: "Austin, TX",
        statusInfo: "Offer sent",
        badgeType: "offer",
        actionType: "none",
      },
      {
        id: "l13",
        name: "Mark & Lisa T.",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
        role: "Buyers",
        priceRange: "$620K",
        location: "Round Rock, TX",
        statusInfo: "Negotiating",
        badgeType: "negotiating",
        actionType: "none",
      },
      {
        id: "l14",
        name: "Daniel Kim",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$810K",
        location: "West Lake Hills, TX",
        statusInfo: "Offer sent",
        badgeType: "offer",
        actionType: "none",
      },
    ],
  },
  {
    id: "closed",
    title: "Closed",
    count: 14,
    badgeBg: "bg-[#dcfce7]",
    badgeText: "text-[#15803d]",
    leads: [
      {
        id: "l15",
        name: "Taylor Family",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$560K",
        location: "Austin, TX",
        statusInfo: "Closed 5/12",
        badgeType: "closed",
        actionType: "none",
      },
      {
        id: "l16",
        name: "Kevin Wright",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
        role: "Seller",
        priceRange: "$640K",
        location: "Austin, TX",
        statusInfo: "Closed 5/10",
        badgeType: "closed",
        actionType: "none",
      },
      {
        id: "l17",
        name: "Samantha Lee",
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$705K",
        location: "Pflugerville, TX",
        statusInfo: "Closed 5/08",
        badgeType: "closed",
        actionType: "none",
      },
      {
        id: "l18",
        name: "Jason Miller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        role: "Buyer",
        priceRange: "$480K",
        location: "Austin, TX",
        statusInfo: "Closed 5/01",
        badgeType: "closed",
        actionType: "none",
      },
    ],
  },
];

const INITIAL_TASKS = [
  { id: "t1", time: "9:00 AM", title: "Follow up with Jessica M.", category: "Lead", icon: "phone", completed: false },
  { id: "t2", time: "10:30 AM", title: "Prepare CMA for 2107 Oak Dr", category: "Task", icon: "doc", completed: false },
  { id: "t3", time: "12:00 PM", title: "Call David Thompson", category: "Lead", icon: "phone", completed: false },
  { id: "t4", time: "2:00 PM", title: "Team huddle", category: "Meeting", icon: "team", completed: false },
  { id: "t5", time: "3:30 PM", title: "Marketing email review", category: "Task", icon: "email", completed: false },
  { id: "t6", time: "5:00 PM", title: "Update listing: 310 Bowie St", category: "Task", icon: "edit", completed: false },
];

const TODAY_SHOWINGS = [
  {
    id: "s1",
    time: "11:00 AM",
    title: "1234 Maple Ridge Dr",
    address: "Austin, TX 78746",
    client: "Ryan Anderson",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&auto=format&fit=crop&q=80",
    phone: "(512) 555-0143",
  },
  {
    id: "s2",
    time: "1:30 PM",
    title: "310 Bowie St, #2205",
    address: "Austin, TX 78703",
    client: "Megan Sullivan",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&auto=format&fit=crop&q=80",
    phone: "(512) 555-0189",
  },
  {
    id: "s3",
    time: "3:00 PM",
    title: "8809 Summit Oaks Ln",
    address: "Austin, TX 78759",
    client: "Brandon Lee",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&auto=format&fit=crop&q=80",
    phone: "(512) 555-0177",
  },
];

export default function DashboardPage() {
  const [pipeline, setPipeline] = useState<PipelineColumn[]>(INITIAL_PIPELINE);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState("All Pipelines");
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string>("new");

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadRole, setNewLeadRole] = useState<"Buyer" | "Seller">("Buyer");
  const [newLeadPrice, setNewLeadPrice] = useState("$500K – $700K");
  const [newLeadLocation, setNewLeadLocation] = useState("Austin, TX");

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleOpenAddLead = (columnId: string = "new") => {
    setTargetColumnId(columnId);
    setIsAddLeadModalOpen(true);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: newLeadRole,
      priceRange: newLeadPrice,
      location: newLeadLocation,
      statusInfo: "Just now",
      badgeType: "time",
      actionType: "phone",
    };

    setPipeline((prev) =>
      prev.map((col) =>
        col.id === targetColumnId
          ? { ...col, count: col.count + 1, leads: [newLead, ...col.leads] }
          : col
      )
    );

    setNewLeadName("");
    setIsAddLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a192f] flex font-sans">
      {/* Agent Sidebar */}
      <AgentSidebar activeItem="Dashboard" />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search leads, properties, or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#0a192f]/20 transition"
            />
          </div>

          {/* Right Section: Notifications, Messages, Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Bell Notification */}
            <button
              type="button"
              className="relative p-2 text-slate-600 hover:text-[#0a192f] transition cursor-pointer"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mail Icon */}
            <button
              type="button"
              className="p-2 text-slate-600 hover:text-[#0a192f] transition cursor-pointer"
              aria-label="Messages"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Emma Clark"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-[#0a192f] leading-tight">
                  Emma Clark
                </p>
                <p className="text-[11px] text-slate-500">Broker/Owner</p>
              </div>
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {/* Dashboard Main Scrollable Area */}
        <main className="p-6 lg:p-8 space-y-7 overflow-y-auto">
          {/* Welcome Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
              Good morning, Emma 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          {/* 1. TOP STATS ROW (5 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Active Listings */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#fdf8f0] flex items-center justify-center flex-shrink-0 p-2.5">
                <Image
                  src="/icons/dashboard/active-listings-icon.png"
                  alt="Active Listings"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Active Listings</p>
                <h3 className="text-2xl font-black text-[#0a192f] mt-0.5">28</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>▲ 12%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Total Leads */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#f0f9ff] flex items-center justify-center flex-shrink-0 p-2.5">
                <Image
                  src="/icons/dashboard/total-leads-icon.png"
                  alt="Total Leads"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Leads</p>
                <h3 className="text-2xl font-black text-[#0a192f] mt-0.5">152</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>▲ 18%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Under Contract */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#fdf2f8] flex items-center justify-center flex-shrink-0 p-2.5">
                <Image
                  src="/icons/dashboard/under-contract-icon.png"
                  alt="Under Contract"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Under Contract</p>
                <h3 className="text-2xl font-black text-[#0a192f] mt-0.5">7</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>▲ 8%</span> <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
            </div>

            {/* Closed (YTD) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#f0fdf4] flex items-center justify-center flex-shrink-0 p-2.5">
                <Image
                  src="/icons/dashboard/closed-icon.png"
                  alt="Closed YTD"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Closed (YTD)</p>
                <h3 className="text-2xl font-black text-[#0a192f] mt-0.5">24</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>▲ 26%</span> <span className="text-slate-400 font-normal">vs last year</span>
                </p>
              </div>
            </div>

            {/* Total Sales (YTD) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#fefce8] flex items-center justify-center flex-shrink-0 p-2.5">
                <Image
                  src="/icons/dashboard/total-sales-icon.png"
                  alt="Total Sales"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Sales (YTD)</p>
                <h3 className="text-2xl font-black text-[#0a192f] mt-0.5">$14.2M</h3>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>▲ 31%</span> <span className="text-slate-400 font-normal">vs last year</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. MIDDLE SPLIT SECTION: LEAD PIPELINE (LEFT) & TODAY'S TASKS/SHOWINGS (RIGHT) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
            {/* Left 8 Cols: LEAD PIPELINE KANBAN */}
            <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
              {/* Pipeline Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-[#0a192f]">Lead Pipeline</h2>

                <div className="flex items-center gap-3">
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={pipelineFilter}
                      onChange={(e) => setPipelineFilter(e.target.value)}
                      className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 pr-7 cursor-pointer focus:outline-hidden"
                    >
                      <option>All Pipelines</option>
                      <option>Buyers Pipeline</option>
                      <option>Sellers Pipeline</option>
                    </select>
                    <svg className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Add Lead Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenAddLead("new")}
                    className="bg-[#0a192f] hover:bg-[#071325] text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <span className="text-sm leading-none">+</span>
                    <span>Add Lead</span>
                  </button>
                </div>
              </div>

              {/* 5 Kanban Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
                {pipeline.map((col) => (
                  <div key={col.id} className="space-y-3">
                    {/* Column Header Pill */}
                    <div className={`flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200/70 ${col.badgeBg}`}>
                      <span className={`text-xs font-bold ${col.badgeText}`}>
                        {col.title}
                      </span>
                      <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md bg-white/80 ${col.badgeText}`}>
                        {col.count}
                      </span>
                    </div>

                    {/* Column Lead Cards */}
                    <div className="space-y-2.5">
                      {col.leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:border-slate-300 transition-all duration-150 space-y-2"
                        >
                          {/* Lead Top: Avatar & Name */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-100 flex-shrink-0">
                                {lead.avatar ? (
                                  <Image
                                    src={lead.avatar}
                                    alt={lead.name}
                                    fill
                                    sizes="24px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                    {lead.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#0a192f] truncate leading-tight">
                                  {lead.name}
                                </h4>
                                <p className="text-[10px] text-slate-400">
                                  {lead.role}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Price & Location */}
                          <div className="text-[11px]">
                            <span className="font-bold text-[#0a192f] block">
                              {lead.priceRange}
                            </span>
                            <span className="text-slate-400 block text-[10px]">
                              {lead.location}
                            </span>
                          </div>

                          {/* Card Footer: Status or Action icon */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px]">
                            {/* Status tag */}
                            {lead.badgeType === "offer" ? (
                              <span className="text-purple-600 font-semibold">
                                {lead.statusInfo}
                              </span>
                            ) : lead.badgeType === "negotiating" ? (
                              <span className="text-indigo-600 font-semibold">
                                {lead.statusInfo}
                              </span>
                            ) : lead.badgeType === "closed" ? (
                              <span className="text-emerald-600 font-semibold">
                                {lead.statusInfo}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-medium">
                                {lead.statusInfo}
                              </span>
                            )}

                            {/* Action Icon */}
                            {lead.actionType === "phone" && (
                              <a
                                href="tel:5125550100"
                                className="text-slate-400 hover:text-[#0a192f] transition p-0.5"
                                title="Call Lead"
                              >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </a>
                            )}

                            {lead.actionType === "email" && (
                              <a
                                href={`mailto:${lead.name.toLowerCase().replace(/\s+/g, ".")}@example.com`}
                                className="text-slate-400 hover:text-[#0a192f] transition p-0.5"
                                title="Send Email"
                              >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </a>
                            )}

                            {lead.actionType === "calendar" && (
                              <span className="text-slate-400 p-0.5">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Lead Button at Column Bottom */}
                      <button
                        type="button"
                        onClick={() => handleOpenAddLead(col.id)}
                        className="w-full py-2 border border-dashed border-slate-200 hover:border-slate-300 rounded-xl text-[11px] font-semibold text-slate-500 hover:text-[#0a192f] transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>+ Add Lead</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: TODAY'S TASKS & TODAY'S SHOWINGS */}
            <div className="xl:col-span-4 space-y-6">
              {/* Today's Tasks */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a192f]">Today&apos;s Tasks</h3>
                    <span className="bg-[#fef3e2] text-[#b45309] text-[11px] font-bold px-1.5 py-0.2 rounded-md">
                      6
                    </span>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between gap-3 text-xs p-1.5 rounded-lg transition ${
                        task.completed ? "opacity-50 line-through" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f] cursor-pointer"
                        />
                        <span className="font-semibold text-slate-500 whitespace-nowrap text-[11px]">
                          {task.time}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0a192f] truncate text-xs">
                            {task.title}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {task.category}
                          </span>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="text-slate-400 flex-shrink-0">
                        {task.icon === "phone" && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {task.icon === "doc" && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {task.icon === "team" && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {task.icon === "email" && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {task.icon === "edit" && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <Link
                    href="/tasks"
                    className="text-xs font-bold text-[#0a192f] hover:text-[#d99738] transition"
                  >
                    View All Tasks
                  </Link>
                </div>
              </div>

              {/* Today's Showings */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a192f]">Today&apos;s Showings</h3>
                    <span className="bg-[#fef3e2] text-[#b45309] text-[11px] font-bold px-1.5 py-0.2 rounded-md">
                      3
                    </span>
                  </div>
                </div>

                {/* Showings List */}
                <div className="space-y-3">
                  {TODAY_SHOWINGS.map((showing) => (
                    <div
                      key={showing.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-100/70 transition"
                    >
                      {/* House Thumbnail */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                        <Image
                          src={showing.image}
                          alt={showing.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-[#b45309] block">
                          {showing.time}
                        </span>
                        <Link
                          href="/house-detail"
                          className="text-xs font-bold text-[#0a192f] hover:text-[#d99738] truncate block"
                        >
                          {showing.title}
                        </Link>
                        <p className="text-[10px] text-slate-500 truncate">
                          {showing.address}
                        </p>
                        <p className="text-[10px] font-medium text-slate-700 mt-0.5">
                          {showing.client}
                        </p>
                      </div>

                      {/* Phone Icon */}
                      <a
                        href={`tel:${showing.phone.replace(/\D/g, "")}`}
                        className="p-2 text-slate-400 hover:text-[#0a192f] transition"
                        title={`Call ${showing.client}`}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <Link
                    href="/calendar"
                    className="text-xs font-bold text-[#0a192f] hover:text-[#d99738] transition"
                  >
                    View Full Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM ROW: LISTINGS OVERVIEW, RECENT ACTIVITY & SALES SNAPSHOT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Listings Overview (Donut Chart) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0a192f]">Listings Overview</h3>
                <div className="relative">
                  <select className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-hidden cursor-pointer">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Donut Chart & Legend */}
              <div className="flex items-center gap-6 pt-2">
                {/* SVG Donut Chart */}
                <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="4"
                    />
                    {/* Active: 64% -> strokeDasharray="56.3 31.7" stroke="#0ea5e9" */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="4"
                      strokeDasharray="56.3 31.7"
                      strokeDashoffset="0"
                    />
                    {/* Under Contract: 18% -> strokeDasharray="15.8 72.2" stroke="#0a192f" */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#0a192f"
                      strokeWidth="4"
                      strokeDasharray="15.8 72.2"
                      strokeDashoffset="-56.3"
                    />
                    {/* Pending: 11% -> strokeDasharray="9.7 78.3" stroke="#f59e0b" */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeDasharray="9.7 78.3"
                      strokeDashoffset="-72.1"
                    />
                    {/* Sold: 7% -> strokeDasharray="6.2 81.8" stroke="#10b981" */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeDasharray="6.2 81.8"
                      strokeDashoffset="-81.8"
                    />
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-[#0a192f] leading-none">28</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">Total</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2 text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9]" />
                      <span className="text-slate-600 font-medium">Active</span>
                    </div>
                    <span className="font-bold text-[#0a192f]">18 (64%)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0a192f]" />
                      <span className="text-slate-600 font-medium">Under Contract</span>
                    </div>
                    <span className="font-bold text-[#0a192f]">5 (18%)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <span className="text-slate-600 font-medium">Pending</span>
                    </div>
                    <span className="font-bold text-[#0a192f]">3 (11%)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                      <span className="text-slate-600 font-medium">Sold</span>
                    </div>
                    <span className="font-bold text-[#0a192f]">2 (7%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-[#0a192f]">Recent Activity</h3>

              <div className="space-y-3.5 text-xs">
                {/* Activity 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 leading-snug">
                      New lead <strong className="font-bold text-[#0a192f]">Jessica Martinez</strong> was added
                    </p>
                    <span className="text-[10px] text-slate-400">5 minutes ago</span>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 leading-snug">
                      Property <strong className="font-bold text-[#0a192f]">1234 Maple Ridge Dr</strong> updated
                    </p>
                    <span className="text-[10px] text-slate-400">1 hour ago</span>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 leading-snug">
                      Offer accepted on <strong className="font-bold text-[#0a192f]">456 River View Dr</strong>
                    </p>
                    <span className="text-[10px] text-slate-400">3 hours ago</span>
                  </div>
                </div>

                {/* Activity 4 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 leading-snug">
                      New showing scheduled for today at <strong className="font-bold text-[#0a192f]">1:30 PM</strong>
                    </p>
                    <span className="text-[10px] text-slate-400">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Sales Snapshot (YTD) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0a192f]">Sales Snapshot (YTD)</h3>
                <div className="relative">
                  <select className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-hidden cursor-pointer">
                    <option>This Year</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>

              {/* Total Sales Volume */}
              <div>
                <span className="text-3xl font-black text-[#0a192f] block">
                  $14.2M
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Total Sales Volume
                </p>
                <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <span>▲ 31%</span> <span className="text-slate-400 font-normal">vs last year</span>
                </p>
              </div>

              {/* 2 Stats Mini Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="bg-slate-50/70 p-3 rounded-xl">
                  <span className="text-xl font-black text-[#0a192f]">24</span>
                  <p className="text-[11px] text-slate-500 font-medium">Closed Transactions</p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                    ▲ 26% <span className="text-slate-400 font-normal">vs last year</span>
                  </p>
                </div>

                <div className="bg-slate-50/70 p-3 rounded-xl">
                  <span className="text-xl font-black text-[#0a192f]">$591K</span>
                  <p className="text-[11px] text-slate-500 font-medium">Average Sale Price</p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                    ▲ 9% <span className="text-slate-400 font-normal">vs last year</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative animate-scale-up">
            <button
              type="button"
              onClick={() => setIsAddLeadModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <h3 className="text-lg font-bold text-[#0a192f]">Add New Lead</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter details to add lead to the {targetColumnId.toUpperCase()} stage.
              </p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Smith"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newLeadRole}
                    onChange={(e) => setNewLeadRole(e.target.value as "Buyer" | "Seller")}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Budget / Price
                  </label>
                  <input
                    type="text"
                    value={newLeadPrice}
                    onChange={(e) => setNewLeadPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Location
                </label>
                <input
                  type="text"
                  value={newLeadLocation}
                  onChange={(e) => setNewLeadLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0a192f] hover:bg-[#071325] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

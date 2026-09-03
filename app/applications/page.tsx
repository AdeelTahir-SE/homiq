"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  iconType: "id-card" | "income" | "letter" | "rental" | "references" | "generic";
  status: "Verified" | "In Review" | "Pending";
  statusNote: string;
  uploadDate: string;
  uploadTime?: string;
  fileSize?: string;
  fileName?: string;
  canUpload?: boolean;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Government-issued ID",
    description: "Driver's License, Passport, or State ID",
    iconType: "id-card",
    status: "Verified",
    statusNote: "All good!",
    uploadDate: "May 9, 2024",
    uploadTime: "10:23 AM",
    fileSize: "2.4 MB",
    fileName: "Drivers_License_Olivia_Bennett.pdf",
    canUpload: false,
  },
  {
    id: "doc-2",
    name: "Proof of Income",
    description: "Recent pay stubs or bank statements (Last 2 months)",
    iconType: "income",
    status: "Verified",
    statusNote: "All good!",
    uploadDate: "May 9, 2024",
    uploadTime: "10:25 AM",
    fileSize: "3.1 MB",
    fileName: "Paystubs_March_April_2024.pdf",
    canUpload: false,
  },
  {
    id: "doc-3",
    name: "Pre-approval Letter (if applicable)",
    description: "Mortgage pre-approval or lender letter",
    iconType: "letter",
    status: "Verified",
    statusNote: "All good!",
    uploadDate: "May 10, 2024",
    uploadTime: "2:15 PM",
    fileSize: "1.2 MB",
    fileName: "PreApproval_Letter_AustinCap.pdf",
    canUpload: false,
  },
  {
    id: "doc-4",
    name: "Rental History Verification",
    description: "Previous landlord contact or reference",
    iconType: "rental",
    status: "In Review",
    statusNote: "Under review",
    uploadDate: "May 11, 2024",
    uploadTime: "9:41 AM",
    fileSize: "1.8 MB",
    fileName: "Landlord_Verification_Form.pdf",
    canUpload: false,
  },
  {
    id: "doc-5",
    name: "References",
    description: "Personal or professional references",
    iconType: "references",
    status: "Pending",
    statusNote: "Not uploaded",
    uploadDate: "—",
    canUpload: true,
  },
];

export default function ApplicationsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sidebar navigation items
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: "Saved Properties",
      href: "/search-house",
      badge: 24,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: "Saved Searches",
      href: "/search-house",
      badge: 3,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      name: "Messages",
      href: "/messages",
      badge: 12,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      name: "Tours",
      href: "/schedule-tour",
      badge: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Applications",
      href: "/applications",
      badge: 1,
      isActive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "Documents",
      href: "/applications",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      name: "Profile & Settings",
      href: "/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  // Handle document upload simulation
  const handleFileUpload = (fileName: string) => {
    // Update references document if pending, or add new
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === "doc-5") {
          return {
            ...doc,
            status: "In Review",
            statusNote: "Under review",
            uploadDate: "May 13, 2024",
            uploadTime: "1:15 PM",
            fileSize: "2.1 MB",
            fileName: fileName || "Professional_References_Olivia.pdf",
            canUpload: false,
          };
        }
        return doc;
      })
    );
    setUploadSuccessToast(`File "${fileName}" uploaded successfully!`);
    setTimeout(() => setUploadSuccessToast(null), 4000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0].name);
    }
  };

  // Render document icon based on type
  const renderDocIcon = (type: DocumentItem["iconType"]) => {
    switch (type) {
      case "id-card":
        return (
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
        );
      case "income":
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
          </div>
        );
      case "letter":
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case "rental":
        return (
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700 flex-shrink-0">
            <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
      case "references":
        return (
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a192f] flex flex-col font-sans selection:bg-slate-200">
      {/* Top Navbar */}
      <Navbar activeTab="Buy" showSearch={true} searchPlaceholder="Search properties, neighborhoods..." />

      {/* Main Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] hidden lg:flex flex-col justify-between p-4 sm:p-5 select-none sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          {/* Navigation Items */}
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = item.isActive;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer ${
                    isActive
                      ? "bg-[#0a192f] text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-white" : "text-slate-500 group-hover:text-[#0a192f]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-amber-500 text-white"
                          : "bg-[#fed7aa] text-[#c2410c]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Need help box */}
          <div className="mt-8 pt-4">
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-4 text-left">
              <h4 className="text-sm font-bold text-[#0a192f]">Need help?</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our team is here to help you complete your application.
              </p>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="mt-3.5 w-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0a192f] text-xs font-semibold py-2.5 px-3 rounded-xl shadow-2xs transition duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
                </svg>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Header & Property Summary Card */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* Left Page Title & Back Link */}
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0a192f] transition-colors group cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Applications</span>
              </Link>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                  Application / Document Center
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Track your application progress and manage required documents.
                </p>
              </div>
            </div>

            {/* Right Property Thumbnail Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition duration-150">
              <div className="relative w-24 sm:w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80"
                  alt="310 Bowie St, #2205"
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-[#0a192f] leading-tight">
                  310 Bowie St, #2205
                </h3>
                <p className="text-xs text-slate-500">Austin, TX 78703</p>
                <p className="text-xs font-medium text-slate-600">
                  <span className="font-semibold text-slate-800">$2,600</span> / month &nbsp;•&nbsp; 2 bd &nbsp;•&nbsp; 2 ba &nbsp;•&nbsp; 1,145 sqft
                </p>
                <div className="pt-1">
                  <Link
                    href="/house-detail"
                    className="inline-block bg-white hover:bg-slate-50 border border-slate-300 text-[#0a192f] text-[11px] font-semibold py-1 px-3 rounded-lg shadow-2xs transition duration-150"
                  >
                    View Property
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Application Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-[#0a192f]">
                Application Progress
              </h2>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  In Review
                </span>
                <span className="text-xs text-slate-400">
                  Last updated: May 13, 2024
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[680px] flex items-center justify-between relative px-4">
                {/* Step 1: Application Started */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">
                    Application Started
                  </span>
                  <span className="text-[11px] text-slate-400">May 8, 2024</span>
                </div>

                {/* Connector Line 1 */}
                <div className="flex-1 h-0.5 bg-emerald-600 -mx-3 -mt-9" />

                {/* Step 2: Personal Information */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">
                    Personal Information
                  </span>
                  <span className="text-[11px] text-slate-400">Completed</span>
                </div>

                {/* Connector Line 2 */}
                <div className="flex-1 h-0.5 bg-emerald-600 -mx-3 -mt-9" />

                {/* Step 3: Financial Information */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">
                    Financial Information
                  </span>
                  <span className="text-[11px] text-slate-400">Completed</span>
                </div>

                {/* Connector Line 3 */}
                <div className="flex-1 h-0.5 bg-emerald-600 -mx-3 -mt-9" />

                {/* Step 4: Documents (Active) */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-[#0a192f] text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-slate-100">
                    4
                  </div>
                  <span className="mt-2 text-xs font-extrabold text-[#0a192f]">
                    Documents
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">In Review</span>
                </div>

                {/* Connector Line 4 */}
                <div className="flex-1 h-0.5 bg-slate-200 -mx-3 -mt-9" />

                {/* Step 5: Review */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <span className="mt-2 text-xs font-medium text-slate-500">
                    Review
                  </span>
                  <span className="text-[11px] text-slate-400">Pending</span>
                </div>

                {/* Connector Line 5 */}
                <div className="flex-1 h-0.5 bg-slate-200 -mx-3 -mt-9" />

                {/* Step 6: Decision */}
                <div className="flex flex-col items-center text-center z-10 w-28">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
                    6
                  </div>
                  <span className="mt-2 text-xs font-medium text-slate-500">
                    Decision
                  </span>
                  <span className="text-[11px] text-slate-400">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid: Required Documents (Left) + E-Signature & Summary (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Required Documents */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
                {/* Header */}
                <div>
                  <h2 className="text-base font-bold text-[#0a192f]">
                    Required Documents
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload clear, valid documents to keep your application moving forward.
                  </p>
                </div>

                {/* Documents Table / List */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        <th className="pb-3 font-semibold pl-2">Document</th>
                        <th className="pb-3 font-semibold px-4">Status</th>
                        <th className="pb-3 font-semibold px-4">Uploaded</th>
                        <th className="pb-3 font-semibold text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors group">
                          {/* Document Name & Description */}
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3.5">
                              {renderDocIcon(doc.iconType)}
                              <div>
                                <h4 className="font-bold text-[#0a192f] text-xs sm:text-sm">
                                  {doc.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {doc.description}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status Badge & Subtitle */}
                          <td className="py-4 px-4 align-middle">
                            <div className="space-y-0.5">
                              {doc.status === "Verified" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Verified
                                </span>
                              )}
                              {doc.status === "In Review" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                  In Review
                                </span>
                              )}
                              {doc.status === "Pending" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                  Pending
                                </span>
                              )}
                              <p className="text-[11px] text-slate-500">
                                {doc.statusNote}
                              </p>
                            </div>
                          </td>

                          {/* Upload Date & Time */}
                          <td className="py-4 px-4 align-middle">
                            <div className="text-slate-700 font-medium text-[11px]">
                              <div>{doc.uploadDate}</div>
                              {doc.uploadTime && (
                                <div className="text-slate-400 text-[10px]">{doc.uploadTime}</div>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 pr-2 text-right align-middle relative">
                            <div className="inline-flex items-center gap-2">
                              {doc.canUpload ? (
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="bg-white hover:bg-slate-50 border border-slate-300 text-[#0a192f] text-xs font-semibold py-1.5 px-3 rounded-lg shadow-2xs transition cursor-pointer"
                                >
                                  Upload
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setViewingDoc(doc)}
                                  className="bg-white hover:bg-slate-50 border border-slate-300 text-[#0a192f] text-xs font-semibold py-1.5 px-3 rounded-lg shadow-2xs transition cursor-pointer"
                                >
                                  View
                                </button>
                              )}

                              {/* Three-dots menu button */}
                              <div className="relative inline-block text-left">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveMenuId(activeMenuId === doc.id ? null : doc.id)
                                  }
                                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                                  aria-label="More options"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {activeMenuId === doc.id && (
                                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setViewingDoc(doc);
                                        setActiveMenuId(null);
                                      }}
                                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                                    >
                                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                      <span>Preview</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        fileInputRef.current?.click();
                                        setActiveMenuId(null);
                                      }}
                                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                                    >
                                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                      </svg>
                                      <span>Replace File</span>
                                    </button>

                                    <div className="border-t border-slate-100 my-1" />

                                    <button
                                      type="button"
                                      onClick={() => {
                                        alert("Download started for " + (doc.fileName || doc.name));
                                        setActiveMenuId(null);
                                      }}
                                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                                    >
                                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                      <span>Download</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Drag and Drop Upload Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors duration-150 ${
                    isDragging
                      ? "border-amber-500 bg-amber-50/40"
                      : "border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-slate-600 mb-1">
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#0a192f]">
                      Upload Additional Document
                    </h4>

                    <p className="text-xs text-slate-500">
                      Drag and drop files here, or{" "}
                      <span className="text-[#0a192f] font-semibold underline underline-offset-2">
                        browse
                      </span>
                    </p>

                    <p className="text-[11px] text-slate-400 pt-1">
                      Accepted formats: PDF, JPG, PNG &nbsp;•&nbsp; Max size: 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: E-Signature Status & Application Summary */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card 1: E-Signature Status */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm sm:text-base font-bold text-[#0a192f]">
                    E-Signature Status
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Completed
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-[#0a192f] text-xs sm:text-sm">
                        Lease Agreement
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Rental Agreement – 12 Months
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Signed</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        May 12, 2024
                      </p>
                      <p className="text-[10px] text-slate-400">11:16 AM</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100" />

                  {/* Item 2 */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-[#0a192f] text-xs sm:text-sm">
                        Authorization to Run Background Check
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Consent &amp; Disclosure Form
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Signed</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        May 12, 2024
                      </p>
                      <p className="text-[10px] text-slate-400">11:17 AM</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      alert("Opening signed document repository. Both documents are certified.")
                    }
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#0a192f] transition cursor-pointer group"
                  >
                    <span>View All Signed Documents</span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Card 2: Application Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-[#0a192f] border-b border-slate-100 pb-3">
                  Application Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Application ID</span>
                    <span className="font-semibold text-slate-800">APP-8274-310B</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Application Type</span>
                    <span className="font-bold text-[#0a192f]">Rental</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Applicant</span>
                    <span className="font-bold text-[#0a192f]">Olivia Bennett</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-slate-500">Property</span>
                    <div className="text-right">
                      <p className="font-bold text-[#0a192f]">310 Bowie St, #2205</p>
                      <p className="text-[11px] text-slate-500">Austin, TX 78703</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Monthly Rent</span>
                    <span className="font-bold text-[#0a192f]">$2,600</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Application Date</span>
                    <span className="font-semibold text-slate-800">May 8, 2024</span>
                  </div>
                </div>

                {/* Withdraw Application Action */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer group"
                  >
                    <svg className="w-4 h-4 text-red-500 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Withdraw Application</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Banner */}
          <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#0a192f] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0a192f]">
                  Your information is secure
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  We use bank-level encryption to protect your personal information and documents.
                </p>
              </div>
            </div>

            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0a192f] transition flex-shrink-0 ml-11 sm:ml-0"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Privacy &amp; Security</span>
            </Link>
          </div>
        </main>
      </div>

      {/* MODAL 1: Document Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              type="button"
              onClick={() => setViewingDoc(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {renderDocIcon(viewingDoc.iconType)}
              <div>
                <h3 className="text-base font-bold text-[#0a192f]">
                  {viewingDoc.name}
                </h3>
                <p className="text-xs text-slate-500">{viewingDoc.fileName || "Verified Document Record"}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700">{viewingDoc.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Uploaded On:</span>
                <span className="font-semibold text-slate-800">{viewingDoc.uploadDate} {viewingDoc.uploadTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">File Size:</span>
                <span className="font-semibold text-slate-800">{viewingDoc.fileSize || "2.4 MB"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Encryption:</span>
                <span className="font-semibold text-slate-800">256-bit AES Certified</span>
              </div>
            </div>

            {/* Document preview mock graphic */}
            <div className="h-44 bg-slate-100 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs font-medium">Document preview loaded securely</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert("Downloading document: " + (viewingDoc.fileName || viewingDoc.name));
                  setViewingDoc(null);
                }}
                className="flex-1 bg-[#0a192f] hover:bg-[#071325] text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer text-center"
              >
                Download Document
              </button>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Withdraw Application Confirmation Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl font-black">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#0a192f]">
                Withdraw Application?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to withdraw your rental application for{" "}
                <span className="font-semibold text-slate-800">310 Bowie St, #2205</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert("Application APP-8274-310B has been withdrawn.");
                  setIsWithdrawModalOpen(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Yes, Withdraw
              </button>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Contact Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-[#0a192f]">
                Contact Support
              </h3>
              <p className="text-xs text-slate-500">
                Have questions regarding your application? Our concierge team is ready to help.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0a192f]">Email Support</p>
                  <p className="text-slate-500 text-[11px]">support@homiq.com</p>
                </div>
                <a
                  href="mailto:support@homiq.com"
                  className="bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg font-semibold text-slate-800 text-xs"
                >
                  Email
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0a192f]">Direct Hotline</p>
                  <p className="text-slate-500 text-[11px]">1-800-555-HOMIQ (24/7)</p>
                </div>
                <a
                  href="tel:18005554664"
                  className="bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg font-semibold text-slate-800 text-xs"
                >
                  Call
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSupportModalOpen(false)}
              className="w-full bg-[#0a192f] hover:bg-[#071325] text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer text-center"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a192f] text-white text-xs font-semibold py-3 px-5 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
            ✓
          </span>
          <span>{uploadSuccessToast}</span>
        </div>
      )}
    </div>
  );
}

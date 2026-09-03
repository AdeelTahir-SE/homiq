"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PropertyManagerSidebarProps {
  activeItem?: string;
  className?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface SidebarItem {
  name: string;
  href: string;
  badge?: number;
  icon: (active: boolean) => React.ReactNode;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Overview",
    href: "/property-manager-overview",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Properties",
    href: "/properties",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: "Units & Tenants",
    href: "/units-tenants",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Leases",
    href: "/leases",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Rent Collection",
    href: "/rent-collection",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: "Accounting",
    href: "/accounting",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Documents",
    href: "/documents",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Messages",
    href: "/messages",
    badge: 8,
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#0D254F]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function PropertyManagerSidebar({
  activeItem = "Overview",
  className = "",
  mobileOpen = false,
  onMobileClose,
}: PropertyManagerSidebarProps) {
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header & Navigation */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-3 py-1">
          <Link href="/property-manager-overview" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="HOMIQ Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-wider text-[#0D254F]">
              HOMIQ
            </span>
          </Link>

          {/* Close button for mobile */}
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="lg:hidden p-1.5 text-slate-500 hover:text-[#0D254F] rounded-md transition cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              activeItem.toLowerCase() === item.name.toLowerCase();

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-semibold transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? "bg-[#0D254F] text-white shadow-xs"
                    : "text-[#0D254F] hover:bg-[#0D254F]/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`flex-shrink-0 transition-colors ${isActive ? "text-white" : "text-[#0D254F]"}`}>
                    {item.icon(isActive)}
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#fed7aa] text-[#c2410c]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card: Manage on the go */}
      <div className="mt-8 pt-4">
        <div className="bg-white border border-[#ece5de] rounded-md p-3.5 text-left relative shadow-2xs">
          <h4 className="text-xs font-bold text-[#0D254F]">Manage on the go</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Access your properties, tenants, and tasks from anywhere.
          </p>

          <div className="mt-3.5 space-y-2">
            {/* App Store Button */}
            <button
              type="button"
              onClick={() => alert("HOMIQ iOS App coming soon to Apple App Store!")}
              className="w-full flex items-center justify-start gap-3 bg-black hover:bg-zinc-900 text-white px-3.5 py-2.5 rounded-md text-left transition shadow-2xs cursor-pointer"
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src="/icons/apple-icon.png"
                  alt="Apple Logo"
                  fill
                  sizes="24px"
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="leading-tight text-left">
                <span className="block text-[9.5px] uppercase tracking-wider text-zinc-300 font-medium leading-none">
                  Download on the
                </span>
                <span className="block text-sm font-bold leading-tight text-white mt-0.5">
                  App Store
                </span>
              </div>
            </button>

            {/* Google Play Button */}
            <button
              type="button"
              onClick={() => alert("HOMIQ Android App coming soon to Google Play!")}
              className="w-full flex items-center justify-start gap-3 bg-black hover:bg-zinc-900 text-white px-3.5 py-2.5 rounded-md text-left transition shadow-2xs cursor-pointer"
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src="/icons/playstore-icon.png"
                  alt="Google Play Logo"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <div className="leading-tight text-left">
                <span className="block text-[9.5px] uppercase tracking-wider text-zinc-300 font-medium leading-none">
                  GET IT ON
                </span>
                <span className="block text-sm font-bold leading-tight text-white mt-0.5">
                  Google Play
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className={`hidden lg:flex w-64 flex-shrink-0 bg-[#FDFBFB] border-r border-[#ece5de] min-h-screen flex-col justify-between p-4 select-none ${className}`}>
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Drawer Slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />

          {/* Drawer Panel */}
          <aside className="relative w-72 max-w-[80vw] bg-[#FDFBFB] border-r border-[#ece5de] h-full flex flex-col justify-between p-4 overflow-y-auto shadow-2xl z-10 select-none">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

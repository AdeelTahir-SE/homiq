"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PropertyManagerSidebarProps {
  activeItem?: string;
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
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Properties",
    href: "/properties",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: "Units & Tenants",
    href: "/units-tenants",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Leases",
    href: "/leases",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Rent Collection",
    href: "/rent-collection",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: "Accounting",
    href: "/accounting",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Documents",
    href: "/documents",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Messages",
    href: "/messages",
    badge: 8,
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-slate-600 group-hover:text-[#0a192f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function PropertyManagerSidebar({
  activeItem = "Overview",
}: PropertyManagerSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-4 select-none">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-3 py-1">
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
          <span className="text-xl font-black tracking-wider text-[#0a192f]">
            HOMIQ
          </span>
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? "bg-[#13233c] text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-100/70"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex-shrink-0">{item.icon(isActive)}</div>
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
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
        <div className="bg-[#fdfbf7] border border-[#f5ede1] rounded-2xl p-4 text-left relative">
          <h4 className="text-xs font-bold text-[#0a192f]">Manage on the go</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Access your properties, tenants, and tasks from anywhere.
          </p>

          <div className="mt-3.5 space-y-2">
            {/* App Store Button */}
            <a
              href="#app-store"
              className="flex items-center gap-2.5 bg-black hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-left transition w-full shadow-2xs"
            >
              <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z" />
              </svg>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-300 font-medium leading-none">
                  Download on the
                </span>
                <span className="block text-xs font-semibold leading-tight text-white">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="#google-play"
              className="flex items-center gap-2.5 bg-black hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-left transition w-full shadow-2xs"
            >
              <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.383-.61-.954-.61-1.636V3.45c0-.682.242-1.253.609-1.636zm11.238 11.24l2.585 2.586-11.83 6.83 9.245-9.416zm0-2.108L5.602 1.53l11.83 6.83-2.585 2.586zm1.758.879l3.54 2.046c.866.501.866 1.319 0 1.82l-3.54 2.046-2.072-2.072 2.072-1.84z" />
              </svg>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-300 font-medium leading-none">
                  GET IT ON
                </span>
                <span className="block text-xs font-semibold leading-tight text-white">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

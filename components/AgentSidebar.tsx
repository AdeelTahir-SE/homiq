"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AgentSidebarProps {
  activeItem?: string;
  onUpgradePro?: () => void;
}

interface SidebarItem {
  name: string;
  href: string;
  renderIcon: (isActive: boolean) => React.ReactNode;
}

const AGENT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    name: "Leads",
    href: "/leads",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Properties",
    href: "/search-house",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Transactions",
    href: "/transactions",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    name: "Calendar",
    href: "/calendar",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Tasks",
    href: "/tasks",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Contacts",
    href: "/contacts",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "Marketing",
    href: "/marketing",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Messages",
    href: "/messages",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    name: "Team",
    href: "/team",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    renderIcon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AgentSidebar({
  activeItem = "Dashboard",
  onUpgradePro,
}: AgentSidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 bg-[#F9F6F4] border-r border-[#ece5de] min-h-screen flex flex-col justify-between p-4 select-none">
      {/* Brand Header */}
      <div className="space-y-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-1 group">
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
          <span className="text-2xl sm:text-[26px] font-semibold tracking-wide text-[#0a192f]">
            HOMIQ
          </span>
        </Link>

        {/* Navigation List */}
        <nav className="space-y-1">
          {AGENT_SIDEBAR_ITEMS.map((item) => {
            const isActive = activeItem.toLowerCase() === item.name.toLowerCase();

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-sm font-semibold transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? "bg-[#0D2449] text-white shadow-xs"
                    : "text-[#0D2449] hover:bg-[#0D2449]/5"
                }`}
              >
                <div
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-[#0D2449]"
                  }`}
                >
                  {item.renderIcon(isActive)}
                </div>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* HOMIQ Pro Card */}
      <div className="mt-8 pt-4">
        <div className="bg-white/80 border border-[#eddcd0] rounded-2xl p-4 text-left relative overflow-hidden shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="relative w-4 h-4 flex-shrink-0">
              <Image
                src="/icons/agent-sidebar-icons/homiq-pro- icon.png"
                alt="HOMIQ Pro"
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
            <h4 className="text-xs font-bold text-[#0D2449]">HOMIQ Pro</h4>
          </div>

          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
            Unlock advanced tools and insights.
          </p>

          <button
            type="button"
            onClick={
              onUpgradePro
                ? onUpgradePro
                : () => alert("HOMIQ Pro upgrade modal opened!")
            }
            className="mt-3 w-full bg-white hover:bg-[#fefaf4] border border-[#d99738]/60 text-[#b45309] text-xs font-bold py-2 px-3 rounded-xl shadow-2xs transition duration-150 cursor-pointer text-center"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}


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
  icon: string;
}

const AGENT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/icons/agent-sidebar-icons/dashboard-icon.png",
  },
  {
    name: "Leads",
    href: "/leads",
    icon: "/icons/dashboard/leads-icon.png",
  },
  {
    name: "Properties",
    href: "/search-house",
    icon: "/icons/agent-sidebar-icons/properties-icon.png",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: "/icons/agent-sidebar-icons/transactions-icon.png",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: "/icons/agent-sidebar-icons/calender-icon.png",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "/icons/agent-sidebar-icons/tasks-icon.png",
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: "/icons/agent-sidebar-icons/contacts-icon.png",
  },
  {
    name: "Marketing",
    href: "/marketing",
    icon: "/icons/agent-sidebar-icons/marketing-icon.png",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "/icons/agent-sidebar-icons/report-icon.png",
  },
  {
    name: "Messages",
    href: "/messages",
    icon: "/icons/agent-sidebar-icons/message-icon.png",
  },
  {
    name: "Team",
    href: "/team",
    icon: "/icons/agent-sidebar-icons/teams-icon.png",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "/icons/agent-sidebar-icons/settings-icon.png",
  },
];

export default function AgentSidebar({
  activeItem = "Dashboard",
  onUpgradePro,
}: AgentSidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-4 select-none">
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
          {AGENT_SIDEBAR_ITEMS.map((item) => {
            const isActive = activeItem.toLowerCase() === item.name.toLowerCase();

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? "bg-[#0a192f] text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-100/70"
                }`}
              >
                <div
                  className={`relative w-4.5 h-4.5 flex-shrink-0 transition-opacity ${
                    isActive
                      ? "opacity-100 brightness-0 invert"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    fill
                    sizes="18px"
                    className="object-contain"
                  />
                </div>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* HOMIQ Pro Card */}
      <div className="mt-8 pt-4">
        <div className="bg-[#fcfaf6] border border-[#f0e3ce] rounded-2xl p-4 text-left relative overflow-hidden">
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
            <h4 className="text-xs font-bold text-[#0a192f]">HOMIQ Pro</h4>
          </div>

          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Unlock advanced tools and insights.
          </p>

          <button
            type="button"
            onClick={
              onUpgradePro
                ? onUpgradePro
                : () => alert("HOMIQ Pro upgrade modal opened!")
            }
            className="mt-3 w-full bg-white hover:bg-[#fef9f0] border border-[#d99738]/50 text-[#b45309] text-xs font-semibold py-2 px-3 rounded-xl shadow-2xs transition duration-150 cursor-pointer text-center"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}

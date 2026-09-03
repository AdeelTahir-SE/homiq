"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BuyerSidebarProps {
  activeItem?: string;
  onContactSupport?: () => void;
  className?: string;
  onNavigate?: () => void;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/icons/buyer-sidebar-icons/dashboard-icon.png",
  },
  {
    name: "My Searches",
    href: "/search-house",
    icon: "/icons/buyer-sidebar-icons/searches-icon.png",
  },
  {
    name: "Saved Properties",
    href: "/saved-properties",
    icon: "/icons/buyer-sidebar-icons/saved-properties-icon.png",
  },
  {
    name: "Messages",
    href: "/messages",
    icon: "/icons/buyer-sidebar-icons/message-icon.png",
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: "/icons/buyer-sidebar-icons/alerts-icon.png",
  },
  {
    name: "My Tours",
    href: "/my-tours",
    icon: "/icons/buyer-sidebar-icons/my-tours-icon.png",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "/icons/buyer-sidebar-icons/profile-icon.png",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "/icons/buyer-sidebar-icons/settings-icon.png",
  },
];

export default function BuyerSidebar({
  activeItem = "Dashboard",
  onContactSupport,
  className = "",
  onNavigate,
}: BuyerSidebarProps) {
  return (
    <aside
      className={`w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] flex flex-col justify-between p-4 sm:p-5 select-none ${className}`}
    >
      {/* Navigation List */}
      <div className="space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = activeItem.toLowerCase() === item.name.toLowerCase();

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 group cursor-pointer ${
                isActive
                  ? "bg-[#0B2449] text-white shadow-sm font-semibold"
                  : "text-slate-600 hover:text-[#0B2449] hover:bg-slate-100/80"
              }`}
            >
              <div
                className={`relative w-5 h-5 flex-shrink-0 transition-opacity ${
                  isActive ? "opacity-100 brightness-0 invert" : "opacity-75 group-hover:opacity-100"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Need Help Box */}
      <div className="mt-8 pt-4">
        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-lg p-4 text-left">
          <h4 className="text-sm font-bold text-[#0B2449]">Need help?</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Our support team is here.
          </p>
          <button
            type="button"
            onClick={
              onContactSupport
                ? onContactSupport
                : () => alert("Contact support clicked! Our team is available 24/7.")
            }
            className="mt-3.5 w-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0B2449] text-xs font-semibold py-2.5 px-3 rounded-lg shadow-xs transition duration-150 cursor-pointer text-center"
          >
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}

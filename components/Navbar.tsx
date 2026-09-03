"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  activeTab?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export default function Navbar({ activeTab = "Buy", showSearch = false, searchPlaceholder = "Search properties, clients, or messages..." }: NavbarProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = showSearch 
    ? ["Buy", "Rent", "Sell", "Resources"] 
    : ["Buy", "Rent", "Sell", "Invest", "Resources"];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
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
            <span className="text-xl sm:text-2xl font-black tracking-wider text-[#0a192f]">
              HOMIQ
            </span>
          </Link>

          {/* Navigation Links moved more to the right */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 ml-10 lg:ml-12">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              if (item === "Resources") {
                return (
                  <div key={item} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#0a192f] font-semibold"
                          : "text-slate-600 hover:text-[#0a192f]"
                      }`}
                    >
                      <span>{item}</span>
                      <svg
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                          isResourcesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isResourcesOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                        >
                          Market Trends
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                        >
                          Mortgage Calculator
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                        >
                          Guides & Articles
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item}
                  href="/search-house"
                  className={`text-sm font-medium py-1 transition-colors ${
                    isActive
                      ? "text-[#0a192f] font-semibold"
                      : "text-slate-600 hover:text-[#0a192f]"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Optional Search, Notifications, Favorites & User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {showSearch && (
            <div className="hidden lg:flex items-center relative w-72 xl:w-80">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs xl:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
              />
            </div>
          )}
          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 text-slate-600 hover:text-[#0a192f] transition cursor-pointer"
            aria-label="Notifications"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/icons/search-house/bell-icon.png"
                alt="Notifications"
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Favorites Heart */}
          <button
            type="button"
            className="relative p-2 text-slate-600 hover:text-[#0a192f] transition cursor-pointer"
            aria-label="Saved homes"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/icons/search-house/heart-icon.png"
                alt="Favorites"
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-2 cursor-pointer group"
            >
              {/* Avatar image */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Olivia User Avatar"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              <span className="text-sm font-semibold text-[#0a192f] hidden sm:inline">
                Hi, Olivia
              </span>

              <svg
                className={`w-4 h-4 text-slate-500 transition-transform duration-150 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                >
                  My Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/applications"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]"
                >
                  Applications
                </Link>
                <div className="border-t border-slate-100 my-1" />
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

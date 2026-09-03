"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  activeTab?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  favoriteCount?: number;
  notificationCount?: number;
  userName?: string;
}

export default function Navbar({
  activeTab = "Buy",
  showSearch = false,
  searchPlaceholder = "Search properties, clients, or messages...",
  favoriteCount = 2,
  notificationCount = 3,
  userName = "Olivia",
}: NavbarProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = showSearch 
    ? ["Buy", "Rent", "Sell", "Resources"] 
    : ["Buy", "Rent", "Sell", "Invest", "Resources"];

  return (
    <header className="w-full bg-[#FAF8F7] border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1 text-slate-700 hover:text-[#0a192f] hover:bg-slate-100 rounded-lg transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

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
            <span className="text-xl sm:text-2xl font-semibold tracking-wide text-[#0a192f]">
              HOMIQ
            </span>
          </Link>

          {/* Navigation Links moved more to the right, slightly left of center */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 ml-16 md:ml-24 lg:ml-32 xl:ml-40">
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
                          ? "text-slate-600"
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
                      ? "text-slate-600"
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
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
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
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d99738] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
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
                  alt={`${userName} User Avatar`}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              <span className="text-sm font-semibold text-[#0a192f] hidden sm:inline">
                Hi, {userName}
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

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#FAF8F7] px-4 py-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              if (item === "Resources") {
                return (
                  <div key={item} className="pt-1">
                    <button
                      type="button"
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition"
                    >
                      <span>{item}</span>
                      <svg
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isResourcesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isResourcesOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1">
                        <Link
                          href="#"
                          className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0a192f]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Market Trends
                        </Link>
                        <Link
                          href="#"
                          className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0a192f]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Mortgage Calculator
                        </Link>
                        <Link
                          href="#"
                          className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0a192f]"
                          onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                    isActive
                      ? "bg-slate-100 text-[#0a192f]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0a192f]"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

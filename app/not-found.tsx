"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F7] flex flex-col justify-between font-sans text-[#0a192f] select-none">
      {/* Top Navbar */}
      <Navbar />

      {/* Main 404 Content Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#FCF6EF] border border-[#d99738]/30 text-[#d99738] text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#d99738] animate-pulse" />
            <span>404 Error &bull; Page Not Found</span>
          </div>

          {/* Large Stylized 404 Visual */}
          <div className="relative">
            <h1 className="text-7xl sm:text-9xl font-black text-[#0D2449] tracking-tighter opacity-90 select-none">
              4<span className="text-[#d99738]">0</span>4
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#d99738]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Heading & Explanatory Text */}
          <div className="space-y-3 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2449] tracking-tight">
              Looks like you&apos;ve ventured off the map
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              The page or property listing you are looking for might have been sold, removed, or is temporarily unavailable.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-md bg-[#0D2449] hover:bg-[#071730] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Go to Dashboard</span>
            </Link>

            <Link
              href="/search-house"
              className="px-5 py-2.5 rounded-md bg-white hover:bg-[#fefaf4] border border-[#d99738] text-[#d99738] text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Explore Listings</span>
            </Link>

            <Link
              href="/"
              className="px-5 py-2.5 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition cursor-pointer"
            >
              Home Page
            </Link>
          </div>

          {/* Quick Helpful Navigation Grid */}
          <div className="pt-8 border-t border-slate-200/80">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Popular Destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              <Link
                href="/dashboard"
                className="bg-white/80 hover:bg-white p-3 rounded-md border border-slate-200/80 shadow-2xs hover:shadow-xs transition text-left group"
              >
                <span className="text-xs font-bold text-[#0D2449] group-hover:text-[#d99738] transition block">
                  Agent Dashboard
                </span>
                <span className="text-[10px] text-slate-400">Leads & pipeline</span>
              </Link>

              <Link
                href="/search-house"
                className="bg-white/80 hover:bg-white p-3 rounded-md border border-slate-200/80 shadow-2xs hover:shadow-xs transition text-left group"
              >
                <span className="text-xs font-bold text-[#0D2449] group-hover:text-[#d99738] transition block">
                  Find Homes
                </span>
                <span className="text-[10px] text-slate-400">Map & listings</span>
              </Link>

              <Link
                href="/applications"
                className="bg-white/80 hover:bg-white p-3 rounded-md border border-slate-200/80 shadow-2xs hover:shadow-xs transition text-left group"
              >
                <span className="text-xs font-bold text-[#0D2449] group-hover:text-[#d99738] transition block">
                  Applications
                </span>
                <span className="text-[10px] text-slate-400">Rental status</span>
              </Link>

              <Link
                href="/settings"
                className="bg-white/80 hover:bg-white p-3 rounded-md border border-slate-200/80 shadow-2xs hover:shadow-xs transition text-left group"
              >
                <span className="text-xs font-bold text-[#0D2449] group-hover:text-[#d99738] transition block">
                  Account
                </span>
                <span className="text-[10px] text-slate-400">Settings & profile</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} HOMIQ Real Estate Platform. All rights reserved.
      </footer>
    </div>
  );
}

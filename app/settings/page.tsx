"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type RoleType = "buyer" | "agent" | "manager";
type SettingsTab =
  | "account"
  | "notifications"
  | "searches"
  | "privacy"
  | "billing"
  | "devices"
  | "close";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  cardName: string;
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  // Account & Profile state
  const [fullName, setFullName] = useState("Olivia Bennett");
  const [email, setEmail] = useState("olivia.bennett@email.com");
  const [phone, setPhone] = useState("(512) 555-0198");
  const [location, setLocation] = useState("Austin, TX");
  const [role, setRole] = useState<RoleType>("buyer");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80"
  );
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Email Notification toggles
  const [emailPriceDrops, setEmailPriceDrops] = useState(true);
  const [emailNewListings, setEmailNewListings] = useState(true);
  const [emailSavedSearches, setEmailSavedSearches] = useState(true);
  const [emailMessages, setEmailMessages] = useState(true);
  const [emailTourReminders, setEmailTourReminders] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);

  // Push Notification toggles
  const [pushPriceDrops, setPushPriceDrops] = useState(true);
  const [pushNewListings, setPushNewListings] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "visa",
      cardName: "Visa",
      last4: "4242",
      expiry: "04/27",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "mastercard",
      cardName: "Mastercard",
      last4: "8888",
      expiry: "11/26",
      isDefault: false,
    },
    {
      id: "pm_3",
      type: "amex",
      cardName: "American Express",
      last4: "1005",
      expiry: "09/25",
      isDefault: false,
    },
  ]);

  // Billing Address
  const [billingAddress, setBillingAddress] = useState({
    name: "Olivia Bennett",
    street: "1234 Maple Ridge Dr, Apt 2B",
    cityStateZip: "Austin, TX 78703",
    country: "United States",
  });

  // Modals state
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardType, setNewCardType] = useState<"visa" | "mastercard" | "amex">("visa");

  // Save changes handler
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
    }, 3000);
  };

  // Add payment method handler
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber) return;
    const last4 = newCardNumber.slice(-4) || "9999";
    const newPm: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: newCardType,
      cardName:
        newCardType === "visa"
          ? "Visa"
          : newCardType === "mastercard"
          ? "Mastercard"
          : "American Express",
      last4: last4,
      expiry: newCardExpiry || "12/28",
      isDefault: false,
    };
    setPaymentMethods([...paymentMethods, newPm]);
    setNewCardNumber("");
    setNewCardExpiry("");
    setIsAddPaymentModalOpen(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a192f] flex flex-col font-sans">
      {/* Top Navbar with Search, Notifications, Heart, and Olivia Avatar */}
      <Navbar activeTab="Resources" showSearch={true} />

      {/* Main Layout Body: Left Sidebar + Content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1920px] w-full mx-auto">
        {/* LEFT SIDEBAR: Settings Menu */}
        <aside className="w-full lg:w-64 flex-shrink-0 bg-white border-r border-slate-200 p-5 flex flex-col justify-between select-none">
          <div className="space-y-6">
            {/* Header label */}
            <div className="px-3 pt-1">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                SETTINGS
              </span>
            </div>

            {/* Menu Items List */}
            <nav className="space-y-1">
              {/* 1. Account Settings */}
              <button
                type="button"
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "account"
                    ? "bg-[#0a192f] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Account Settings</span>
              </button>

              {/* 2. Notifications */}
              <button
                type="button"
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "notifications"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span>Notifications</span>
              </button>

              {/* 3. Saved Searches & Alerts */}
              <button
                type="button"
                onClick={() => setActiveTab("searches")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "searches"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Saved Searches & Alerts</span>
              </button>

              {/* 4. Privacy & Security */}
              <button
                type="button"
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "privacy"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Privacy & Security</span>
              </button>

              {/* 5. Payment & Billing */}
              <button
                type="button"
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "billing"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Payment & Billing</span>
              </button>

              {/* 6. Manage Devices */}
              <button
                type="button"
                onClick={() => setActiveTab("devices")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "devices"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Manage Devices</span>
              </button>

              {/* 7. Close Account */}
              <button
                type="button"
                onClick={() => setActiveTab("close")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  activeTab === "close"
                    ? "bg-[#0a192f] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50"
                }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM18 10l4 4m0-4l-4 4"
                  />
                </svg>
                <span>Close Account</span>
              </button>
            </nav>
          </div>

          {/* Bottom Need Help Box */}
          <div className="mt-8 pt-6">
            <div className="bg-[#fcf8f2] border border-[#f5ebd9] rounded-2xl p-4 text-left">
              <h4 className="text-sm font-bold text-[#0a192f]">Need help?</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our support team is here to help you with any questions.
              </p>
              <button
                type="button"
                onClick={() => alert("Our support team is available 24/7. Chat initiated!")}
                className="mt-3.5 w-full bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 text-xs font-semibold py-2.5 px-3 rounded-xl shadow-2xs transition duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a9 9 0 01-12.728 0m0 0l2.829-2.829m-2.829 2.829L3 21M8.464 8.464a5 5 0 000 7.072m0 0l2.829-2.829"
                  />
                </svg>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9 space-y-6 overflow-x-hidden">
          {/* Top Title & Security Header Card */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Settings & Preferences
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage your account, notifications, and payment preferences.
              </p>
            </div>

            {/* Green Security Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xs flex items-center gap-3.5 max-w-sm">
              <div className="w-9 h-9 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a192f]">
                  Your information is secure
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  We use bank-level encryption to keep your data safe and private.
                </p>
              </div>
            </div>
          </div>

          {/* 3 COLUMN MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ======================================================== */}
            {/* COLUMN 1: ACCOUNT & PROFILE */}
            {/* ======================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-6">
              <form onSubmit={handleSaveChanges} className="space-y-5">
                {/* Section Header */}
                <div>
                  <h2 className="text-base font-bold text-[#0a192f]">
                    Account & Profile
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your personal information and profile details.
                  </p>
                </div>

                {/* Profile Photo Avatar with Camera Button */}
                <div className="flex justify-center pt-1 pb-1">
                  <div className="relative">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <Image
                        src={avatarUrl}
                        alt="Olivia Bennett"
                        fill
                        sizes="96px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Camera Button */}
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0a192f] hover:bg-slate-50 transition cursor-pointer"
                      title="Upload new photo"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Full Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20 focus:border-slate-400 transition"
                  />
                </div>

                {/* Email Address Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20 focus:border-slate-400 transition"
                  />
                </div>

                {/* Phone Number Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20 focus:border-slate-400 transition"
                  />
                </div>

                {/* Location Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20 focus:border-slate-400 appearance-none cursor-pointer transition pr-8"
                    >
                      <option value="Austin, TX">Austin, TX</option>
                      <option value="Dallas, TX">Dallas, TX</option>
                      <option value="Houston, TX">Houston, TX</option>
                      <option value="San Antonio, TX">San Antonio, TX</option>
                    </select>
                    <svg
                      className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Role Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Role
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Select the option that best describes you.
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {/* Buyer / Renter */}
                    <button
                      type="button"
                      onClick={() => setRole("buyer")}
                      className={`relative p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                        role === "buyer"
                          ? "border-[#d99738] bg-[#fdfaf4]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {role === "buyer" && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#d99738] text-white rounded-full flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 ${
                          role === "buyer" ? "text-[#d99738]" : "text-slate-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span
                        className={`text-[11px] font-semibold leading-tight ${
                          role === "buyer" ? "text-[#0a192f]" : "text-slate-600"
                        }`}
                      >
                        Buyer / Renter
                      </span>
                    </button>

                    {/* Agent / Broker */}
                    <button
                      type="button"
                      onClick={() => setRole("agent")}
                      className={`relative p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                        role === "agent"
                          ? "border-[#d99738] bg-[#fdfaf4]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {role === "agent" && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#d99738] text-white rounded-full flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 ${
                          role === "agent" ? "text-[#d99738]" : "text-slate-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span
                        className={`text-[11px] font-semibold leading-tight ${
                          role === "agent" ? "text-[#0a192f]" : "text-slate-600"
                        }`}
                      >
                        Agent / Broker
                      </span>
                    </button>

                    {/* Property Manager */}
                    <button
                      type="button"
                      onClick={() => setRole("manager")}
                      className={`relative p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                        role === "manager"
                          ? "border-[#d99738] bg-[#fdfaf4]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {role === "manager" && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#d99738] text-white rounded-full flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 ${
                          role === "manager" ? "text-[#d99738]" : "text-slate-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span
                        className={`text-[11px] font-semibold leading-tight ${
                          role === "manager" ? "text-[#0a192f]" : "text-slate-600"
                        }`}
                      >
                        Property Manager
                      </span>
                    </button>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0a192f] hover:bg-[#071325] text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-xs transition duration-150 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>

                {isSavedToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl text-center animate-fade-in">
                    ✓ Profile preferences saved successfully!
                  </div>
                )}
              </form>
            </div>

            {/* ======================================================== */}
            {/* COLUMN 2: NOTIFICATION PREFERENCES */}
            {/* ======================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Section Header */}
                <div>
                  <h2 className="text-base font-bold text-[#0a192f]">
                    Notification Preferences
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose what you want to be notified about and how.
                  </p>
                </div>

                {/* 1. EMAIL NOTIFICATIONS SUB-SECTION */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-slate-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-xs font-bold text-[#0a192f]">
                        Email Notifications
                      </h3>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      Email
                    </span>
                  </div>

                  {/* Email Toggle List */}
                  <div className="space-y-3.5">
                    {/* Price drops */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Price drops
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Get notified when properties you saved drop in price.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailPriceDrops(!emailPriceDrops)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailPriceDrops ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailPriceDrops}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailPriceDrops ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* New listings */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          New listings
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Get notified about new properties that match your searches.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailNewListings(!emailNewListings)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailNewListings ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailNewListings}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailNewListings ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Saved search updates */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Saved search updates
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Receive updates for your saved searches.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailSavedSearches(!emailSavedSearches)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailSavedSearches ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailSavedSearches}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailSavedSearches ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Messages
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Get notified when you receive a new message.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailMessages(!emailMessages)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailMessages ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailMessages}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailMessages ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Tour reminders */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Tour reminders
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Reminders for upcoming tours and appointments.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailTourReminders(!emailTourReminders)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailTourReminders ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailTourReminders}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailTourReminders ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Marketing & tips */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Marketing & tips
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Market updates, tips, and recommendations.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailMarketing(!emailMarketing)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          emailMarketing ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={emailMarketing}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            emailMarketing ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. PUSH NOTIFICATIONS SUB-SECTION */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-slate-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-xs font-bold text-[#0a192f]">
                        Push Notifications
                      </h3>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      Push
                    </span>
                  </div>

                  {/* Push Toggle List */}
                  <div className="space-y-3.5">
                    {/* Price drops */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Price drops
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Instant alerts for price drops.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPushPriceDrops(!pushPriceDrops)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          pushPriceDrops ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={pushPriceDrops}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            pushPriceDrops ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* New listings */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          New listings
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Instant alerts for new matching listings.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPushNewListings(!pushNewListings)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          pushNewListings ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={pushNewListings}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            pushNewListings ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          Messages
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Instant alerts for new messages.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPushMessages(!pushMessages)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${
                          pushMessages ? "bg-[#0a192f]" : "bg-slate-300"
                        }`}
                        aria-pressed={pushMessages}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            pushMessages ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* COLUMN 3: PAYMENT & BILLING */}
            {/* ======================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Section Header */}
                <div>
                  <h2 className="text-base font-bold text-[#0a192f]">
                    Payment & Billing
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage your payment methods and billing details.
                  </p>
                </div>

                {/* Saved Payment Methods */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0a192f]">
                      Saved Payment Methods
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddPaymentModalOpen(true)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="text-sm leading-none">+</span>
                      <span>Add Payment Method</span>
                    </button>
                  </div>

                  {/* Payment Cards List */}
                  <div className="space-y-2.5">
                    {paymentMethods.map((pm) => (
                      <div
                        key={pm.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200/90 hover:border-slate-300 bg-white transition"
                      >
                        <div className="flex items-center gap-3">
                          {/* Card Badge Logo */}
                          <div className="w-11 h-7 rounded-md bg-slate-100 border border-slate-200/60 flex items-center justify-center flex-shrink-0">
                            {pm.type === "visa" && (
                              <span className="text-[11px] font-black italic tracking-tighter text-[#1434cb]">
                                VISA
                              </span>
                            )}
                            {pm.type === "mastercard" && (
                              <div className="flex items-center -space-x-1.5">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block opacity-90" />
                                <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] inline-block opacity-90" />
                              </div>
                            )}
                            {pm.type === "amex" && (
                              <span className="text-[9px] font-black text-[#006fcf] tracking-tighter px-0.5 bg-[#e0f2fe] rounded">
                                AMEX
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-[#0a192f]">
                                {pm.cardName} ending in {pm.last4}
                              </h4>
                              {pm.isDefault && (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[10px] font-semibold px-2 py-0.2 rounded-md">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Expires {pm.expiry}
                            </p>
                          </div>
                        </div>

                        {/* 3-dots Menu Button */}
                        <button
                          type="button"
                          onClick={() => alert(`Options for ${pm.cardName} *${pm.last4}`)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition cursor-pointer"
                          aria-label="Payment method options"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Address Section */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0a192f]">
                      Billing Address
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditAddressModalOpen(true)}
                      className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed font-normal">
                    <p className="font-semibold text-slate-800">{billingAddress.name}</p>
                    <p>{billingAddress.street}</p>
                    <p>{billingAddress.cityStateZip}</p>
                    <p>{billingAddress.country}</p>
                  </div>
                </div>

                {/* Plan & Billing History Section */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-[#0a192f]">
                    Plan & Billing History
                  </h3>

                  {/* Active Plan Box */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 bg-[#fdfaf4]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#fef3e2] flex items-center justify-center flex-shrink-0 text-[#d97706]">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0a192f]">
                          HOMIQ Premium
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Renews on June 13, 2024
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-extrabold text-[#0a192f]">
                        $9.99 / month
                      </p>
                      <button
                        type="button"
                        onClick={() => alert("Manage HOMIQ Premium Plan")}
                        className="text-[11px] font-semibold text-[#0a192f] hover:underline cursor-pointer block mt-0.5 ml-auto"
                      >
                        Manage Plan
                      </button>
                    </div>
                  </div>

                  {/* Billing History List */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0a192f]">
                        Billing History
                      </span>
                      <button
                        type="button"
                        onClick={() => alert("View full billing invoice history")}
                        className="text-xs font-semibold text-[#0a192f] hover:underline cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-500">May 13, 2024</span>
                        <span className="text-slate-700 font-medium">
                          HOMIQ Premium – Monthly
                        </span>
                        <span className="font-bold text-[#0a192f]">$9.99</span>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-500">Apr 13, 2024</span>
                        <span className="text-slate-700 font-medium">
                          HOMIQ Premium – Monthly
                        </span>
                        <span className="font-bold text-[#0a192f]">$9.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BOTTOM BANNER: PRIVACY & SECURITY STATEMENT */}
          {/* ======================================================== */}
          <div className="w-full bg-[#fdfaf4] border border-[#f5ebd9] rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#ebdcc4] flex items-center justify-center flex-shrink-0 text-slate-700 shadow-2xs">
              <svg
                className="w-5 h-5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-700">
                We respect your privacy and will never share your personal information.
              </p>
              <p className="text-slate-500 mt-0.5">
                Please review our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#0a192f] underline hover:text-slate-900"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#0a192f] underline hover:text-slate-900"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL: ADD PAYMENT METHOD */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-fade-in space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0a192f]">
                Add Payment Method
              </h3>
              <button
                type="button"
                onClick={() => setIsAddPaymentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["visa", "mastercard", "amex"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewCardType(type)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition cursor-pointer ${
                        newCardType === type
                          ? "border-[#0a192f] bg-[#0a192f] text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="•••• •••• •••• 4242"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0a192f] text-white rounded-xl text-xs font-semibold hover:bg-[#071325] cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BILLING ADDRESS */}
      {isEditAddressModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-fade-in space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0a192f]">
                Edit Billing Address
              </h3>
              <button
                type="button"
                onClick={() => setIsEditAddressModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditAddressModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={billingAddress.name}
                  onChange={(e) =>
                    setBillingAddress({ ...billingAddress, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={billingAddress.street}
                  onChange={(e) =>
                    setBillingAddress({ ...billingAddress, street: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City, State, Zip
                  </label>
                  <input
                    type="text"
                    value={billingAddress.cityStateZip}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        cityStateZip: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={billingAddress.country}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        country: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0a192f]/20"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditAddressModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0a192f] text-white rounded-xl text-xs font-semibold hover:bg-[#071325] cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

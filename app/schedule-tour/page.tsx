"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ScheduleTourPage() {
  // Calendar state
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const isTimeSelected = Boolean(selectedTime);
  const isInfoFilled = Boolean(fullName.trim() && email.trim() && phone.trim());

  // Confirmation modal/status
  const [isConfirmed, setIsConfirmed] = useState(false);

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  // Normalized today's date (midnight)
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  // Month navigation
  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Disable previous month button if already at current month/year
  const isPrevMonthDisabled = useMemo(() => {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    return viewYear < currentYear || (viewYear === currentYear && viewMonth <= currentMonth);
  }, [viewDate, today]);

  // Generate calendar matrix
  const { monthLabel, calendarCells } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const label = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    interface Cell {
      day: number;
      date: Date;
      isCurrentMonth: boolean;
      isPast: boolean;
      isSelected: boolean;
      hasDot: boolean;
    }

    const cells: Cell[] = [];

    // Trailing days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      date.setHours(0, 0, 0, 0);
      cells.push({
        day,
        date,
        isCurrentMonth: false,
        isPast: date < today,
        isSelected: false,
        hasDot: false,
      });
    }

    // Days in current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const isPast = date < today;
      const isSelected = selectedDate.getTime() === date.getTime();
      const hasDot = !isPast && (day % 6 === 2 || isSelected);

      cells.push({
        day,
        date,
        isCurrentMonth: true,
        isPast,
        isSelected,
        hasDot,
      });
    }

    // Leading days from next month (fill up to 35 or 42 cells)
    const targetLength = cells.length > 35 ? 42 : 35;
    const remaining = targetLength - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      date.setHours(0, 0, 0, 0);
      cells.push({
        day: i,
        date,
        isCurrentMonth: false,
        isPast: false,
        isSelected: false,
        hasDot: false,
      });
    }

    return { monthLabel: label, calendarCells: cells };
  }, [viewDate, selectedDate, today]);

  // Selected date formatted representations
  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  const shortSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [selectedDate]);

  const summaryDateStr = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  const handleDateSelect = (cell: { date: Date; isCurrentMonth: boolean; isPast: boolean }) => {
    if (cell.isCurrentMonth && !cell.isPast) {
      setSelectedDate(cell.date);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a tour time.");
      return;
    }
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0D2349] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar activeTab="Buy" showSearch={true} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-7">
        {/* Back Link & Page Title */}
        <div className="space-y-1.5 sm:space-y-2">
          <Link
            href="/house-detail"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0D2349] transition-colors group cursor-pointer"
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
            <span>Back to Property</span>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0D2349] tracking-tight">
              Schedule a Tour
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Pick a date and time that works for you. We&apos;ll confirm with the agent.
            </p>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto no-scrollbar py-1">
          {/* Step 1 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-6 h-6 rounded-full bg-[#0D2349] text-white font-bold flex items-center justify-center text-xs shadow-2xs">
              1
            </span>
            <span className="font-bold text-[#0D2349] whitespace-nowrap">Choose Date &amp; Time</span>
          </div>

          <div
            className={`h-[1px] w-6 sm:w-16 md:w-28 lg:w-44 flex-shrink-0 transition-colors ${
              isTimeSelected ? "bg-[#0D2349]" : "bg-slate-300"
            }`}
          />

          {/* Step 2 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs transition-all ${
                isTimeSelected
                  ? "bg-[#0D2349] text-white shadow-2xs"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              2
            </span>
            <span
              className={`whitespace-nowrap transition-colors ${
                isTimeSelected ? "font-bold text-[#0D2349]" : "font-medium text-slate-400"
              }`}
            >
              Your Information
            </span>
          </div>

          <div
            className={`h-[1px] w-6 sm:w-16 md:w-28 lg:w-44 flex-shrink-0 transition-colors ${
              isInfoFilled ? "bg-[#0D2349]" : "bg-slate-300"
            }`}
          />

          {/* Step 3 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs transition-all ${
                isInfoFilled
                  ? "bg-[#0D2349] text-white shadow-2xs"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              3
            </span>
            <span
              className={`whitespace-nowrap transition-colors ${
                isInfoFilled ? "font-bold text-[#0D2349]" : "font-medium text-slate-400"
              }`}
            >
              Confirmation
            </span>
          </div>
        </div>

        {/* Main Grid: Left 3-Column Card & Right Summary Card */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-7 items-start">
          {/* Left Form: Single Card with 3 Columns */}
          <div className="xl:col-span-8 2xl:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 h-full">
              
              {/* COLUMN 1: Select a Date */}
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col">
                <div>
                  {/* Step Header */}
                  <div className="flex items-center gap-2.5 h-6">
                    <span className="w-6 h-6 rounded-full border border-amber-300/80 bg-[#fef8eb] text-[#b45309] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <h2 className="text-base font-bold text-[#0D2349]">Select a Date</h2>
                  </div>

                  {/* Month Navigator */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#0D2349]">{monthLabel}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={isPrevMonthDisabled}
                        className={`p-1 rounded-md transition ${
                          isPrevMonthDisabled
                            ? "text-slate-200 cursor-not-allowed"
                            : "text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        }`}
                        aria-label="Previous month"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        aria-label="Next month"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Calendar Weekday Labels */}
                  <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-2.5">
                    <span>SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                  </div>

                  {/* Calendar Days Matrix */}
                  <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-medium mt-1.5">
                    {calendarCells.map((cell, idx) => {
                      const isClickable = cell.isCurrentMonth && !cell.isPast;
                      return (
                        <div key={idx} className="flex flex-col items-center justify-center">
                          <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => handleDateSelect(cell)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition ${
                              !cell.isCurrentMonth || cell.isPast
                                ? "text-slate-300 cursor-not-allowed"
                                : cell.isSelected
                                ? "bg-[#0D2349] text-white font-bold shadow-xs cursor-pointer"
                                : "text-slate-700 hover:bg-slate-100 cursor-pointer"
                            }`}
                          >
                            <span>{cell.day}</span>
                          </button>
                          {/* Dot indicator */}
                          {cell.hasDot ? (
                            <span
                              className={`w-1 h-1 rounded-full mt-0.5 ${
                                cell.isSelected ? "bg-[#0D2349]" : "bg-[#0D2349]"
                              }`}
                            />
                          ) : (
                            <span className="w-1 h-1 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Date Notification Box */}
                <div className="bg-[#f2f9f5] border border-[#d4eedb] rounded-xl p-3 space-y-1 mt-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <span className="w-4 h-4 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-[10px] font-black">
                      ✓
                    </span>
                    <span>{formattedSelectedDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-6">
                    All times shown in Central Time (CT)
                  </p>
                </div>
              </div>

              {/* COLUMN 2: Select a Time */}
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col">
                <div>
                  {/* Step Header */}
                  <div>
                    <div className="flex items-center gap-2.5 h-6">
                      <span className="w-6 h-6 rounded-full border border-amber-300/80 bg-[#fef8eb] text-[#b45309] font-bold text-xs flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <h2 className="text-base font-bold text-[#0D2349]">Select a Time</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Available times for {shortSelectedDate}
                    </p>
                  </div>

                  {/* Time Slot Grid (3 columns x 6 rows) */}
                  <div className="grid grid-cols-3 gap-2 mt-2.5">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? "bg-[#0D2349] text-white border-[#0D2349] shadow-xs"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-[#0D2349]"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tour Duration Info */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">
                  <svg className="w-4 h-4 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tour duration: ~ 45 minutes</span>
                </div>
              </div>

              {/* COLUMN 3: Your Information */}
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                <div>
                  {/* Step Header */}
                  <div>
                    <div className="flex items-center gap-2.5 h-6">
                      <span className="w-6 h-6 rounded-full border border-amber-300/80 bg-[#fef8eb] text-[#b45309] font-bold text-xs flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <h2 className="text-base font-bold text-[#0D2349]">Your Information</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Confirm your contact details
                    </p>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-2.5 mt-2.5">
                    {/* Field 1: Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Olivia Bennett"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. olivia.bennett@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>

                    {/* Field 3: Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (512) 555-0198"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>

                    {/* Field 4: Preferred Contact Method */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactMethod("email")}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                            contactMethod === "email"
                              ? "border-[#d99738] bg-[#fefaf3] text-[#0D2349] shadow-2xs"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Email</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContactMethod("phone")}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                            contactMethod === "phone"
                              ? "border-[#d99738] bg-[#fefaf3] text-[#0D2349] shadow-2xs"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>Phone</span>
                        </button>
                      </div>
                    </div>

                    {/* Field 5: Add a Note (Optional) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Add a Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Any questions or anything the agent should know?"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0D2349] hover:bg-[#091b39] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-lg shadow-xs transition duration-150 cursor-pointer active:scale-[0.99]"
                  >
                    Confirm &amp; Request Tour
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Property & Agent Summary Card */}
          <div className="xl:col-span-4 2xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            {/* Property Image */}
            <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden shadow-2xs">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80"
                alt="310 Bowie St, #2205"
                fill
                sizes="(max-width: 1280px) 100vw, 380px"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Property Address & Price */}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0D2349] tracking-tight">
                310 Bowie St, #2205
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Austin, TX 78703
              </p>
              <div className="text-2xl font-black text-[#0D2349] mt-2">
                $620,000
              </div>
            </div>

            {/* Specs Row: Beds, Baths, Sqft */}
            <div className="flex items-center gap-4 text-slate-600 text-xs sm:text-sm font-medium pt-0.5">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>2 bd</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4M4 14l2-4h12l2 4M4 14h16" />
                </svg>
                <span>2 ba</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>1,145 sqft</span>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              {/* Agent Avatar & Info */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                    alt="Emma Clark"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2349] text-sm">
                    Emma Clark
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Austin Real Estate Specialist
                  </p>
                </div>
              </div>

              {/* Agent Contact Links */}
              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <a
                  href="tel:5125550198"
                  className="flex items-center gap-2.5 hover:text-[#0D2349] transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(512) 555-0198</span>
                </a>

                <a
                  href="mailto:emma.clark@homiq.com"
                  className="flex items-center gap-2.5 hover:text-[#0D2349] transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>emma.clark@homiq.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Privacy Notice Banner */}
        <div className="bg-[#fffdf7] border border-[#fde68a] rounded-xl p-4 sm:p-4.5 flex items-start sm:items-center gap-3 shadow-2xs">
          <div className="relative w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0 opacity-60">
            <Image
              src="/icons/login-page/password-icon.png"
              alt="Security"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-700">
              Your information is secure and will only be used to coordinate your tour.
            </p>
            <p className="mt-0.5">
              By scheduling, you agree to our{" "}
              <Link href="#" className="underline font-semibold text-slate-800 hover:text-black">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline font-semibold text-slate-800 hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Confirmation Success Modal */}
      {isConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-scale-up relative">
            <button
              type="button"
              onClick={() => setIsConfirmed(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto text-2xl font-black">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-[#0D2349]">
                Tour Request Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                We have notified Emma Clark. She will confirm the appointment for{" "}
                <span className="font-semibold text-slate-800">
                  {formattedSelectedDate} at {selectedTime}
                </span>
                .
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Property:</span>
                <span className="font-bold text-[#0D2349]">310 Bowie St, #2205</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date &amp; Time:</span>
                <span className="font-bold text-[#0D2349]">{summaryDateStr} • {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agent:</span>
                <span className="font-bold text-[#0D2349]">Emma Clark</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Method:</span>
                <span className="font-bold text-[#0D2349] capitalize">{contactMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/house-detail"
                className="flex-1 bg-[#0D2349] hover:bg-[#091b39] text-white text-center font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Back to Property
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";

type RoleType = "buyer" | "agent" | "manager";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#f4f6fa] text-[#0a192f]">
      {/* LEFT COLUMN: HERO & TRUST SECTION */}
      <section className="lg:w-[52%] xl:w-[50%] bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
        <div className="p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col flex-1">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src="/logo.png"
                alt="HOMIQ Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl sm:text-[26px] font-black tracking-wider text-[#0a192f]">
              HOMIQ
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="mt-8 sm:mt-10">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0a192f] tracking-tight leading-[1.15]">
              Smarter Real Estate
              <br />
              Management
            </h1>
            <p className="mt-3.5 text-slate-500 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
              HOMIQ helps you buy, sell, and manage properties with confidence.
            </p>
          </div>

          {/* Hero Visual & Floating Feature Card Container */}
          <div className="mt-8 sm:mt-10 relative flex-1 flex flex-col justify-end">
            {/* House Environment Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/login-page/left-side-house-environment.png"
                alt="Modern Architecture Real Estate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Floating 4-Feature Pillars Card */}
            <div className="mt-4 sm:-mt-14 relative z-10 mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center p-2 pt-0 md:pt-2">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 mb-2">
                    <Image
                      src="/icons/login-page/bank-level-secuirty-icon.png"
                      alt="Bank-level Security"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0a192f] leading-snug">
                    Bank-level Security
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Your data is encrypted and protected.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center p-2 pt-0 md:pt-2">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 mb-2">
                    <Image
                      src="/icons/login-page/trusted-by-icon.png"
                      alt="Trusted by Professionals"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0a192f] leading-snug">
                    Trusted by Professionals
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Join 18,000+ agents and managers.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center p-2 pt-3 md:pt-2">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 mb-2">
                    <Image
                      src="/icons/login-page/uptime-icon.png"
                      alt="99.9% Uptime Guarantee"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0a192f] leading-snug">
                    99.9% Uptime Guarantee
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Reliable platform when you need it.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col items-center text-center p-2 pt-3 md:pt-2">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 mb-2">
                    <Image
                      src="/icons/login-page/supoort-icon.png"
                      alt="24/7 Expert Support"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0a192f] leading-snug">
                    24/7 Expert Support
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Real humans, real solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Dark Trust & Compliance Bottom Bar */}
        <div className="bg-[#0b1a30] text-white px-6 sm:px-10 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          {/* Privacy Note */}
          <div className="flex items-center gap-3">
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image
                src="/icons/login-page/privacy-icon.png"
                alt="Privacy Security Lock"
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">
                Your privacy is our priority.
              </p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                We never share your personal information.
              </p>
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/icons/login-page/soc2-icon.png"
                alt="SOC 2 COMPLIANT"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/login-page/gdpr-icon.png"
                alt="GDPR COMPLIANT"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/login-page/ccpa-icon.png"
                alt="CCPA READY"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT COLUMN: LOGIN FORM SECTION */}
      <section className="lg:w-[48%] xl:w-[50%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
        <div className="w-full max-w-[500px]">
          {/* Main White Login Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 sm:p-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 mt-1.5 font-normal">
                Sign in to your HOMIQ account
              </p>
            </div>

            {/* Role Selection: "I am a" */}
            <div className="mt-7">
              <span className="text-xs font-bold text-[#0a192f] block mb-2.5">
                I am a
              </span>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {/* Buyer / Renter */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("buyer")}
                  className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selectedRole === "buyer"
                      ? "border-[#d99738] bg-[#fffcf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 mb-2">
                    <Image
                      src="/icons/login-page/buyer-icon.png"
                      alt="Buyer / Renter"
                      fill
                      sizes="28px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0a192f] leading-tight">
                    Buyer / Renter
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-1">
                    Find your perfect property
                  </span>
                </button>

                {/* Agent */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("agent")}
                  className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selectedRole === "agent"
                      ? "border-[#d99738] bg-[#fffcf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 mb-2">
                    <Image
                      src="/icons/login-page/agent-icon.png"
                      alt="Agent"
                      fill
                      sizes="28px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0a192f] leading-tight">
                    Agent
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-1">
                    Manage listings and clients
                  </span>
                </button>

                {/* Property Manager */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("manager")}
                  className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selectedRole === "manager"
                      ? "border-[#d99738] bg-[#fffcf7] ring-1 ring-[#d99738]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 mb-2">
                    <Image
                      src="/icons/login-page/property-manager-icon.png"
                      alt="Property Manager"
                      fill
                      sizes="28px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0a192f] leading-tight">
                    Property Manager
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-1">
                    Oversee properties and tenants
                  </span>
                </button>
              </div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
              {/* Email Address */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Email address
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus-within:border-[#0a192f] focus-within:ring-1 focus-within:ring-[#0a192f] transition">
                  <div className="relative w-4 h-4 flex-shrink-0 mr-2.5">
                    <Image
                      src="/icons/login-page/email-icon.png"
                      alt="Email Icon"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus-within:border-[#0a192f] focus-within:ring-1 focus-within:ring-[#0a192f] transition">
                  <div className="relative w-4 h-4 flex-shrink-0 mr-2.5">
                    <Image
                      src="/icons/login-page/password-icon.png"
                      alt="Password Icon"
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src={
                          showPassword
                            ? "/icons/login-page/closed-eye-icon.png"
                            : "/icons/login-page/open-eye-icon.png"
                        }
                        alt="Toggle Password Visibility"
                        fill
                        sizes="16px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f] accent-[#0a192f] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-xs font-medium text-[#d99738] hover:text-[#b47a27] transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0a192f] hover:bg-[#071325] text-white text-sm font-semibold py-3 px-4 rounded-xl shadow transition duration-150 cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs text-slate-400 select-none">
                or
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Continue with Google Button */}
            <button
              type="button"
              className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition duration-150 cursor-pointer"
            >
              {/* Google Multi-Color SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer Create Account Link */}
          <div className="text-center mt-6">
            <span className="text-xs sm:text-sm text-slate-600">
              Don&apos;t have an account?{" "}
            </span>
            <a
              href="#"
              className="text-xs sm:text-sm font-semibold text-[#d99738] hover:text-[#b47a27] inline-flex items-center gap-1 transition"
            >
              Create account
              <span className="text-base leading-none">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
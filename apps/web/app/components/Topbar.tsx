"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // ADDED: Import the Link component for navigation
import { ChevronDown, LogOut, User } from "lucide-react"; // MODIFIED: Removed 'Settings'

type TopbarProps = {
  userName?: string | null;
  userInitial?: string | null;
  userEmail?: string | null;
  onSignOut?: () => void;
};

export function Topbar({ userName, userInitial, userEmail, onSignOut }: TopbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!userName) {
    return (
      <div className="h-16 flex items-center justify-between px-8 border-b border-[#3DB876]/20 bg-gradient-to-r from-[#000D01] via-[#0D2321] to-[#000D01] animate-pulse backdrop-blur-sm">
        <div className="h-8 w-36 bg-[#3DB876]/20 rounded-lg"></div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-[#3DB876]/20 rounded-lg"></div>
          <div className="h-10 w-32 bg-[#3DB876]/20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-16 flex items-center justify-between px-8 border-b border-[#3DB876]/20 bg-gradient-to-r from-[#000D01] via-[#0D2321] to-[#000D01] backdrop-blur-md shadow-md shadow-[#00DFBB]/10 relative z-20">
      {/* ## Left Section - Logo & Title/Image ## */}
      <div className="flex items-center gap-3">
        <Image
          src="/PracSphere_Logo.png"
          alt="PracSphere Logo"
          width={100}
          height={32}
          className="object-contain"
        />
      </div>

      {/* ## Right Section ## */}
      <div className="flex items-center gap-3">
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#0D2321]/70 rounded-lg transition-all border border-transparent hover:border-[#3DB876]/30 hover:shadow-md hover:shadow-[#00DFBB]/20"
          >
            <span className="text-sm text-[#70D56D]/90">{userName}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3DB876] to-[#00DFBB] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DFBB]/40">
              <span className="text-white font-bold text-sm">{userInitial}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#70D56D]/70" />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-[#0D2321]/95 rounded-xl shadow-2xl border border-[#3DB876]/30 py-2 z-20 backdrop-blur-md animate-fade-in">
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#3DB876]/20">
                  <p className="text-sm font-medium text-slate-200">{userName}</p>
                  <p className="text-xs text-slate-400">{userEmail}</p>
                </div>

                {/* --- MODIFICATION START --- */}
                {/* Profile button now wrapped in a Link component */}
                <Link href="/dashboard/profile" passHref>
                  <button className="w-full px-4 py-2 hover:bg-[#000D01]/80 transition-all flex items-center gap-3 text-left text-[#70D56D]/80 hover:text-[#00DFBB]">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                </Link>

                {/* REMOVED: Settings button was here */}
                {/* --- MODIFICATION END --- */}

                <div className="border-t border-[#3DB876]/20 my-2"></div>

                {/* Sign Out */}
                <button
                  onClick={onSignOut}
                  className="w-full px-4 py-2 hover:bg-[#000D01]/80 transition-all flex items-center gap-3 text-left text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
"use client";

import React from "react";
import { RefreshCw, Power } from "lucide-react";

// Helper function
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type SidebarProps = {
  links: {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  pathname: string;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  onSignOut?: () => void;
  onRefresh?: () => void;
  onToggleTheme?: () => void;
  theme?: "light" | "dark";
};

export function Sidebar({
  links,
  pathname,
  LinkComponent,
  onSignOut,
  onRefresh,
  onToggleTheme,
  theme = "dark",
}: SidebarProps) {
  return (
    <div
      className={cn(
        "h-screen w-20 flex flex-col items-center py-6 gap-6 relative overflow-hidden border-r backdrop-blur-sm shadow-2xl",
        theme === "dark"
          ? "bg-gradient-to-b from-[#000D01] via-[#0D2321] to-[#000D01] border-[#3DB876]/20 shadow-[#00DFBB]/10"
          : "bg-gray-100 border-gray-300 shadow-gray-400"
      )}
    >
      {/* Background Glow */}
      {theme === "dark" && (
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#3DB876] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00DFBB] rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex flex-col gap-2 flex-1 z-10 mt-4">
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <LinkComponent
              key={item.href}
              href={item.href}
              className={cn(
                "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group border border-transparent",
                isActive
                  ? theme === "dark"
                    ? "bg-gradient-to-br from-[#3DB876] to-[#00DFBB] shadow-lg shadow-[#00DFBB]/40 scale-105"
                    : "bg-gray-300 shadow-md scale-105"
                  : theme === "dark"
                  ? "hover:border-[#3DB876]/40 hover:bg-white/5 hover:shadow-md hover:shadow-[#00DFBB]/20"
                  : "hover:border-gray-400 hover:bg-gray-200 hover:shadow-sm"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive
                      ? theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                      : theme === "dark"
                      ? "text-[#70D56D]/70 group-hover:text-[#00DFBB]"
                      : "text-gray-500 group-hover:text-gray-900"
                  )}
                />
              )}
            </LinkComponent>
          );
        })}
      </div>

      {/* Refresh Button */}
      {onRefresh && (
        <div className="z-10 mb-2">
          <button
            onClick={onRefresh}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              theme === "dark"
                ? "hover:bg-[#0D2321]/80 border border-[#3DB876]/30 hover:border-[#00DFBB]/50 hover:shadow-md hover:shadow-[#00DFBB]/30"
                : "bg-gray-200 border border-gray-300 hover:bg-gray-300"
            )}
          >
            <RefreshCw
              className={cn(
                "w-5 h-5 transition-colors",
                theme === "dark" ? "text-[#70D56D]/80 group-hover:text-[#00DFBB]" : "text-gray-600"
              )}
            />
          </button>
        </div>
      )}

      {/* Theme Toggle Button */}
      {onToggleTheme && (
        <div className="z-10 mb-2 flex justify-center">
          <button
            onClick={onToggleTheme}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              theme === "dark"
                ? "bg-yellow-400 hover:bg-yellow-300"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            )}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      )}

      {/* Logout Button */}
      {onSignOut && (
        <div className="relative group mb-4 z-10">
          <button
            onClick={onSignOut}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              theme === "dark"
                ? "bg-gradient-to-br from-red-800 to-red-900 shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-red-900/40"
                : "bg-red-500 shadow-md hover:bg-red-600"
            )}
          >
            <Power className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

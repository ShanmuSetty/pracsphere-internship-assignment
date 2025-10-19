"use client";

import { useState } from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { DashboardTopbar } from "../components/dashboard-topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-[#000D01]" : "bg-gray-100"}`}>
      <DashboardSidebar theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 overflow-y-auto">
        <DashboardTopbar />
        {children}
      </main>
    </div>
  );
}

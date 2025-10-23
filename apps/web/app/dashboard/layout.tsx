"use client";

import { useState } from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { DashboardTopbar } from "../components/dashboard-topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


  

  return (
    <div className={`flex h-screen overflow-hidden`}>
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <DashboardTopbar />
        {children}
      </main>
    </div>
  );
}

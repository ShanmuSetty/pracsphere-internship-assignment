"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CheckSquare, ListTodo, ClipboardList, Percent } from "lucide-react";

type DashboardClientProps = {
  userName: string;
  stats: {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  };
  chartData: { name: string; count: number }[];
};

export function DashboardClient({ userName, stats, chartData }: DashboardClientProps) {
  return (
    // MODIFIED: Added main container styling and animated background
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 text-white relative bg-gradient-to-br from-[#000D01] via-[#0D2321] to-[#000D01]">
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#3DB876] rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00DFBB] rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        {/* MODIFIED: Header styling */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#70D56D] to-[#00DFBB]">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-[#70D56D]/70">Here’s a look at your productivity.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={ClipboardList} title="Total Tasks" value={stats.total} color="teal" />
          <StatCard icon={CheckSquare} title="Completed" value={stats.completed} color="green" />
          <StatCard icon={ListTodo} title="Pending" value={stats.pending} color="orange" />
          <StatCard
            icon={Percent}
            title="Completion Rate"
            value={`${stats.completionRate.toFixed(0)}%`}
            color="violet"
          />
        </div>

        {/* MODIFIED: Chart Section container styling */}
        <div className="rounded-2xl p-6 border border-[#3DB876]/20 backdrop-blur-xl bg-white/[0.05]">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#70D56D] to-[#00DFBB]">
            Task Overview
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                {/* ADDED: Gradient definition for the bar */}
                <defs>
                  <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00DFBB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#70D56D" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3DB876" strokeOpacity={0.1} />
                <XAxis dataKey="name" stroke="#70D56D" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#70D56D" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(0, 223, 187, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#0D2321",
                    border: "1px solid #3DB876",
                    borderRadius: "0.75rem",
                  }}
                  labelStyle={{ color: "#70D56D" }}
                />
                <Bar dataKey="count" fill="url(#taskGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// MODIFIED: Stat Card Component styling
function StatCard({ icon: Icon, title, value, color }: any) {
  const colors: { [key: string]: { gradient: string; shadow: string } } = {
    teal: { gradient: "from-[#00DFBB] to-[#3DB876]", shadow: "shadow-[#00DFBB]/40" },
    green: { gradient: "from-green-500 to-emerald-400", shadow: "shadow-green-500/40" },
    orange: { gradient: "from-amber-500 to-orange-400", shadow: "shadow-amber-500/40" },
    violet: { gradient: "from-violet-500 to-purple-400", shadow: "shadow-violet-500/40" },
  };

  return (
    <div className={`p-6 rounded-2xl border border-[#3DB876]/20 backdrop-blur-xl bg-white/[0.05] flex items-center gap-4 transition-all duration-300 hover:border-[#3DB876]/50 hover:scale-[1.02] hover:shadow-2xl ${colors[color].shadow}`}>
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color].gradient} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-[#70D56D]/80 text-sm">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  );
}
// File: apps/web/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardClient } from "../components/dashboard-client";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Server-side function to fetch and process task data
async function getUserAnalytics(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("pracsphere");
    const tasks = await db.collection("tasks").find({ userId: new ObjectId(userId) }).toArray();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'complete').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const stats = {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      completionRate: completionRate,
    };

    const chartData = [
      { name: 'Pending', count: pendingTasks },
      { name: 'Completed', count: completedTasks },
    ];

    return { stats, chartData };
  } catch (error) {
    // Return default values in case of an error
    return {
      stats: { total: 0, completed: 0, pending: 0, completionRate: 0 },
      chartData: [],
    };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch data on the server
  const { stats, chartData } = await getUserAnalytics(session.user.id);

  return (
    // Render the Client Component with the fetched data
    <DashboardClient
      userName={session.user.name || "User"}
      stats={stats}
      chartData={chartData}
    />
  );
}
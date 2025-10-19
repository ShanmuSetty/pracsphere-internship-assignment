// File: apps/web/app/components/task-manager.tsx
"use client";

import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import { Calendar, Plus, Trash2, Check, Filter } from 'lucide-react';

// Define a type for our task object
type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "complete";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
};

// Define a type for our filter states
type FilterType = "all" | "pending" | "complete";

// ADDED: Helper object for styling status tags
const statusStyles = {
  pending: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  complete: 'bg-green-500/10 text-green-400 border-green-500/30',
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  // --- Data Fetching and CRUD Operations ---

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks.");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTaskTitle,
        description: newTaskDescription,
        dueDate: newTaskDueDate,
      }),
    });

    if (res.ok) {
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate("");
      setIsModalOpen(false);
    } else {
      setError("Failed to add task.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    if (res.ok) {
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } else {
      setError("Failed to delete task.");
    }
  };

  const handleUpdateStatus = async (taskId: string, currentStatus: "pending" | "complete") => {
    const newStatus = currentStatus === "pending" ? "complete" : "pending";
    const taskToUpdate = tasks.find(task => task._id === taskId);

    const res = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...taskToUpdate, status: newStatus }),
    });

    if (res.ok) {
      setTasks(prev => prev.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } else {
      setError("Failed to update status.");
    }
  };

  // --- Filtering Logic ---

  const filteredTasks = useMemo(() => {
    if (currentFilter === "all") {
      return tasks;
    }
    return tasks.filter(task => task.status === currentFilter);
  }, [tasks, currentFilter]);

  // --- Rendered JSX with new styles ---

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 relative bg-gradient-to-br from-[#000D01] via-[#0D2321] to-[#000D01]">
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#3DB876] rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00DFBB] rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#70D56D] rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header and "New Task" Button */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#70D56D] to-[#00DFBB]">
            Task Manager
          </h1>
          <p className="text-[#70D56D]/70">Organize your work and life, finally.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="group px-6 py-3 rounded-xl bg-gradient-to-r from-[#3DB876] to-[#00DFBB] hover:from-[#00DFBB] hover:to-[#70D56D] text-white font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00DFBB]/50"
        >
          <Plus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
          New Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-[#3DB876]/20 pb-4">
        <div className="flex items-center gap-2 text-[#70D56D]/70">
          <Filter size={16} />
          <span className="text-sm font-semibold">Filter by:</span>
        </div>
        <button
          onClick={() => setCurrentFilter("all")}
          className={`px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300 ${
            currentFilter === 'all'
              ? 'bg-gradient-to-r from-[#3DB876] to-[#00DFBB] text-white shadow-lg shadow-[#00DFBB]/30'
              : 'bg-[#0D2321] text-[#70D56D] hover:bg-[#0D2321]/80 border border-[#3DB876]/30'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setCurrentFilter("pending")}
          className={`px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300 ${
            currentFilter === 'pending'
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-[#0D2321] text-[#70D56D] hover:bg-[#0D2321]/80 border border-[#3DB876]/30'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setCurrentFilter("complete")}
          className={`px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300 ${
            currentFilter === 'complete'
              ? 'bg-gradient-to-r from-[#3DB876] to-[#70D56D] text-white shadow-lg shadow-[#3DB876]/30'
              : 'bg-[#0D2321] text-[#70D56D] hover:bg-[#0D2321]/80 border border-[#3DB876]/30'
          }`}
        >
          Completed
        </button>
      </div>

      {error && (
        <div className="relative z-10 text-red-400 bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-4 backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Task List */}
      <div className="relative z-10 space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#3DB876]/30 border-t-[#00DFBB] rounded-full animate-spin"></div>
            <p className="text-[#70D56D]/70 mt-4">Loading tasks...</p>
          </div>
        ) : filteredTasks.map((task) => (
          <div
            key={task._id}
            className={`group rounded-2xl p-6 border border-white/[0.1] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-white/[0.2] ${
              task.status === 'complete' ? 'hover:shadow-[#3DB876]/30' : 'hover:shadow-orange-500/30'
            }`}
            style={{
              background: task.status === 'complete'
                ? 'linear-gradient(135deg, rgba(61, 184, 118, 0.1), rgba(0, 223, 187, 0.15))'
                : 'linear-gradient(135deg, rgba(255, 165, 0, 0.08), rgba(255, 200, 0, 0.05))',
            }}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => handleUpdateStatus(task._id, task.status)}
                className={`w-7 h-7 flex-shrink-0 mt-1 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
                  task.status === 'complete'
                    ? 'bg-gradient-to-br from-[#3DB876] to-[#00DFBB] border-[#00DFBB] shadow-lg shadow-[#00DFBB]/30'
                    : 'border-[#70D56D]/50 hover:border-[#00DFBB] hover:bg-white/[0.05]'
                }`}
              >
                {task.status === 'complete' && <Check size={16} className="text-white" />}
              </button>

              <div className="flex-1">
                {/* --- MODIFICATION START --- */}
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                    task.status === 'complete'
                      ? 'line-through text-[#70D56D]/50'
                      : 'text-[#00DFBB] group-hover:text-[#70D56D]'
                  }`}>
                    {task.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusStyles[task.status]}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                {/* --- MODIFICATION END --- */}

                {task.description && (
                  <p className={`text-sm transition-colors duration-300 ${
                    task.status === 'complete'
                      ? 'line-through text-[#70D56D]/40'
                      : 'text-[#70D56D]/70'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDeleteTask(task._id)}
                className="p-2 text-[#70D56D]/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {task.dueDate && (
              <div className="flex items-center gap-2 text-sm text-[#70D56D]/60 mt-4 pl-11">
                <Calendar size={16} />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        ))}

        {!isLoading && filteredTasks.length === 0 && (
          <div className="text-center py-16 bg-gradient-to-br from-[#0D2321]/40 to-[#000D01]/40 rounded-2xl border border-[#3DB876]/20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#3DB876]/20 to-[#00DFBB]/20 rounded-full flex items-center justify-center">
              <Check size={32} className="text-[#70D56D]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#00DFBB] mb-2">No tasks found</h3>
            <p className="text-[#70D56D]/70">Try selecting a different filter or adding a new task.</p>
          </div>
        )}
      </div>

      {/* "New Task" Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddTask} className="bg-gradient-to-br from-[#0D2321] to-[#000D01] p-8 rounded-3xl w-full max-w-lg border border-[#3DB876]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00DFBB] rounded-full mix-blend-screen filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3DB876] rounded-full mix-blend-screen filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#70D56D] to-[#00DFBB]">
                Create a New Task
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#70D56D] mb-2">Title</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-[#000D01]/50 border border-[#3DB876]/30 rounded-xl outline-none focus:ring-2 focus:ring-[#00DFBB] focus:border-transparent text-white placeholder-[#70D56D]/40 transition-all duration-300"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#70D56D] mb-2">Description (Optional)</label>
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-[#000D01]/50 border border-[#3DB876]/30 rounded-xl outline-none focus:ring-2 focus:ring-[#00DFBB] focus:border-transparent text-white placeholder-[#70D56D]/40 h-28 resize-none transition-all duration-300"
                    placeholder="Add more details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#70D56D] mb-2">Due Date (Optional)</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#000D01]/50 border border-[#3DB876]/30 rounded-xl outline-none focus:ring-2 focus:ring-[#00DFBB] focus:border-transparent text-white transition-all duration-300"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-[#0D2321] hover:bg-[#0D2321]/80 border border-[#3DB876]/30 text-[#70D56D] font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3DB876] to-[#00DFBB] hover:from-[#00DFBB] hover:to-[#70D56D] text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00DFBB]/50"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
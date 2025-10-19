"use client";

import { useState, FormEvent } from "react";
// Assuming 'next-auth' User type or a similar structure
// Since this is a self-contained file, we define a mock type for clarity
type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id: string;
};
import { Mail, UserCircle, CheckCircle, AlertCircle } from "lucide-react";

type ProfileClientProps = {
  user: User;
  // Theme is optional, defaults to dark
  theme?: "light" | "dark";
};

export function ProfileClient({ user, theme = "dark" }: ProfileClientProps) {
  const [name, setName] = useState(user.name || "");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Theme-Specific Styles ---

  const cardBg =
    theme === "dark"
      ? "bg-gradient-to-br from-[#0D2321]/80 to-[#000D01]/90 border border-[#3DB876]/30 shadow-2xl shadow-[#00DFBB]/20 text-white"
      : "bg-white border border-[#D6F5E1] shadow-xl shadow-[#C6F3D8]/40 text-gray-900";

  const textColor = theme === "dark" ? "text-[#70D56D]" : "text-[#004D26]";
  const inputBg = theme === "dark" ? "bg-[#000D01]/60 border-[#3DB876]/30 text-white placeholder-[#70D56D]/40 focus:ring-[#00DFBB]" : "bg-white border-[#D3F2E0] text-[#004D26] placeholder-[#9ABCA7] focus:ring-[#3DB876]/40";
  const disabledInputBg = theme === "dark" ? "bg-[#0D2321]/30 border-[#3DB876]/20 text-[#70D56D]/50" : "bg-[#F7FFF9] border-[#D3F2E0] text-[#6B8F78]";
  const avatarStyle = theme === "dark" ? "bg-gradient-to-br from-[#3DB876] to-[#00DFBB] shadow-[#00DFBB]/30 text-white" : "bg-gradient-to-br from-[#00C27A] to-[#3DB876] shadow-[#A4E7B9]/60 text-white";
  const buttonStyle = theme === "dark" ? "bg-gradient-to-r from-[#3DB876] to-[#00DFBB] hover:from-[#00DFBB] hover:to-[#70D56D] shadow-[#3DB876]/40" : "bg-gradient-to-r from-[#00C27A] via-[#3DB876] to-[#82D48C] hover:from-[#3DB876] hover:to-[#00C27A] shadow-[#A4E7B9]/60";
  const headerGradient = theme === "dark" ? "bg-gradient-to-r from-[#70D56D] to-[#00DFBB]" : "bg-gradient-to-r from-[#00C27A] via-[#3DB876] to-[#82D48C]";

  // --- API Submission Logic ---

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Mock API call based on original intent
    // In a real Next.js environment, this hits the local API route
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    // Mock API response delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const data = await res.json();
    if (res.ok) {
      setMessage({ type: "success", text: data.message || "Profile updated successfully!" });
    } else {
      setMessage({ type: "error", text: data.message || "Failed to update profile. Please try again." });
    }
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-[#000D01]' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-2xl rounded-3xl p-8 sm:p-10 ${cardBg} backdrop-blur-sm transition-colors duration-500`}>
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-4xl font-extrabold bg-clip-text text-transparent ${headerGradient}`}
          >
            Profile Settings
          </h1>
          <p className={`${textColor} mt-2 tracking-wide text-sm opacity-80`}>
            Manage your account details and preferences.
          </p>
        </div>

        {/* Profile Avatar & Info */}
        <div className="flex flex-col items-center mb-10 pb-8 border-b border-current/20">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg ${avatarStyle}`}
          >
            {user.name?.[0]?.toUpperCase() || <UserCircle size={40} />}
          </div>
          <h2 className={`${textColor} text-2xl mt-4 font-bold`}>{user.name}</h2>
          <p className={`${textColor} text-sm flex items-center gap-2 mt-1 opacity-70`}>
            <Mail size={14} />
            {user.email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name Input */}
          <div>
            <label className={` text-sm font-semibold mb-2 flex items-center gap-2 ${textColor}`}>
              <UserCircle size={16} />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 border focus:ring-2 focus:border-transparent ${inputBg}`}
              placeholder="Enter your full name..."
              required
            />
          </div>

          {/* Email Input (Disabled) */}
          <div>
            <label className={` text-sm font-semibold mb-2 flex items-center gap-2 ${textColor} opacity-60`}>
              <Mail size={16} />
              Email Address (cannot be changed)
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className={`w-full px-4 py-3 rounded-xl cursor-not-allowed ${disabledInputBg}`}
            />
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-opacity duration-300 ${
                message.type === "success"
                  ? theme === "dark"
                    ? "bg-[#3DB876]/20 text-[#70D56D] border border-[#3DB876]/30"
                    : "bg-[#E9FBF0] text-[#00A76B] border border-[#00C27A]/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0" />
              )}
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading || name === user.name}
              className={`group px-8 py-3 rounded-xl font-semibold text-lg text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none hover:scale-[1.02] ${buttonStyle}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

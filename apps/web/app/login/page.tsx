"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else if (result?.ok) {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-[#000D01] via-[#0D2321] to-[#000D01]' 
        : 'bg-gradient-to-br from-[#F0EDE5] via-[#F8F6F1] to-[#F0EDE5]'
    }`}>
      {/* Animated background elements */}
      <div className={`fixed inset-0 transition-opacity duration-500 ${isDark ? 'opacity-30' : 'opacity-8'}`}>
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl animate-pulse ${
          isDark ? 'bg-[#3DB876] mix-blend-screen' : 'bg-[#3DB876]/20 mix-blend-multiply'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl animate-pulse ${
          isDark ? 'bg-[#00DFBB] mix-blend-screen' : 'bg-[#004643]/15 mix-blend-multiply'
        }`}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 border transition-all duration-500 ${
          isDark 
            ? 'bg-[#0D2321]/80 border-[#3DB876]/30 shadow-[#00DFBB]/10' 
            : 'bg-[#F8F6F1]/90 border-[#004643]/20 shadow-[#004643]/10'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#3DB876] to-[#00DFBB] rounded-2xl mb-4 shadow-lg shadow-[#00DFBB]/30 transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-[#004643]'
            }`}>
              Welcome back
            </h2>
            <p className={`text-sm transition-colors duration-500 ${
              isDark ? 'text-[#70D56D]/80' : 'text-[#004643]/70'
            }`}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDark ? 'text-[#70D56D]' : 'text-[#004643]'
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#00DFBB]/50 focus:border-transparent outline-none transition-all ${
                  isDark 
                    ? 'bg-[#000D01]/50 border border-[#3DB876]/30 text-white placeholder-[#70D56D]/40' 
                    : 'bg-white border border-[#004643]/20 text-[#004643] placeholder-[#004643]/40'
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDark ? 'text-[#70D56D]' : 'text-[#004643]'
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#00DFBB]/50 focus:border-transparent outline-none transition-all ${
                  isDark 
                    ? 'bg-[#000D01]/50 border border-[#3DB876]/30 text-white placeholder-[#70D56D]/40' 
                    : 'bg-white border border-[#004643]/20 text-[#004643] placeholder-[#004643]/40'
                }`}
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end">
              <a href="#" className={`text-sm font-medium transition-colors ${
                isDark ? 'text-[#00DFBB] hover:text-[#70D56D]' : 'text-[#3DB876] hover:text-[#00DFBB]'
              }`}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3DB876] to-[#00DFBB] text-white font-semibold py-3.5 rounded-xl hover:from-[#00DFBB] hover:to-[#70D56D] focus:ring-4 focus:ring-[#00DFBB]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00DFBB]/30 hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 transition-colors duration-500 ${
            isDark ? 'text-[#70D56D]/80' : 'text-[#004643]/70'
          }`}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={`font-medium transition-colors ${
              isDark ? 'text-[#00DFBB] hover:text-[#70D56D]' : 'text-[#3DB876] hover:text-[#00DFBB]'
            }`}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
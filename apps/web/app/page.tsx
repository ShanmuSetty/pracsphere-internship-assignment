'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckSquare, Users, TrendingUp, MoveDown, Sun, Moon } from 'lucide-react';
import { ScrollDownButton } from './components/scroll-down-button';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-[#000D01] via-[#0D2321] to-[#000D01] text-white' 
        : 'bg-gradient-to-br from-[#F0EDE5] via-[#F8F6F1] to-[#F0EDE5] text-[#004643]'
    }`}>
      {/* Animated background elements */}
      <div className={`fixed inset-0 transition-opacity duration-500 ${isDark ? 'opacity-30' : 'opacity-8'}`}>
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl animate-pulse ${
          isDark ? 'bg-[#3DB876] mix-blend-screen' : 'bg-[#3DB876]/20 mix-blend-multiply'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl animate-pulse delay-700 ${
          isDark ? 'bg-[#00DFBB] mix-blend-screen' : 'bg-[#004643]/15 mix-blend-multiply'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full filter blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-[#70D56D] mix-blend-screen' : 'bg-[#70D56D]/20 mix-blend-multiply'
        }`}></div>
      </div>

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b transition-colors duration-500 ${
        isDark 
          ? 'bg-[#000D01]/80 border-[#3DB876]/20' 
          : 'bg-[#F0EDE5]/90 border-[#004643]/15 shadow-sm'
      }`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/PracSphere_Logo.png"
                alt="Pracsphere Logo"
                width={100}
                height={40}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#00DFBB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-[#0D2321] hover:bg-[#3DB876]/20 text-[#70D56D]'
                  : 'bg-[#004643]/10 hover:bg-[#004643]/20 text-[#004643]'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            <Link 
              href="/login" 
              className={`px-6 py-2 text-sm transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'text-[#70D56D] hover:text-[#00DFBB]' 
                  : 'text-[#004643] hover:text-[#3DB876]'
              }`}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#3DB876] to-[#00DFBB] hover:from-[#00DFBB] hover:to-[#70D56D] text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00DFBB]/50"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center pt-24 pb-20 text-center">
          <div className="container mx-auto px-6">
            
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-8 relative">
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#3DB876] via-[#00DFBB] to-[#70D56D] rounded-2xl blur-2xl group-hover:opacity-60 transition-opacity duration-500 animate-pulse ${
                  isDark ? 'opacity-40' : 'opacity-30'
                }`}></div>
                <Image
                  src="/PracSphere_Logo.png"
                  alt="Pracsphere Logo"
                  width={400}
                  height={400}
                  className="relative shadow-2xl shadow-[#00DFBB]/30 rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in">
              Organize Your Work,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DFBB] via-[#70D56D] to-[#3DB876] animate-gradient">
                Simplify Your Life
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-[#70D56D]/80' : 'text-[#004643]/70'
            }`}>
              Pracsphere is your all-in-one platform to manage tasks, track progress, and boost productivity with a simple and intuitive interface.
            </p>
            <Link 
              href="/signup" 
              className="group relative px-10 py-5 font-bold text-lg text-white bg-gradient-to-r from-[#3DB876] to-[#00DFBB] rounded-2xl transition-all duration-300 hover:scale-110 inline-block hover:shadow-2xl hover:shadow-[#00DFBB]/50 overflow-hidden"
            >
              <span className="relative z-10">Get Started for Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00DFBB] to-[#70D56D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#70D56D] to-[#00DFBB]">
              Everything You Need in One Place
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={CheckSquare}
                title="Task Management"
                description="Create, update, and filter tasks with due dates and statuses. Never miss a deadline again."
                isDark={isDark}
              />
              <FeatureCard
                icon={Users}
                title="User Profiles"
                description="Manage your personal profile and account settings in a secure and centralized location."
                isDark={isDark}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Productivity Analytics"
                description="Visualize your progress with beautiful charts and stats to understand your workflow and stay motivated."
                isDark={isDark}
              />
            </div>
          </div>
        </section>
        <ScrollDownButton />
      </main>

      {/* Footer */}
      <footer className={`relative z-10 py-10 border-t backdrop-blur-sm transition-colors duration-500 ${
        isDark 
          ? 'border-[#3DB876]/20 bg-[#000D01]/50' 
          : 'border-[#004643]/20 bg-[#F0EDE5]/50'
      }`}>
        <div className={`container mx-auto px-6 text-center text-sm transition-colors duration-500 ${
          isDark ? 'text-[#70D56D]/70' : 'text-[#004643]/60'
        }`}>
          &copy; {new Date().getFullYear()} PracSphere by Shel-B Technologies. All Rights Reserved.
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

// Helper component for feature cards
function FeatureCard({ icon: Icon, title, description, isDark }: { icon: React.ElementType, title: string, description: string, isDark: boolean }) {
  return (
    <div className={`group relative p-10 rounded-3xl border text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
      isDark 
        ? 'bg-gradient-to-br from-[#0D2321]/80 to-[#000D01]/80 border-[#3DB876]/30 hover:border-[#00DFBB]/50 hover:shadow-[#00DFBB]/20' 
        : 'bg-[#F8F6F1]/80 border-[#004643]/20 hover:border-[#3DB876]/50 hover:shadow-[#3DB876]/15'
    }`}>
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-[#3DB876]/0 to-[#00DFBB]/0 group-hover:from-[#3DB876]/10 group-hover:to-[#00DFBB]/10'
          : 'bg-gradient-to-br from-[#3DB876]/0 to-[#00DFBB]/0 group-hover:from-[#3DB876]/5 group-hover:to-[#00DFBB]/5'
      }`}></div>
      
      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#3DB876] to-[#00DFBB] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-[#00DFBB]/30">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
          isDark 
            ? 'text-[#70D56D] group-hover:text-[#00DFBB]' 
            : 'text-[#004643] group-hover:text-[#3DB876]'
        }`}>
          {title}
        </h3>
        <p className={`leading-relaxed transition-colors duration-300 ${
          isDark 
            ? 'text-[#70D56D]/70 group-hover:text-[#70D56D]/90' 
            : 'text-[#004643]/60 group-hover:text-[#004643]/80'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
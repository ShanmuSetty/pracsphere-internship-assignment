"use client";

import { useState, useEffect } from 'react';
// 1. Import the Mouse icon instead of MoveDown
import { Mouse } from 'lucide-react';

export function ScrollDownButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      // Hide the button if the user has scrolled more than 100 pixels down
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <a
      href="#features"
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-slate-700/50 hover:bg-white/20 transition-all ${
        isVisible ? 'opacity-100 animate-bounce' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 2. Replace the old icon with the new Mouse icon */}
      <Mouse className="w-6 h-6 text-white" />
    </a>
  );
}
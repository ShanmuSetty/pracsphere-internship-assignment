import type { Config } from "tailwindcss";
import sharedConfig from "config/tailwind.config"; // Your shared config

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}", // shared UI
  ],
  presets: [sharedConfig as Config], // ✅ cast to Config
};

export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080D17",
          900: "#0B1220",
          850: "#0F172A",
          800: "#131E33",
          700: "#1C2A44",
        },
        honda: {
          50: "#FFF1F2",
          100: "#FFE0E3",
          200: "#FFC6CB",
          300: "#FF9DA6",
          400: "#FF6372",
          500: "#F52D43",
          600: "#E11D2E",
          700: "#BD1424",
          800: "#9C1522",
          900: "#811823",
        },
        mist: "#F5F6F8",
        ivory: "#FBF8F3",
        champagne: "#D9C7A3",
        obsidian: "#10131A",
        ruby: {
          50: "#FFF1F2",
          600: "#B91C2C",
          700: "#9F1239",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: [
          "var(--font-playfair)",
          "Georgia",
          "Times New Roman",
          "Times",
          "serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        lift: "0 12px 32px -12px rgba(16,24,40,0.18)",
      },
      borderRadius: {
        xl2: "1.125rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

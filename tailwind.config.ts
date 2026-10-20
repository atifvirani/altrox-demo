import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        altrox: {
          bg: "#090B09",
          secondary: "#0E110E",
          card: "#121613",
          elevated: "#161B17",
          green: "#72977A", // Soft desaturated moss / jade green
          greenLight: "#94B59B",
          greenDim: "#55725C",
          greenDark: "#2B3B2F",
          text: "#F2F2EC", // Warm white
          muted: "#92968F", // Muted neutral grey
          subtle: "#5C615A",
          border: "#1C221D",
          borderHover: "#2F3930",
        },
      },
      fontFamily: {
        sans: ["var(--font-space)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      animation: {
        "ticker": "ticker 35s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

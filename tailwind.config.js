/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f3f5f7",
          soft: "#e9eef2",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafb",
        },
        ink: {
          DEFAULT: "#14181f",
          soft: "#2c3440",
          muted: "#5a6573",
          faint: "#8b94a3",
        },
        line: {
          DEFAULT: "rgba(20, 24, 31, 0.1)",
          strong: "rgba(20, 24, 31, 0.18)",
        },
        accent: {
          DEFAULT: "#1a4a57",
          hover: "#133842",
          soft: "#d8e6eb",
          mist: "#eef4f6",
        },
        // Legacy aliases remapped for gradual migration
        steel: {
          DEFAULT: "#4a5563",
          bright: "#14181f",
          muted: "#5a6573",
          dim: "#8b94a3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.18em",
        wide: "0.12em",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(20, 24, 31, 0.05)",
        soft: "0 1px 2px rgba(20, 24, 31, 0.05), 0 8px 24px rgba(20, 24, 31, 0.07)",
        lift: "0 14px 36px rgba(20, 24, 31, 0.12)",
        float:
          "0 2px 4px rgba(20, 24, 31, 0.04), 0 12px 28px rgba(20, 24, 31, 0.08), 0 28px 56px rgba(20, 24, 31, 0.1)",
        "float-hover":
          "0 4px 8px rgba(20, 24, 31, 0.06), 0 18px 40px rgba(20, 24, 31, 0.12), 0 36px 64px rgba(20, 24, 31, 0.12)",
        btn: "0 1px 2px rgba(20, 24, 31, 0.06), 0 6px 16px rgba(20, 24, 31, 0.1)",
        "btn-hover":
          "0 4px 8px rgba(20, 24, 31, 0.08), 0 14px 28px rgba(20, 24, 31, 0.14)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

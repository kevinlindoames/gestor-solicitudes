import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        surface: {
          base: "#f8fafc",
          card: "#ffffff",
          muted: "#f1f5f9",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#64748b",
          inverse: "#ffffff",
        },
        border: {
          subtle: "#e2e8f0",
          strong: "#cbd5e1",
        },
        success: {
          50: "#ecfdf5",
          600: "#059669",
          700: "#047857",
        },
        warning: {
          50: "#fffbeb",
          600: "#d97706",
          700: "#b45309",
        },
        danger: {
          50: "#fef2f2",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
      borderRadius: {
        card: "1rem",
        control: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.08)",
        elevated: "0 10px 25px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
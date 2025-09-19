import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#F8FAFC",
        },
        midnight: "#0B2447",
        background: "#F8FAFC",
        muted: {
          DEFAULT: "#E2E8F0",
          foreground: "#64748B",
        },
        border: "rgba(14,165,233,0.08)",
        ring: "#0EA5E9",
      },
      fontFamily: {
        sans: ["'Inter Variable'", ...fontFamily.sans],
        mono: ["'JetBrains Mono'", ...fontFamily.mono],
      },
      boxShadow: {
        glass: "0 12px 45px -20px rgba(14, 165, 233, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config;

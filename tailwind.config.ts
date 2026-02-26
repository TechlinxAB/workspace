import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8AC48B",
        accent: "#E6F0EA",
        ink: "#121212",
        muted: "#5E6B63",
        subtle: "#7A8880",
        glass: "rgba(255,255,255,0.55)",
        glassStrong: "rgba(255,255,255,0.70)",
        glassBorder: "rgba(255,255,255,0.35)",
        success: "#2E7D32",
        successBg: "#E7F5EA",
        warning: "#B45309",
        warningBg: "#FFF3E0",
        danger: "#DC2626",
        dangerBg: "#FEECEC",
        info: "#2563EB"
      },
      borderRadius: {
        card: "22px",
        control: "14px",
        blob: "12px"
      },
      boxShadow: {
        panel: "0 10px 30px rgba(18,18,18,0.06)",
        "panel-hover": "0 18px 55px rgba(18,18,18,0.12)"
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

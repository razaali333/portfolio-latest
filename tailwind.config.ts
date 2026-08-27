import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        paperDeep: "var(--paper-deep)",
        ink: "var(--ink)",
        inkSoft: "var(--ink-soft)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        sage: "var(--sage)",
        sepia: "var(--sepia)",
        clay: "var(--clay)",
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        pen: ["var(--font-pen)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        label: "0.16em",
        wider2: "0.28em",
      },
      keyframes: {
        "walk-bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.2px)" },
        },
        "limb-a": {
          "0%,100%": { transform: "rotate(24deg)" },
          "50%": { transform: "rotate(-24deg)" },
        },
        "limb-b": {
          "0%,100%": { transform: "rotate(-24deg)" },
          "50%": { transform: "rotate(24deg)" },
        },
        "lantern-sway": {
          "0%,100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(6px,-10px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.28", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "draw-rule": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "dash-run": {
          to: { strokeDashoffset: "-40" },
        },
      },
      animation: {
        "walk-bob": "walk-bob var(--step,0.62s) ease-in-out infinite",
        "limb-a": "limb-a var(--step,0.62s) ease-in-out infinite",
        "limb-b": "limb-b var(--step,0.62s) ease-in-out infinite",
        "lantern-sway": "lantern-sway var(--step,0.62s) ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4.5s ease-in-out infinite",
        "rise-in": "rise-in 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.2s ease both",
      },
    },
  },
  plugins: [],
} satisfies Config;

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
        // Marshall Reddick brand palette
        // Authoritative source: mr-brand-style-sheet.md
        mr: {
          base: "#316878",   // primary brand color
          light: "#50AAC4",  // light teal accent
          mid: "#3A7B8E",    // mid teal
          pale: "#8BB8C4",   // soft pale blue, light tints
          dark: "#1C3C45",   // darkest tone, dark backgrounds
        },
        // Convenience aliases for surfaces and text
        surface: {
          light: "#FCFCFC",  // light background
          dark: "#1C3C45",   // dark background
        },
        body: "#555555",     // default body text on light
      },
      fontFamily: {
        heading: ["var(--font-raleway)", "sans-serif"],
        body: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
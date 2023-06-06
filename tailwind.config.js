/** @type {import('tailwindcss').Config} */

const px0to10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0to100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0to2000 = { ...Array.from(Array(2001)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      inset: px0to100,
      borderWidth: px0to10,
      borderRadius: px0to100,
      width: px0to2000,
      height: px0to2000,
      maxWidth: px0to2000,
      maxHeight: px0to2000,
      minWidth: px0to2000,
      minHeight: px0to2000,
      padding: px0to100,
      margin: px0to100,
      zIndex: {
        100: "100",
        200: "200",
        300: "300",
      },
      gap: px0to100,
      leading: px0to100,
      boxShadow: {
        paper: "0px 0px 4px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        "login-background": "#111723",
      },
    },
  },
  plugins: [],
};

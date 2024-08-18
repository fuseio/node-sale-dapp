import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "4xl": { max: "2699px" },
      "3xl": { max: "1750px" },
      "2xl": { max: "1535px" },
      xl: { max: "1200px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      colors: {
        tertiary: "#F3F3F3",
        success: "#B4F9BA",
        "light-gray": "#D9D9D9",
      },
      fontFamily: {
        mona: ["var(--font-mona-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;

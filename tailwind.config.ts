import type { Config } from "tailwindcss";
import "tailwind-scrollbar";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px,1fr))",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#1d1d1d",
            foreground: "#f3f4f6",
            primary: "#6366f1",
            secondary: "#0ea5e9",
          },
        },
        light: {
          colors: {
            background: "#f3f4f6",
            foreground: "#1d1d1d",
            primary: "#6366f1",
            secondary: "#0ea5e9",
          },
        },
      },
    }),
    require("tailwind-scrollbar"),
  ],
};
export default config;

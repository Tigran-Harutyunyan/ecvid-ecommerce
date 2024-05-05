// tailwind.config.js
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";
import sfTypography from "@storefront-ui/typography";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: [
    "./index.html",
    "./**/*.vue",
    "./node_modules/@storefront-ui/vue/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#6e6b7b",
        title: "#5e5873",
        hero: " #636363",
      },
    },
  },
  plugins: [sfTypography],
};

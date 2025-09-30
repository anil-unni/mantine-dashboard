/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend Tailwind's default theme here if needed
      // This allows you to add custom colors, fonts, etc.
    },
  },
  plugins: [],
  // Important: Add this to ensure Tailwind doesn't conflict with Mantine
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Mantine
  },
}

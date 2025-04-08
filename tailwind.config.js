// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // include all source files
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // if you're using Next.js app directory
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
    colors: {
      primary: "#4285f4",
    },
  },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}
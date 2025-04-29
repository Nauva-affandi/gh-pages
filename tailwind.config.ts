/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backdropBlur: {
        'sm-1': '2.2px',
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "50%": { transform: "translateX(2px)" },
          "75%": { transform: "translateX(-2px)" },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
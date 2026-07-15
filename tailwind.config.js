/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: '#006a4e',
        red: '#f42a41',
        gold: '#d4a843',
        'gold-light': '#f0d080',
        navy: '#1a1a2e',
        offwhite: '#f7f4ef',
        cream: '#fdf9f0',
      },
      fontFamily: {
        bangla: ['Tiro Bangla', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
        float: '0 8px 40px rgba(0,0,0,0.12)',
        gold: '0 4px 20px rgba(212,168,67,0.3)',
      },
    },
  },
  plugins: [],
}

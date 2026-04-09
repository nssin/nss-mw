/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Re-mapped core colors for backward compatibility */
        primary: '#1A1A1A',
        secondary: '#274D39',
        dark: '#121212',
        
        /* New UI specific colors extracted from the reference image */
        'uber-green': '#274D39',
        'uber-black': '#1A1A1A',
        'uber-light': '#F6F6F6',
      },
      fontFamily: {
        /* Geometric font matching the reference design */
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
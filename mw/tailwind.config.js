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
        /* Unified Theme Colors for the New Map-Centric UI */
        primary: '#000000',       /* Absolute black for Header/Footer */
        secondary: '#244356',     /* Deep Map Blue for Hero Section */
        dark: '#0D0D0D',          /* Lidar/Kepler.gl Dark Dashboard Base */
        
        /* Accented Interface Colors */
        'map-blue': '#1A2B3C',    /* Contrast map tile blue */
        'accent-green': '#274D39', /* Featured card green */
        'accent-yellow': '#F59E0B',/* Warning/Highlight yellow */
        'accent-blue': '#1E40AF',  /* Informational blue */
        'neon-blue': '#3b82f6',    /* Telemetry stream blue */
        'uber-light': '#FFFFFF',   /* Pure white for content sections */
        'uber-black': '#000000',
      },
      fontFamily: {
        /* Geometric 'Outfit' font family for a sleek, modern tech look */
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        /* Fluid entrance animations for scrolling pages */
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'zoom-in': 'zoom-in 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
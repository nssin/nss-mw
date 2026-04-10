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
        /* Core Industrial Palette strictly based on HEIGL design specs */
        primary: '#1e40af',           /* Bright Blue Accent */
        'primary-light': '#3b82f6',   /* Lighter Blue for Gradients */
        secondary: '#ffffff',         /* Pure White Text/Highlights */
        dark: '#2d2d2d',              /* Global Background Base */
        
        /* Modular Block Colors */
        'industrial-black': '#1a1a1a', /* Navigation and Footer blocks */
        'industrial-gray': '#3d3d3d',  /* Section contrast blocks */
      },
      fontFamily: {
        /* Geometric 'Outfit' font for a modern manufacturing aesthetic */
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        /* Smooth block-level entrance animations for scrolling sections */
        'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
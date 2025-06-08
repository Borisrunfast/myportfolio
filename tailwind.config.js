// tailwind.config.js
import colors from 'tailwindcss/colors'
import animatePlugin from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // semantic grays
        background: colors.gray['900'],    // was bg-gray-900
        surface:    colors.gray['800'],    // was bg-gray-800
        surfaceDark:colors.gray['700'],    // bg-gray-700
        border:     colors.gray['600'],    // border-gray-600
        text:       colors.gray['100'],    // text-gray-100
        textLight:  colors.gray['200'],    // text-gray-200
        textMuted:  colors.gray['300'],    // text-gray-300
        textDim:    colors.gray['400'],    // text-gray-400

        // indigo accent
        primary:      colors.indigo['600'], // bg-indigo-600
        primaryLight: colors.indigo['500'], // bg-indigo-500

        // your subtle brand green
        brand: {
          light: '#6EE7B7',    // emerald-200
          DEFAULT: '#10B981',  // emerald-500
          dark: '#047857',     // emerald-800
        }
      },
      keyframes: {
        type: {
          '0%':   { width: '0ch' },
          '100%': { width: '20ch' },
        },
        blink: {
          '0%,100%': { borderColor: 'transparent' },
          '50%':     { borderColor: '#fff' },
        },
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(1rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        type:    'type 2s steps(20) forwards, blink .7s step-end infinite',
        'fade-up':'fade-up 1s ease-out forwards'
      }
    }
  },
  plugins: [
    animatePlugin,
  ]
}

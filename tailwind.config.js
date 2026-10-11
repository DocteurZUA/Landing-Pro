/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mousse: {
          DEFAULT: '#2E4036',
          dark: '#1C2822',
          light: '#3D5447',
        },
        argile: {
          DEFAULT: '#CC5833',
          dark: '#A84424',
          light: '#E26D49',
        },
        creme: {
          DEFAULT: '#F2F0E9',
          light: '#FAF9F6',
          tint: '#E6E3D8',
        },
        charbon: {
          DEFAULT: '#1A1A1A',
          deep: '#111111',
          soft: '#252525',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      }
    },
  },
  plugins: [],
}

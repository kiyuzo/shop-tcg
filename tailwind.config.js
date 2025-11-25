/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Japanese minimalist palette
        sumi: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        wabi: {
          50: '#f8f7f4',
          100: '#f0ede6',
          200: '#e3ddd0',
          300: '#d1c7b3',
          400: '#bcad94',
          500: '#a99478',
          600: '#8f7a61',
          700: '#756350',
          800: '#5f5244',
          900: '#4f443a',
        },
        sakura: {
          50: '#fdf4f5',
          100: '#fce7eb',
          200: '#fad3db',
          300: '#f5aebb',
          400: '#ef7f94',
          500: '#e24768',
          600: '#ce2f57',
          700: '#ad2247',
          800: '#901f41',
          900: '#7b1d3d',
        },
        matcha: {
          50: '#f5f8f4',
          100: '#e8f0e4',
          200: '#d2e1ca',
          300: '#afcba3',
          400: '#85ae75',
          500: '#619152',
          600: '#4a733d',
          700: '#3c5b32',
          800: '#32492b',
          900: '#2b3e26',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-noto-serif-jp)', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'wabi': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'wabi-lg': '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B16',
          900: '#0A1428',
          800: '#101D38',
        },
        'electric-blue': {
          500: '#2F6FFF',
          400: '#5A8CFF',
        },
        'cyan-glow': {
          400: '#3FE0E0',
        },
        white: {
          100: '#F5F7FA',
        },
        slate: {
          400: '#94A3B8',
        },
        'success-green': '#2ECC71',
      },
      backgroundColor: {
        'glass-fill': 'rgba(255,255,255,0.04)',
      },
      borderColor: {
        'glass-border': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(47,111,255,0.08)',
        'glow-lg': '0 0 80px rgba(47,111,255,0.14)',
      },
      backgroundImage: {
        'gradient-black': 'linear-gradient(180deg, #000000 0%, #0A1428 100%)',
        'gradient-accent': 'linear-gradient(90deg, #2F6FFF 0%, #3FE0E0 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        // Brand colors
        brand: {
          black: '#0A0A0B',
          dark: '#111115',
          charcoal: '#1C1C22',
          slate: '#2A2A33',
          smoke: '#3D3D4A',
          gray: '#6B6B7A',
          silver: '#9898A8',
          light: '#C8C8D8',
          cream: '#F5F3EE',
          white: '#FAFAF8',
        },
        gold: {
          deep: '#8B6914',
          DEFAULT: '#C9A84C',
          bright: '#E0C068',
          light: '#F0D890',
          pale: '#F8EDCA',
        },
        concrete: {
          dark: '#2C2C2C',
          DEFAULT: '#6E6E6E',
          light: '#B4B4B4',
          pale: '#E8E8E8',
        },
        steel: {
          dark: '#1A2535',
          DEFAULT: '#2D4263',
          light: '#4A6FA5',
          bright: '#7BA7D0',
        },
      },
      backgroundImage: {
        'grain': "url('/images/grain.png')",
        'grid-pattern': "linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)",
        'hero-gradient': 'linear-gradient(135deg, #0A0A0B 0%, #1C1C22 50%, #0A0A0B 100%)',
        'gold-gradient': 'linear-gradient(135deg, #8B6914, #C9A84C, #E0C068)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(10,10,11,0.95) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '128': '32rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'counter': 'counter 2s ease forwards',
        'draw': 'draw 1.5s ease forwards',
        'spotlight': 'spotlight 2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(201,168,76,0)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201,168,76,0.3)',
        'gold-sm': '0 0 15px rgba(201,168,76,0.2)',
        'dark': '0 25px 50px rgba(0,0,0,0.8)',
        'card': '0 10px 40px rgba(0,0,0,0.4)',
        'inner-gold': 'inset 0 1px 0 rgba(201,168,76,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        '3xl': '1920px',
      },
      gridTemplateColumns: {
        'portfolio': 'repeat(auto-fill, minmax(350px, 1fr))',
        'services': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}

export default config

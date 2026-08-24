import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bebas)', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        void: '#050505',
        graphite: '#0e0e0e',
        charcoal: '#1a1a1a',
        'fire-red': '#C41E3A',
        'fire-red-light': '#E02040',
        'fire-red-dark': '#8B0000',
        ember: '#FF5722',
        'ember-light': '#FF7043',
        gold: '#D4A017',
        'gold-light': '#E8B830',
        'warm-white': '#F5F0E8',
        steel: '#8A8E91',
      },
      fontSize: {
        'cinematic-xl': ['clamp(3.5rem, 8vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'cinematic-lg': ['clamp(2.5rem, 5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'cinematic-md': ['clamp(2rem, 3.5vw, 4.5rem)', { lineHeight: '1' }],
      },
      backgroundImage: {
        'radial-fire': 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(196,30,58,0.25), transparent)',
      },
      maxWidth: {
        'container': '1400px',
      },
      animation: {
        'gold-shimmer': 'gold-shimmer 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        'gold-shimmer': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;

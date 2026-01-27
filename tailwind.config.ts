import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors (Dark Blue backgrounds with Gold accents)
        dark: {
          bg: {
            primary: '#0A1628',      // Very dark blue
            secondary: '#132337',    // Dark blue
            tertiary: '#1E3A5F',     // Medium dark blue
          },
          accent: {
            primary: '#D4AF37',      // Gold
            secondary: '#C19B2B',    // Darker gold
          },
          success: '#D4AF37',        // Gold for success
          warning: '#FFB800',
          error: '#FF3B30',
        },
        // Light Mode Colors (White backgrounds with Dark Blue and Gold)
        light: {
          bg: {
            primary: '#FFFFFF',      // White
            secondary: '#F8FAFC',    // Very light gray/white
            tertiary: '#F1F5F9',     // Light gray
          },
          accent: {
            primary: '#1E3A5F',      // Dark blue
            secondary: '#0F2847',    // Darker blue
          },
          success: '#D4AF37',        // Gold for success
          warning: '#FF8C00',
          error: '#DC3545',
        },
        // Brand colors
        brand: {
          gold: '#D4AF37',           // Primary gold
          'gold-light': '#E5C158',   // Light gold
          'gold-dark': '#C19B2B',    // Dark gold
          blue: '#1E3A5F',           // Dark blue
          'blue-dark': '#0F2847',    // Darker blue
          'blue-light': '#2E5A8F',   // Lighter blue
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',        // Gold glow
        'glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',     // Gold glow large
        'glow-blue': '0 0 20px rgba(30, 58, 95, 0.3)',     // Blue glow
        'glow-blue-lg': '0 0 40px rgba(30, 58, 95, 0.4)', // Blue glow large
      },
    },
  },
  plugins: [],
}

export default config

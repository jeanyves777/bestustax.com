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
        // Dark Mode Colors (Charcoal/Slate backgrounds with Red & Gold accents)
        dark: {
          bg: {
            primary: '#2e353d',      // Charcoal
            secondary: '#444f5a',    // Dark slate
            tertiary: '#5a6877',     // Medium gray
          },
          accent: {
            primary: '#c43201',      // Burnt red
            secondary: '#912501',    // Dark maroon
          },
          success: '#C7AE6A',        // Gold for success
          warning: '#FFB800',
          error: '#FF3B30',
        },
        // Light Mode Colors (White backgrounds with Slate and Red)
        light: {
          bg: {
            primary: '#FFFFFF',      // White
            secondary: '#F8FAFC',    // Very light gray/white
            tertiary: '#F1F5F9',     // Light gray
          },
          accent: {
            primary: '#912501',      // Dark maroon
            secondary: '#2e353d',    // Charcoal
          },
          success: '#C7AE6A',        // Gold for success
          warning: '#FF8C00',
          error: '#DC3545',
        },
        // Brand colors
        brand: {
          gold: '#C7AE6A',           // Muted gold
          'gold-light': '#d4be82',   // Light gold
          'gold-dark': '#a8935a',    // Dark gold
          red: '#c43201',            // Burnt red/orange
          'red-dark': '#912501',     // Dark maroon
          'red-light': '#e04a1a',    // Lighter red
          slate: '#444f5a',          // Dark slate
          'slate-dark': '#2e353d',   // Charcoal
          'slate-light': '#5a6877',  // Medium gray
          // Keep blue aliases for backward compatibility
          blue: '#444f5a',           // Maps to slate
          'blue-dark': '#2e353d',    // Maps to charcoal
          'blue-light': '#5a6877',   // Maps to medium gray
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
        'glow': '0 0 20px rgba(199, 174, 106, 0.3)',        // Gold glow
        'glow-lg': '0 0 40px rgba(199, 174, 106, 0.4)',     // Gold glow large
        'glow-red': '0 0 20px rgba(196, 50, 1, 0.3)',       // Red glow
        'glow-red-lg': '0 0 40px rgba(196, 50, 1, 0.4)',    // Red glow large
        'glow-blue': '0 0 20px rgba(68, 79, 90, 0.3)',      // Slate glow
        'glow-blue-lg': '0 0 40px rgba(68, 79, 90, 0.4)',   // Slate glow large
      },
    },
  },
  plugins: [],
}

export default config

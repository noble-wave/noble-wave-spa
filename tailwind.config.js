/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052FF',
          50: '#E6EFFF',
          100: '#CCE0FF',
          200: '#99C1FF',
          300: '#66A3FF',
          400: '#3384FF',
          500: '#0052FF',
          600: '#0042CC',
          700: '#003199',
          800: '#002166',
          900: '#001033',
          950: '#000819',
          dark: '#7AA2FF'
        },
        secondary: {
          DEFAULT: '#00D1B2',
          50: '#E6FDF9',
          100: '#CCFAF3',
          200: '#99F6E7',
          300: '#66F1DB',
          400: '#33EDCF',
          500: '#00D1B2',
          600: '#00A78E',
          700: '#007D6B',
          800: '#005447',
          900: '#002A24',
          950: '#001512'
        },
        accent: {
          DEFAULT: '#FFC857',
          50: '#FFFCF0',
          100: '#FFF8E0',
          200: '#FFF1C2',
          300: '#FFEA9F',
          400: '#FFD97B',
          500: '#FFC857',
          600: '#FFB319',
          700: '#DB9400',
          800: '#9D6B00',
          900: '#5F4100',
          950: '#3F2B00'
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],
        'h1': ['2.75rem', { lineHeight: '3.5rem' }],
        'h2': ['2.125rem', { lineHeight: '2.75rem' }],
        'h3': ['1.75rem', { lineHeight: '2.25rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body': ['1rem', { lineHeight: '1.625rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.375rem' }]
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};

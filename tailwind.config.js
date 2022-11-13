/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 1024px) { ... }

      xl: '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: '12px',
    },

    extend: {
      borderRadius: {
        20: '20px',
      },
      colors: {
        primary: '#B7EC5D',
        'primary-dark': '#648D1E',
        'primary-light': 'rgba(183, 236, 93, 0.3)',
        secondary: '#4D4D4D',
        'secondary-dark': '#222222',
        'secondary-light': '#F5F5F5',
        success: '#B7EC5D',
        'success-dark': '#648D1E',
        'success-light': '#D9FF99',
        danger: '#F93819',
        'danger-dark': '#A01600',
        'danger-light': '#FFA394',
        blue: '#0066FF',
        red: '#F93819',
        gray90: '#1A1A1A',
        gray80: '#333333',
        gray70: '#4D4D4D',
        gray60: '#666666',
        gray50: '#808080',
        gray40: '#999999',
        gray30: '#B3B3B3',
        gray20: '#CCCCCC',
        gray10: '#E6E6E6',
      },
      fontSize: {
        t24: '24px',
        t20: '20px',
        t18: '18px',
        t16: '16px',
        t14: '14px',
        t12: '12px',
      },
    },
  },
  plugins: [],
}

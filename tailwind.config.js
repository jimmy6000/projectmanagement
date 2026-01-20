/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#1a1614',
          elevated: '#221f1c',
          card: '#2d2823',
        },
        border: {
          DEFAULT: '#3d3731',
          focus: '#4d453d',
          accent: '#d97742',
        },
        text: {
          primary: '#f4f1ea',
          secondary: '#c4bcb0',
          tertiary: '#8a8274',
        },
        accent: {
          rust: '#d97742',
          olive: '#6b7456',
          terra: '#c77766',
          rust_dark: '#b85f2f',
        },
        red: {
          400: '#e07856',
          500: '#d4573a',
        },
      },
      borderRadius: {
        DEFAULT: '2px',
        md: '3px',
        lg: '4px',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          lightest: '#cce9e9',
          lighter: '#a0d4d5',
          light: '#7fc3c4',
          DEFAULT: '#4fa7a9',
          dark: '#357275',
          darker: '#214c4f',
          darkest: '#102728',
        },
        second: {
          lightest: '#f4edea',
          lighter: '#ecdfda',
          light: '#e7dbd5',
          DEFAULT: '#ddcec7',
          dark: '#b5a7a2',
          darker: '#8f827d',
          darkest: '#6b5f5c',
        },
        extra: {
          lightest: '#f2ddd1',
          lighter: '#e5b79d',
          light: '#dba47f',
          DEFAULT: '#d08b5b',
          dark: '#9c5f37',
          darker: '#7c4a29',
          darkest: '#5a3620',
        },
      },
    },
  },
  plugins: [],
};

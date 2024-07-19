/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'brand-color': '#25263E',
        'gray-block': '#ECEDF2',
        'secondary-text': '#5C5D7E',
      },
    },
  },
}

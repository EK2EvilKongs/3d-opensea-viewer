// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'outlaw-dark': '#0A0A1F', // Fondo muy oscuro
        'outlaw-gray': '#1F2937', // Fondo para secciones
        'outlaw-accent': '#6EE7B7', // Verde neón/menta para acento
        'outlaw-text': '#E5E7EB', // Texto principal claro
      },
      fontFamily: {
        sans: ['Pixelify Sans', 'sans-serif'], // Usar una fuente moderna como Inter
      },
    },
  },
  plugins: [],
};

export default config;
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/quizz_game/',  // Ajout du base pour GitHub Pages
  server: {
    host: true,
    port: 5174, // ou un autre port
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})

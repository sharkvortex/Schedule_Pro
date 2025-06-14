import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import compression from 'vite-plugin-compression'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: ['defaults', 'not IE 11'], 
    }),
    compression({ algorithm: 'gzip' }) 
  ],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'https://schedule-pro.onrender.com',
    },
  },
})

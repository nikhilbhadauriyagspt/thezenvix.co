import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import imageApiPlugin from './vite-image-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imageApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('swiper')) return 'vendor-swiper';
            if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) return 'vendor-router';
            return 'vendor-core'; // react, react-dom, etc.
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})

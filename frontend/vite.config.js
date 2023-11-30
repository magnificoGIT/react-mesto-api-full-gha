import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://mestomagnifico.nomoredomainsmonster.ru/',
  build: {
    sourcemap: true,
  },
  server: {
    port: 3001,
  }
});

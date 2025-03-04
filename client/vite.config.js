import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/styled", "@emotion/react"]
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy all requests from /api to the backend
    }
  }
});

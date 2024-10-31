// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contacts': {
        target: 'https://contacts-six-pi.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contacts/, '')
      },
      '/auth': { // Adding proxy for /auth route
        target: 'https://contacts-six-pi.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, 'auth')
      }
    }
  }
})


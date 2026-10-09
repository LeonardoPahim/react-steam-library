import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // '' = load all vars, not just VITE_

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/steam-api': {
          target: 'https://api.steampowered.com',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path.replace(/^\/steam-api/, ''), 'http://x')
            url.searchParams.set('key', env.STEAM_API_KEY) // key added here, server-side
            return url.pathname + url.search
          },
        },
      },
    },
  }
})
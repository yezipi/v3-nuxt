import { defineNuxtConfig } from 'nuxt3'

const BASE_URL = 'http://localhost:7002'
const SERVER_CONFIG = {
  host: '0.0.0.0',
  port: 4000,
  strictPort: true,
  proxy: {
    '^/api/.*': {
      target: BASE_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    },
    '^/public/.*': {
      target: `${BASE_URL}/public`,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/public/, '')
    },
  },
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  alias: {
    '/public/': BASE_URL + '/public/'
  },
  css: [
    '@/assets/fonts/iconfont.css',
    '@/assets/css/reset.css',
    '@/assets/css/main.less',
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  build: {
    extractCSS: true,
  },
  publicRuntimeConfig: {
    baseURL: BASE_URL,
  },
  vite: {
    server: SERVER_CONFIG,
    preview: SERVER_CONFIG,
  }
})

import { defineNuxtConfig } from 'nuxt3'
const baseURL = 'http://localhost:7001'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  alias: {
    '/public/': baseURL + '/public/'
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
    baseURL,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 1000,
      strictPort: false,
      proxy: {
        '^/api/.*': {
          target: baseURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '^/public/.*': {
          target: `${baseURL}/public`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/public/, '')
        },
      },
    },
  }
})

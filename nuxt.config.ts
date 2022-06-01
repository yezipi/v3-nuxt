import { defineNuxtConfig } from 'nuxt'

const BASE_URL = 'http://localhost:7001'
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
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: '/fonts/iconfont.css' },
    ],
  },
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/var.css',
    '@/assets/css/media.less',
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
    build: {
      target: 'es2015', // 兼容低版本浏览器
    },
    server: SERVER_CONFIG,
    preview: SERVER_CONFIG,
  }
})

import { defineNuxtConfig } from 'nuxt'

const BASE_URL = 'http://localhost:8001'
const SERVER_CONFIG = {
  host: '0.0.0.0',
  port: 4000,
  strictPort: true,
  proxy: {
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'stylesheet', href: '/fonts/iconfont.css' },
    ],
    script: [
      { id: 'LA_COLLECT', type: 'text/javascript', src: '//sdk.51.la/js-sdk-pro.min.js' },
      { id: 'BAIDU_ZHANZHANG', type: 'text/javascript', src: 'https://zz.bdstatic.com/linksubmit/push.js' }
    ]
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
    server: SERVER_CONFIG,
  },
  webpack: {
    extractCSS: true,
  }
})

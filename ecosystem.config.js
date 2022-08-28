module.exports = {
  apps: [
    {
      name: 'blog-nuxt',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
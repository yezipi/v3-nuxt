module.exports = {
  apps: [
    {
      name: 'yeizpiBlog',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
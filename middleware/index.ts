import type { Middleware } from '@nuxt/types'
export default <Middleware> function (ctx) {
  console.log('ctx', ctx)
}
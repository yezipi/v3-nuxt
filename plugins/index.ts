import message from './message'
import { db } from '../utils/index'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    // router.replace('/error/500')
  }
  return {
    provide: {
      message,
      db
    }
  }
})
import message from './message'
import lightbox from './lightbox'
import { db } from '../utils/index'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      message,
      lightbox,
      db
    }
  }
})
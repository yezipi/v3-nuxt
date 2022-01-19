// 封装请求，2022-1-15 yzp
import { UseFetchOptions} from 'nuxt3/dist/app/composables/fetch'
import { _AsyncData } from 'nuxt3/dist/app/composables/asyncData'

export interface ResponseConfig {
  code: number,
  status: number,
  data: any,
  msg: string
}
export interface ValueConfig {
  value: any,
  [x: string]: any,
}

const fetch = (url: string, config?: UseFetchOptions<any>): Promise<any> => {
  const { $config } = useNuxtApp()
  return new Promise((resolve, reject) => {
    useFetch($config.baseURL + url, { ...config }).then((res: any) => {
      const value = res.data.value
      if (!value.data) {
        reject(value)
      } else {
        resolve(Array.isArray(value.data) ? ref<Array<any>>(value.data) : ref<any>(value.data))
      }
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export default class Http {

  get(url: string, config?: UseFetchOptions<any>): Promise<any> {
    return fetch(url, { method: 'get', ...config })
  }

  post(url: string, config?: UseFetchOptions<any>): Promise<any> {
    return fetch(url, { method: 'post', ...config })
  }

  put(url: string, config?: UseFetchOptions<any>): Promise<any> {
    return fetch(url, { method: 'put', ...config })
  }

  delete(url: string, config?: UseFetchOptions<any>): Promise<any> {
    return fetch(url, { method: 'delete', ...config })
  }
}
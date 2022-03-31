// 封装请求，2022-1-15 yzp
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

const fetch = (url: string, options?: any): Promise<any> => {
  const { $config, $router } = useNuxtApp()
  const reqUrl = $config.baseURL + url

  if (options.method !== 'get') {
    return new Promise((resolve, reject) => {
      $fetch(reqUrl, { ...options }).then((res: ResponseConfig) => {
        if (res.status !== 200) {
          reject(res)
        }else {
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options }).then(({ data, error }: _AsyncData<any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      console.log(reqUrl, !!value)
      if (!value.data || value.code !== 1) {
        if (value.status !== 200) {
          if (options.method === 'get') {
            resolve(ref<any>(value.data))
            $router.replace('/error/' + value.status)
          } else {
            reject(value)
          }
        } else {
          resolve(ref<any>(value.data))
        }
      } else {
        resolve(Array.isArray(value.data) ? ref<Array<any>>(value.data) : ref<any>(value.data))
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}

export default class Http {

  get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body })
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
}
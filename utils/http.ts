// 封装请求，2022-1-15 yzp
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'

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
  const { $config } = useNuxtApp()
  const reqUrl = $config.baseURL + url
  const key = JSON.stringify(options) + '_' + url
  return new Promise((resolve, reject) => {
    console.log(options)
    useFetch(reqUrl, { ...options, key }).then(({ data, error }: _AsyncData<any, any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      const result = value && value.data
      if (!result || value.code !== 1) {
        reject(value)
      } else {
        resolve(options.method === 'post' ? value : result)
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}

export default class Http {

  get = (url: string, params?: any): Promise<any> => {
    return fetch(url, { method: 'get', params })
  }

  post = (url: string, body?: any): Promise<any> => {
    return fetch(url, { method: 'post', body })
  }

  put = (url: string, body?: any): Promise<any> => {
    return fetch(url, { method: 'put', body })
  }

  delete = (url: string, body?: any): Promise<any> => {
    return fetch(url, { method: 'delete', body })
  }
}
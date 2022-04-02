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
          resolve(ref<any>(res))
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
      const result = value && value.data
      if (!result || value.code !== 1) {
        if (value.status !== 200) {
          if (options.method === 'get') {
            resolve(ref<any>(result))
            $router.replace('/reject/' + value.status)
          } else {
            reject(ref<any>(result))
          }
        } else {
          resolve(ref<any>(result))
        }
      } else {
        resolve(ref<any>(result))
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}

export default new class Http {

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
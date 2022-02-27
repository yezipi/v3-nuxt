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

const fetch = (url: string, config?: any): Promise<any> => {
  const { $config, $router } = useNuxtApp()
  return new Promise((resolve, reject) => {
    useFetch($config.baseURL + url, { ...config }).then(({ data, error }: _AsyncData<any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      if (!value.data || value.code !== 1) {
        if (value.status !== 200) {
          console.log(value)
          $router.replace('/error/' + value.status)
        }
        resolve(ref({}))
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

  get(url: string, config?: any): Promise<any> {
    return fetch(url, { method: 'get', ...config })
  }

  post(url: string, config?: any): Promise<any> {
    return fetch(url, { method: 'post', ...config })
  }

  put(url: string, config?: any): Promise<any> {
    return fetch(url, { method: 'put', ...config })
  }

  delete(url: string, config?: any): Promise<any> {
    return fetch(url, { method: 'delete', ...config })
  }
}
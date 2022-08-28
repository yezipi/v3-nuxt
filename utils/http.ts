// 封装请求，2022-1-15 yzp
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { hash } from 'ohash'

const fetch = (url: string, options?: any): Promise<any> => {
  const { $config } = useNuxtApp()
  const reqUrl = $config.baseURL + url
  const key = hash(JSON.stringify(options) + '_' + url)
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, key }).then(({ data, error }: _AsyncData<any, any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      const result = value && value.data
      if (value.code !== 1) {
        throw createError({
          statusCode: 500,
          statusMessage: reqUrl,
          message: value.msg,
        })
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
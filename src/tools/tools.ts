import axios, { AxiosResponse } from 'axios'
interface result {
  status?: string
}
const baseURL = {
  prod: 'http://127.0.0.1:5000'
}
const instance = axios.create({
  baseURL: baseURL.prod,
  timeout: 30 * 1000,
  headers: {
    ['Content-type']: 'multipart/form-data'
  }
})

export function POST (url: string, params?: object | null, config?:any): Promise<AxiosResponse<result>> {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function GET (url: string): PromiseLike<AxiosResponse<result>> {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/zip'
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}

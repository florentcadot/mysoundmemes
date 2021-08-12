import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  // @ts-ignore
  type Vue = {
    $axios: AxiosInstance;
  }
}

export const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  // headers: {"Access-Control-Allow-Origin": "*"}
})


export default boot(({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
})

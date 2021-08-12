import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { BASE_URL } from 'src/config/env.config';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  // headers: {"Access-Control-Allow-Origin": "*"}
})


export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axiosInstance;
});

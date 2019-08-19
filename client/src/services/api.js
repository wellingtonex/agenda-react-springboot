import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(async config => {
  //console.log(config)
  const token = getToken();
  if (token && config.url !== '/oauth/token') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((res) => { return Promise.resolve(res); }, (error, x, p) => {
  // console.log('Error: ', error);
  // console.log('X: ', x);
  // console.log('P: ', p);
  if (error && error.response.status === 401) {
    console.log('redirecionando para login')
    window.location.href = '/login';
  }
  return Promise.reject(error);
})


export default api;
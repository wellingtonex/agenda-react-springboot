import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: 'http://ec2-54-90-119-170.compute-1.amazonaws.com:8080'
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token && config.url !== '/oauth/token') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((res) => { return Promise.resolve(res); }, (error, x, p) => {
  if (error && error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
})


export default api;
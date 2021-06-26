import axios from 'axios';
import {apiBaseUrl} from './config';
import {store} from './redux/store';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(config => {
  const token = store.getState().accessToken;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

axiosInstance.interceptors.response.use(response => {
  return response.data;
});

axiosInstance.defaults.headers.common['Authorization'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hZ2VzaHdhciIsImlhdCI6MTYyNDIxOTkwOCwiZXhwIjoxNjI0MjIxMTA4fQ.HDsoB1zp0C8hihxitn8hUkE03tU8b05BwQUhostVpvo';

axiosInstance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export {axiosInstance};

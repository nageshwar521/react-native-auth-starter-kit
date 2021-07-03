import axiosInstance from 'axios';
import {apiBaseUrl} from './config';
import {store} from './redux/store';

// const axiosInstance = axios.create({
//   baseURL: apiBaseUrl,
// });

// axiosInstance.defaults.baseURL = apiBaseUrl;

axiosInstance.interceptors.request.use(config => {
  console.log(config);
  const token = store.getState().accessToken;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

axiosInstance.interceptors.response.use(response => {
  return response.data;
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export {axiosInstance};

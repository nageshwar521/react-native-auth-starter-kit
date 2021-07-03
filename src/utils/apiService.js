import axios from 'axios';
import {apiBaseUrl} from '../config';
import {store} from '../redux/store';

axios.interceptors.request.use(config => {
  // console.log(config);
  const token = store.getState().accessToken;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

axios.interceptors.response.use(response => {
  console.log(response, 'response');
  return response.data;
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const loginService = data => {
  const options = {
    method: 'POST',
    url: apiBaseUrl + '/auth/login',
    headers: {'Content-Type': 'application/json'},
    data,
  };
  return axios.request(options);
};

export const logoutService = () => {
  const options = {
    method: 'POST',
    url: apiBaseUrl + '/auth/logout',
    headers: {'Content-Type': 'application/json'},
  };
  return axios.request(options);
};

export const registerService = data => {
  const options = {
    method: 'POST',
    url: apiBaseUrl + '/auth/register',
    headers: {'Content-Type': 'application/json'},
    data,
  };
  return axios.request(options);
};

export const getUsersService = () => {
  const options = {
    method: 'GET',
    url: apiBaseUrl + '/users',
    headers: {'Content-Type': 'application/json'},
  };
  return axios.request(options);
};

export const getUserService = userId => {
  const options = {
    method: 'GET',
    url: apiBaseUrl + '/users/' + userId,
    headers: {'Content-Type': 'application/json'},
  };
  return axios.request(options);
};

export const updateUserService = (userId, data) => {
  const options = {
    method: 'POST',
    url: apiBaseUrl + '/auth/register/' + userId,
    headers: {'Content-Type': 'application/json'},
    data,
  };
  return axios.request(options);
};

export const deleteUserService = userId => {
  const options = {
    method: 'DELETE',
    url: apiBaseUrl + '/users/' + userId,
    headers: {'Content-Type': 'application/json'},
  };
  return axios.request(options);
};

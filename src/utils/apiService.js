import {axiosInstance} from '../axiosInstance';

export const loginService = data => {
  return axiosInstance.post('/auth/login', data);
};

export const logoutService = data => {
  return axiosInstance.post('/auth/logout');
};

export const registerService = data => {
  return axiosInstance.post('/auth/register', data);
};

export const getUsersService = () => {
  return axiosInstance.get('/users');
};

export const getUserService = userId => {
  return axiosInstance.get(`/users/${userId}`);
};

export const updateUserService = (userId, data) => {
  return axiosInstance.post(`/users/${userId}`, data);
};

export const deleteUserService = userId => {
  return axiosInstance.delete(`/users/${userId}`);
};

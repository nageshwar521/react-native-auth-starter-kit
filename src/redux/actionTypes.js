import {AppNameSpace} from '../constants';

const asyncTypes = {
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  GET_TOKEN: 'GET_TOKEN',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
};
const staticTypes = {
  SHOW_MODAL: 'SHOW_MODAL',
  SHOW_TOASTER: 'SHOW_TOASTER',
};

export default {...asyncTypes, ...staticTypes};

import {AppNameSpace} from '../constants';

export const actionTypes = (ns => {
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
  return Object.keys(asyncTypes).reduce((result, key) => {
    return {...result, [key]: `${ns}_${key}`};
  }, staticTypes);
})(AppNameSpace);

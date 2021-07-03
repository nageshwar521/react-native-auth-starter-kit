import {
  loginService,
  logoutService,
  registerService,
} from '../../utils/apiService';
import {
  getAction,
  getErrorPayload,
  getSuccessPayload,
} from '../../utils/common';
import actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userRegister = registerData => {
  const baseAction = actionTypes.USER_REGISTER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await registerService(registerData);

      dispatch({
        type: getAction(baseAction, 'SUCCESS'),
        payload: getSuccessPayload({message, data}),
      });
    } catch (error) {
      dispatch({
        type: getAction(baseAction, 'ERROR'),
        payload: getErrorPayload({error}),
      });
    }
  };
};

export const userLogin = loginData => {
  const baseAction = actionTypes.USER_LOGIN;
  return async (dispatch, getState) => {
    console.log(getAction(baseAction, 'REQUEST'));
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await loginService(loginData);
      console.log(message, 'message');
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

      dispatch({
        type: getAction(baseAction, 'SUCCESS'),
        payload: getSuccessPayload({message, data}),
      });
    } catch (error) {
      console.log(error, 'error');
      dispatch({
        type: getAction(baseAction, 'ERROR'),
        payload: getErrorPayload({error}),
      });
    }
  };
};

export const userLogout = () => {
  const baseAction = actionTypes.USER_LOGOUT;
  return async (dispatch, getState) => {
    console.log('userLogout');
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await logoutService(data);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      dispatch({
        type: getAction(baseAction, 'SUCCESS'),
        payload: getSuccessPayload({message, data}),
      });
    } catch (error) {
      dispatch({
        type: getAction(baseAction, 'ERROR'),
        payload: getErrorPayload({error}),
      });
    }
  };
};

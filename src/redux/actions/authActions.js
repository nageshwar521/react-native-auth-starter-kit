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
import {actionTypes} from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userRegister = data => {
  const baseAction = actionTypes.REGISTER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await registerService(data);

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

export const userLogin = data => {
  const baseAction = actionTypes.LOGIN;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await loginService(data);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

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

export const userLogout = () => {
  const baseAction = actionTypes.LOGOUT;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await logoutService(data);
      await storage.remove('accessToken');
      await storage.remove('refreshToken');

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

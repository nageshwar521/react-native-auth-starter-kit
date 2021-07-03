import {getAction} from '../../utils/common';
import actionTypes from '../actionTypes';
import {defaultAuthState} from '../initialState';

export const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case getAction(actionTypes.REGISTER, 'REQUEST'):
      state = {
        ...state,
        registerResponse: null,
        registerError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.REGISTER, 'SUCCESS'):
      state = {
        ...state,
        registerResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.REGISTER, 'ERROR'):
      state = {
        ...state,
        registerError: action.payload.error,
        status: 'error',
      };
      break;

    case getAction(actionTypes.LOGIN, 'REQUEST'):
      state = {
        ...state,
        loginResponse: null,
        loginError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.LOGIN, 'SUCCESS'):
      state = {
        ...state,
        loginResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.LOGIN, 'ERROR'):
      state = {
        ...state,
        loginError: action.payload.error,
        status: 'error',
      };
      break;

    default:
      break;
  }
  return state;
};

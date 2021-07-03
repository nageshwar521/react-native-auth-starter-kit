import {getAction} from '../../utils/common';
import actionTypes from '../actionTypes';
import {defaultUserState} from '../initialState';

export const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case getAction(actionTypes.FETCH_USERS, 'REQUEST'):
      state = {
        ...state,
        users: [],
        getUsersResponse: null,
        getUsersError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.FETCH_USERS, 'SUCCESS'):
      state = {
        ...state,
        getUsersResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.FETCH_USERS, 'ERROR'):
      state = {
        ...state,
        getUsersError: action.payload.error,
        status: 'error',
      };
      break;

    case getAction(actionTypes.FETCH_USER, 'REQUEST'):
      state = {
        ...state,
        getUserResponse: null,
        getUserError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.FETCH_USER, 'SUCCESS'):
      state = {
        ...state,
        getUserResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.FETCH_USER, 'ERROR'):
      state = {
        ...state,
        getUserError: action.payload.error,
        status: 'error',
      };
      break;

    case getAction(actionTypes.UPDATE_USER, 'REQUEST'):
      state = {
        ...state,
        updateUserResponse: null,
        updateUserError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.UPDATE_USER, 'SUCCESS'):
      state = {
        ...state,
        updateUserResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.UPDATE_USER, 'ERROR'):
      state = {
        ...state,
        updateUserError: action.payload.error,
        status: 'error',
      };
      break;

    case getAction(actionTypes.DELETE_USER, 'REQUEST'):
      state = {
        ...state,
        deleteUserResponse: null,
        deleteUserError: null,
        status: 'loading',
      };
      break;
    case getAction(actionTypes.DELETE_USER, 'SUCCESS'):
      state = {
        ...state,
        deleteUserResponse: action.payload.data,
        status: 'success',
      };
      break;
    case getAction(actionTypes.DELETE_USER, 'ERROR'):
      state = {
        ...state,
        deleteUserError: action.payload.error,
        status: 'error',
      };
      break;

    default:
      break;
  }
  return state;
};

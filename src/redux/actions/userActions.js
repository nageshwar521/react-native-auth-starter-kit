import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from '../../utils/apiService';
import {getAction} from '../../utils/common';
import {actionTypes} from '../actionTypes';

export const fetchUsers = () => {
  const baseAction = actionTypes.FETCH_USERS;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await getUsersService();
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

export const fetchUser = userId => {
  const baseAction = actionTypes.FETCH_USER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await getUserService(userId);
      dispatch({
        type: getAction(baseAction, 'SUCCESS'),
        payload: getSuccessPayload({message, data}),
      });
    } catch (error) {
      dispatch({
        type: getAction(actionTypes.USERS, 'ERROR'),
        payload: getErrorPayload({error}),
      });
    }
  };
};

export const fetchUser = userId => {
  const baseAction = actionTypes.FETCH_USER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await getUserService(userId);
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

export const updateUser = (userId, data) => {
  const baseAction = actionTypes.UPDATE_USER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await updateUserService(userId, data);
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

export const deleteUser = userId => {
  const baseAction = actionTypes.DELETE_USER;
  return async (dispatch, getState) => {
    dispatch(getAction(baseAction, 'REQUEST'));
    try {
      const {success, message, data} = await deleteUserService(userId);
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

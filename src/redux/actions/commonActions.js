import {loginService, registerService} from '../../utils/apiService';
import {getErrorPayload, getSuccessPayload} from '../../utils/common';
import {actionTypes} from '../actionTypes';

export const toggleModal = (options = {}) => {
  const baseAction = actionTypes.SHOW_MODAL;
  return async (dispatch, getState) => {
    dispatch({
      type: baseAction,
      payload: options,
    });
  };
};

export const toggleToster = (options = {}) => {
  const baseAction = actionTypes.SHOW_TOASTER;
  return async (dispatch, getState) => {
    dispatch({
      type: baseAction,
      payload: options,
    });
  };
};

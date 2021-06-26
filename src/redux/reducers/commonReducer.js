import {actionTypes} from '../actionTypes';
import {defaultCommonState} from '../initialState';

export const commonReducer = (state = defaultCommonState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      state = {
        ...state,
        isModalOpen: !state.isModalOpen,
        modalOptions: action.payload,
      };
      break;
    case actionTypes.SHOW_TOASTER:
      state = {
        ...state,
        isToasterOpen: !state.isToasterOpen,
        toasterOptions: action.payload,
      };
      break;

    default:
      break;
  }
  return state;
};

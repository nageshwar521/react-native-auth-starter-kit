export const defaultCommonState = {
  isModalOpen: false,
  isToasterOpen: false,
  modalOptions: {},
  toasterOptions: {},
};
export const defaultAuthState = {
  status: 'initial',
  loginResponse: null,
  loginError: null,
  registerResponse: null,
  registerError: null,
};
export const defaultUserState = {
  status: 'initial',
  users: [],
  getUsersResponse: null,
  getUsersError: null,
  currentUserDetails: null,
  getUserResponse: null,
  getUserError: null,
  updateUserResponse: null,
  updateUserError: null,
  deleteUserResponse: null,
  deleteUserError: null,
};

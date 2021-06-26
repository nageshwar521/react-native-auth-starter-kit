const messages = {
  loginTitle: 'Login',
  registerTitle: 'Register',
  forgotPassword: 'Forgot Password',
  username: 'Username',
  password: 'Password',
  confirmPassord: 'Confirm Password',
  email: 'Email',
  loginButton: 'Login',
  registerButton: 'Register',
  firstName: 'First Name',
  middleName: 'Middle Name',
  lastName: 'Last Name',
  contactNo: 'Phone Number',
  address: 'Address',
  state: 'State',
  city: 'City',
  country: 'Country',
  pinCode: 'Pin Code',
  enter: 'Enter',
  type: 'Type',
  submitButton: 'Submit',
};

const getI18nMessage = msgKey => {
  return messages[msgKey] || '';
};

export {getI18nMessage};

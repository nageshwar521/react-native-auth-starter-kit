import {Alert} from 'react-native';

const validateForm = (data) => {
  let isValid = true;
  let message = '';
  Object.keys(data).forEach((field) => {
    if (!data[field]) {
      isValid = false;
      message = `${field} is required!`;
      return false;
    }
  });

  return {isValid, message};
};

const showAlert = (title, message = '') => {
  Alert.alert(title, message, [{text: message}]);
};

export {validateForm, showAlert};

import {Dimensions} from 'react-native';
import {darkTheme} from '../themes/theme-dark';
import {lightTheme} from '../themes/theme-light';

const heightY = Dimensions.get('window').height;

export const getFontSize = (totalSize = heightY) => {
  return totalSize * 0.014;
};

export const getSuccessPayload = ({message = 'Success', data = null}) => {
  return {message, data};
};

export const getErrorPayload = ({message = 'Error', error = null}) => {
  return {message, error};
};

export const getAction = (name, ext) => {
  return `${name}_${ext}`;
};

export const hexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const getTheme = (theme = 'light') => {
  return theme === 'light' ? lightTheme : darkTheme;
};

export const getShadow = (options = {}) => {
  const {color = '#000', size = 5, width = 0, height = 3} = options;
  return {
    shadowColor: color,
    shadowOffset: {
      width,
      height,
    },
    shadowOpacity: 0.27,
    shadowRadius: size,

    elevation: size,
  };
};

export const getFontConfig = () => {
  return {
    ios: {
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Montserrat-Thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Montserrat-Thin',
        fontWeight: 'normal',
      },
    },
  };
};

export const generateId = (len = 6) => {
  return Math.random() * Math.pow(10, len);
};

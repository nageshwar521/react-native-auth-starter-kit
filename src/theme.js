import {DefaultTheme} from 'react-native-paper';

const defaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#E0E0E0',
    accent: '#f1c40f',
    textDark: '#000',
    textLight: '#FFF',
  },
};

export {defaultTheme};

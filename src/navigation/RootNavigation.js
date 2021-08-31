import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useStorage from '../hooks/useStorage';
import {configureFonts, Provider as PaperProvider} from 'react-native-paper';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {Box, Text} from 'react-native-design-utility';
import {useSelector} from 'react-redux';
import {getFontConfig, getTheme} from '@src/utils/common';
import Toast from 'react-native-easy-toast';
import {toasterRef} from '@src/utils/toaster';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootNavigation = memo(() => {
  const currentTheme = useSelector(state =>
    getTheme(state.common.currentTheme),
  );
  const {getToken, isLoading, response, error} = useStorage();

  React.useEffect(() => {
    getToken('accessToken');
  }, []);

  const theme = {
    ...currentTheme,
    fonts: configureFonts(getFontConfig()),
  };

  if (isLoading) {
    return (
      <Box align="center" justify="center" f={1}>
        <Text>Loading...</Text>
      </Box>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* {false ? <AppStack /> : <AuthStack />} */}
        {/* <AppStack /> */}
        {/* <IntroSlider /> */}

        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={toast => (toasterRef.current = toast)} />
    </PaperProvider>
  );
});

export default RootNavigation;

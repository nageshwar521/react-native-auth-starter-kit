import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useStorage, {storage} from '../hooks/useStorage';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {Box, Text} from 'react-native-design-utility';

const RootNavigation = memo(() => {
  console.log('RootNavigation');
  const {get, isLoading, response, error} = useStorage();

  React.useEffect(() => {
    get('accessToken');
  }, []);

  if (isLoading) {
    return (
      <Box align="center" justify="center" f={1}>
        <Text>Loading...</Text>
      </Box>
    );
  }
  return (
    <NavigationContainer>
      {response ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
});

export default RootNavigation;

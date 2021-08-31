import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RootNavigation from './navigation/RootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

console.disableYellowBox = true;

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </SafeAreaProvider>
  );
}

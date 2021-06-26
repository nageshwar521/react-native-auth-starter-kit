import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-easy-toast';
import theme from './theme';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RootNavigation from './navigation/RootNavigation';
import {toasterRef} from './utils/toaster';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootNavigation />
        <Toast ref={toast => (toasterRef.current = toast)} />
      </PaperProvider>
    </Provider>
  );
}

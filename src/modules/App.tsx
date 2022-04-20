import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationService from '../shared/helpers/navigationService';
import RootNavigator from './navigations/RootNavigator';
import { persistor, store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={(ref: NavigationContainerRef<any>) =>
          NavigationService.setTopLevelNavigator(ref)}>
          <View style={{ flex: 1 }}>
            <RootNavigator />
            {/* <MessageAlert /> */}
            {/* <Toast position={'bottom'} config={toastConfig} /> */}
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
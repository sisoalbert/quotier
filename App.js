import React, {useEffect} from 'react';
import RootNavigator from './navigation/RootNavigator';

import SplashScreen from 'react-native-splash-screen';

//Redux
import {Provider} from 'react-redux';
import {store, appPersist} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={appPersist}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;

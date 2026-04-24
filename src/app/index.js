import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store';
import RootNavigator from './RootNavigator';


const LoadingView = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#0A66C2" />
  </View>
);

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
// @flow

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, InteractionManager } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { pollOperations } from '@/utils/operations';
import AppRoutes from './routes';
import { store, persistor } from './store';
import { navigationRef, dispatch } from './NavigationService';
import InitialLoading from './components/Helpers/InitialLoadingScreen';
import { NotificationBanner } from './components/Helpers/NotificationBanner';

/**
 * Central part of the application
 * react-navigation is used for routing
 * read docs here: https://reactnavigation.org/
 */

// NOTE: BOOTSTRAP happens inside of LoadingScreen

export const App = () => {
  // setup deep linking

  const linking = {
    prefixes: ['brightid://', 'https://app.brightid.org'],
    config: {
      screens: {
        App: {
          screens: {
            Apps: {
              path: 'link-verification/:baseUrl/:context/:contextId',
              exact: true,
            },
            ScanCode: {
              path: 'connection-code/:qrcode',
              exact: true,
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    // subscribe to operations
    const timerId = setInterval(() => {
      InteractionManager.runAfterInteractions(() => {
        pollOperations();
      });
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<InitialLoading app={true} />}
        persistor={persistor}
      >
        <ActionSheetProvider>
          <SafeAreaProvider>
            <NotificationBanner />
            <NavigationContainer
              linking={linking}
              style={styles.container}
              ref={navigationRef}
              fallback={<InitialLoading />}
            >
              <AppRoutes />
            </NavigationContainer>
          </SafeAreaProvider>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default App;

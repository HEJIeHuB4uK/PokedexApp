import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {queryClient} from './queryClient';
import {AppNavigator} from './AppNavigator';
import {useFavoritesStore} from '../store/favoritesStore';

enableScreens();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export function RootProviders(): React.JSX.Element {
  const loadFavorites = useFavoritesStore(state => state.load);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister}}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

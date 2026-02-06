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
import {useSearchHistoryStore} from '../store/searchHistoryStore';
import {useViewHistoryStore} from '../store/viewHistoryStore';

enableScreens();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export function RootProviders(): React.JSX.Element {
  const loadFavorites = useFavoritesStore(state => state.load);
  const loadSearchHistory = useSearchHistoryStore(state => state.load);
  const loadViewHistory = useViewHistoryStore(state => state.load);

  useEffect(() => {
    loadFavorites();
    loadSearchHistory();
    loadViewHistory();
  }, [loadFavorites, loadSearchHistory, loadViewHistory]);

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

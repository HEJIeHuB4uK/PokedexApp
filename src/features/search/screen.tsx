import React, {useCallback, useLayoutEffect} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, TabParamList} from '../../app/AppNavigator';
import {SearchLayout} from './Layout';
import {useSearchController} from './useFeatureController';

type SearchNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Search'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function SearchScreen(): React.JSX.Element {
  const navigation = useNavigation<SearchNavigation>();
  const {
    items,
    query,
    isOffline,
    recentSearches,
    recentViews,
    types,
    selectedType,
    onChangeQuery,
    onSelectType,
    isLoading,
    isError,
  } = useSearchController();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Busqueda',
    });
  }, [navigation]);

  const onSelectPokemon = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', {name});
    },
    [navigation],
  );

  const onSelectRecent = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', {name});
    },
    [navigation],
  );

  return (
    <SearchLayout
      items={items}
      query={query}
      isOffline={isOffline}
      recentSearches={recentSearches}
      recentViews={recentViews}
      types={types}
      selectedType={selectedType}
      onChangeQuery={onChangeQuery}
      onSelectType={onSelectType}
      onSelectRecent={onSelectRecent}
      onSelectPokemon={onSelectPokemon}
      isLoading={isLoading}
      isError={isError}
    />
  );
}

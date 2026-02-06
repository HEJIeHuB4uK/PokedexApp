import React, {useCallback} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, TabParamList} from '../../app/AppNavigator';
import {PokemonListLayout} from './Layout';
import {usePokemonListController} from './useFeatureController';

type HomeNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function PokemonListScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavigation>();
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
    onEndReached,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
  } = usePokemonListController();

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
    <PokemonListLayout
      items={items}
      query={query}
      isOffline={isOffline}
      recentSearches={recentSearches}
      recentViews={recentViews}
      types={types}
      selectedType={selectedType}
      showHistory={false}
      showFilters={false}
      showSearch={false}
      onChangeQuery={onChangeQuery}
      onSelectType={onSelectType}
      onSelectRecent={onSelectRecent}
      onSelectPokemon={onSelectPokemon}
      onEndReached={onEndReached}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
}

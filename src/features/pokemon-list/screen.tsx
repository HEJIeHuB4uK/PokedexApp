import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/AppNavigator';
import {PokemonListLayout} from './Layout';
import {usePokemonListController} from './useFeatureController';

export function PokemonListScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonList'>>();
  const {
    items,
    query,
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

  const onSelectPokemon = (name: string) => {
    navigation.navigate('PokemonDetail', {name});
  };

  return (
    <PokemonListLayout
      items={items}
      query={query}
      types={types}
      selectedType={selectedType}
      onChangeQuery={onChangeQuery}
      onSelectType={onSelectType}
      onSelectPokemon={onSelectPokemon}
      onEndReached={onEndReached}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
}

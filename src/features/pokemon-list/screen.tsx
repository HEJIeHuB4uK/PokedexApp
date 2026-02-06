import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/AppNavigator';
import {PokemonListLayout} from './Layout';
import {usePokemonListController} from './useFeatureController';
import {colors} from '../../constants/colors';

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Favorites')}>
          <Text style={{color: colors.accent, fontWeight: '700'}}>
            Favoritos
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

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

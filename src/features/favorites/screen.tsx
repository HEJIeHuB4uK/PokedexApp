import React from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, TabParamList} from '../../app/AppNavigator';
import {FavoritesLayout} from './Layout';
import {useFavoritesController} from './useFeatureController';

type FavoritesNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Favorites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function FavoritesScreen(): React.JSX.Element {
  const navigation = useNavigation<FavoritesNavigation>();
  const {items} = useFavoritesController();

  const onSelectPokemon = (name: string) => {
    navigation.navigate('PokemonDetail', {name});
  };

  return <FavoritesLayout items={items} onSelectPokemon={onSelectPokemon} />;
}

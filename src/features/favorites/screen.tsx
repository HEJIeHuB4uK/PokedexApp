import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/AppNavigator';
import {FavoritesLayout} from './Layout';
import {useFavoritesController} from './useFeatureController';

export function FavoritesScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Favorites'>>();
  const {items} = useFavoritesController();

  const onSelectPokemon = (name: string) => {
    navigation.navigate('PokemonDetail', {name});
  };

  return <FavoritesLayout items={items} onSelectPokemon={onSelectPokemon} />;
}

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PokemonListScreen} from '../features/pokemon-list';
import {PokemonDetailScreen} from '../features/pokemon-detail';
import {FavoritesScreen} from '../features/favorites';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: {name: string};
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{title: 'Pokedex'}}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{title: 'Detalle'}}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Favoritos'}}
      />
    </Stack.Navigator>
  );
}

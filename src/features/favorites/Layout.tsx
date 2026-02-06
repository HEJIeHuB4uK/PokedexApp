import React from 'react';
import {FlatList, Pressable, Text, useWindowDimensions, View} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {breakpoints, grid} from '../../constants/dimensions';
import {styles} from './styles';

export type FavoritesLayoutItem = {
  name: string;
  imageUrl?: string | null;
};

type FavoritesLayoutProps = {
  items: FavoritesLayoutItem[];
  onSelectPokemon: (name: string) => void;
};

export function FavoritesLayout({
  items,
  onSelectPokemon,
}: FavoritesLayoutProps): React.JSX.Element {
  const {width} = useWindowDimensions();
  const columns =
    width >= breakpoints.desktop
      ? grid.columnsDesktop
      : width >= breakpoints.tablet
      ? grid.columnsTablet
      : grid.columnsMobile;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        key={`favorites-grid-${columns}`}
        data={items}
        keyExtractor={item => item.name}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectPokemon(item.name)}>
            <PokemonCard name={item.name} imageUrl={item.imageUrl} />
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.helper}>Sin favoritos.</Text>}
      />
    </View>
  );
}

import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {styles} from './styles';

export type FavoritesLayoutItem = {
  name: string;
  imageUrl?: string | null;
};

type FavoritesLayoutProps = {
  items: FavoritesLayoutItem[];
};

export function FavoritesLayout({
  items,
}: FavoritesLayoutProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View style={styles.card}>
            <PokemonCard name={item.name} imageUrl={item.imageUrl} />
          </View>
        )}
        ListEmptyComponent={<Text>Sin favoritos.</Text>}
      />
    </View>
  );
}

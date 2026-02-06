import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
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

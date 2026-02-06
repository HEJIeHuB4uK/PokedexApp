import React from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {styles} from './styles';

export type PokemonListItem = {
  name: string;
  imageUrl?: string | null;
};

type PokemonListLayoutProps = {
  items: PokemonListItem[];
  query: string;
  onChangeQuery: (value: string) => void;
  onEndReached: () => void;
  isLoading: boolean;
};

export function PokemonListLayout({
  items,
  query,
  onChangeQuery,
  onEndReached,
  isLoading,
}: PokemonListLayoutProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nombre"
        value={query}
        onChangeText={onChangeQuery}
      />
      <FlatList
        data={items}
        keyExtractor={item => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
        ListEmptyComponent={
          isLoading ? <Text>Cargando...</Text> : <Text>Sin resultados.</Text>
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <PokemonCard name={item.name} imageUrl={item.imageUrl} />
          </View>
        )}
      />
    </View>
  );
}

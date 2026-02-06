import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {breakpoints, grid} from '../../constants/dimensions';
import {styles} from './styles';

export type PokemonListItem = {
  name: string;
  imageUrl?: string | null;
};

type PokemonListLayoutProps = {
  items: PokemonListItem[];
  query: string;
  isOffline: boolean;
  types: string[];
  selectedType: string;
  onChangeQuery: (value: string) => void;
  onSelectType: (value: string) => void;
  onSelectPokemon: (name: string) => void;
  onEndReached: () => void;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

export function PokemonListLayout({
  items,
  query,
  isOffline,
  types,
  selectedType,
  onChangeQuery,
  onSelectType,
  onSelectPokemon,
  onEndReached,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
}: PokemonListLayoutProps): React.JSX.Element {
  const {width} = useWindowDimensions();
  const columns =
    width >= breakpoints.desktop
      ? grid.columnsDesktop
      : width >= breakpoints.tablet
      ? grid.columnsTablet
      : grid.columnsMobile;
  const showEmpty = !isLoading && items.length === 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nombre"
        value={query}
        onChangeText={onChangeQuery}
      />
      {isOffline ? (
        <Text style={styles.offlineBanner}>Sin conexion. Mostrando cache.</Text>
      ) : null}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          {types.map((type, index) => {
            const isActive = type === selectedType;
            return (
              <Pressable
                key={type}
                onPress={() => onSelectType(type)}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                  index < types.length - 1 && styles.filterChipSpacing,
                ]}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}>
                  {type === 'all' ? 'Todos' : type}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        key={`grid-${columns}`}
        data={items}
        keyExtractor={item => item.name}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="small" />
          ) : isError ? (
            <Text style={styles.helper}>Ocurrio un error.</Text>
          ) : showEmpty ? (
            <Text style={styles.helper}>Sin resultados.</Text>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage && hasNextPage ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectPokemon(item.name)}>
            <PokemonCard name={item.name} imageUrl={item.imageUrl} />
          </Pressable>
        )}
      />
    </View>
  );
}

import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {breakpoints, grid} from '../../constants/dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';

export type PokemonListItem = {
  name: string;
  imageUrl?: string | null;
};

type PokemonListLayoutProps = {
  items: PokemonListItem[];
  query: string;
  isOffline: boolean;
  recentSearches?: string[];
  recentViews?: string[];
  types: string[];
  selectedType: string;
  title?: string;
  showHistory?: boolean;
  showFilters?: boolean;
  showSearch?: boolean;
  showSearchIcon?: boolean;
  autoFocusSearch?: boolean;
  onChangeQuery: (value: string) => void;
  onSelectType: (value: string) => void;
  onSelectRecent: (name: string) => void;
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
  recentSearches = [],
  recentViews = [],
  types,
  selectedType,
  showHistory = true,
  showFilters = true,
  showSearch = true,
  showSearchIcon = false,
  title = 'Pokedex',
  autoFocusSearch = false,
  onChangeQuery,
  onSelectType,
  onSelectRecent,
  onSelectPokemon,
  onEndReached,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
}: PokemonListLayoutProps): React.JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();
  const columns =
    width >= breakpoints.desktop
      ? grid.columnsDesktop
      : width >= breakpoints.tablet
      ? grid.columnsTablet
      : grid.columnsMobile;
  const ITEM_HEIGHT = 140;
  const showEmpty = !isLoading && items.length === 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSearch ? (
        <View style={styles.searchRow}>
          {showSearchIcon ? (
            <MaterialIcons
              name="search"
              size={18}
              color={styles.searchIcon.color}
              style={styles.searchIcon}
            />
          ) : null}
          <TextInput
            style={[styles.search, showSearchIcon && styles.searchWithIcon]}
            placeholder="Buscar por nombre"
            value={query}
            onChangeText={onChangeQuery}
            autoFocus={autoFocusSearch}
          />
        </View>
      ) : null}
      {isOffline ? (
        <Text style={styles.offlineBanner}>Sin conexion. Mostrando cache.</Text>
      ) : null}
      {showHistory && recentSearches.length > 0 ? (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Busquedas recientes</Text>
          <View style={styles.historyRow}>
            {recentSearches.map(item => (
              <Pressable
                key={`search-${item}`}
                style={styles.historyChip}
                onPress={() => onSelectRecent(item)}>
                <Text style={styles.historyChipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}
      {showHistory && recentViews.length > 0 ? (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Vistos recientemente</Text>
          <View style={styles.historyRow}>
            {recentViews.map(item => (
              <Pressable
                key={`view-${item}`}
                style={styles.historyChip}
                onPress={() => onSelectRecent(item)}>
                <Text style={styles.historyChipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}
      {showFilters ? (
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
      ) : null}
      <Animated.FlatList
        key={`grid-${columns}`}
        data={items}
        keyExtractor={item => item.name}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
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
        renderItem={({item, index}) => {
          const rowIndex = Math.floor(index / columns);
          const rowOffset = rowIndex * ITEM_HEIGHT;
          const opacity = scrollY.interpolate({
            inputRange: [
              rowOffset - height,
              rowOffset - height * 0.6,
              rowOffset,
            ],
            outputRange: [0.15, 0.9, 1],
            extrapolate: 'clamp',
          });
          const translateY = scrollY.interpolate({
            inputRange: [
              rowOffset - height,
              rowOffset - height * 0.6,
              rowOffset,
            ],
            outputRange: [10, 0, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[styles.card, {opacity, transform: [{translateY}]}]}>
              <Pressable onPress={() => onSelectPokemon(item.name)}>
                <PokemonCard name={item.name} imageUrl={item.imageUrl} />
              </Pressable>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

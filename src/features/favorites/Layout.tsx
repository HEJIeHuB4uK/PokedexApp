import React, {useRef} from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {EmptyState} from '../../components/EmptyState';
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
  const scrollY = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();
  const columns =
    width >= breakpoints.desktop
      ? grid.columnsDesktop
      : width >= breakpoints.tablet
      ? grid.columnsTablet
      : grid.columnsMobile;
  const ITEM_HEIGHT = 140;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Animated.FlatList
        key={`favorites-grid-${columns}`}
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
              <Pressable
                onPress={() => onSelectPokemon(item.name)}
                style={({pressed}) => [
                  styles.cardPressable,
                  pressed && styles.cardPressablePressed,
                ]}
                android_ripple={{color: styles.helper.color}}>
                <PokemonCard name={item.name} imageUrl={item.imageUrl} />
              </Pressable>
            </Animated.View>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Sin favoritos"
            subtitle="Agrega Pokemon desde Home o Busqueda."
          />
        }
      />
    </View>
  );
}

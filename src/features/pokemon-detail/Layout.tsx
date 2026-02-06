import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/colors';
import {styles} from './styles';

export type PokemonDetailLayoutProps = {
  name: string;
  imageUrl?: string | null;
  types: {name: string}[];
  stats: {name: string; value: number}[];
  abilities: {name: string}[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isLoading: boolean;
  isError: boolean;
  isOffline: boolean;
};

export function PokemonDetailLayout({
  name,
  imageUrl,
  types,
  stats,
  abilities,
  isFavorite,
  onToggleFavorite,
  isLoading,
  isError,
  isOffline,
}: PokemonDetailLayoutProps): React.JSX.Element {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.helper}>Ocurrio un error.</Text>
      </View>
    );
  }

  if (!name) {
    return (
      <View style={styles.container}>
        <Text style={styles.helper}>Sin informacion.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUrl ? (
        <FastImage style={styles.image} source={{uri: imageUrl}} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <Text style={styles.title}>{name}</Text>
      {isOffline ? (
        <Text style={styles.offlineBanner}>Sin conexion. Mostrando cache.</Text>
      ) : null}
      <Pressable
        onPress={onToggleFavorite}
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}>
        <Text
          style={[
            styles.favoriteButtonText,
            isFavorite && styles.favoriteButtonTextActive,
          ]}>
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </Text>
      </Pressable>
      <View style={styles.typesRow}>
        {types.map(type => (
          <View
            key={type.name}
            style={[
              styles.typeChip,
              {
                backgroundColor:
                  colors.type[type.name as keyof typeof colors.type] ??
                  colors.border,
              },
            ]}>
            <Text style={styles.typeChipText}>{type.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadisticas</Text>
        {stats.map(stat => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name}</Text>
            <View style={styles.statBarTrack}>
              <View
                style={[
                  styles.statBarFill,
                  {width: `${Math.min(stat.value, 100)}%`},
                ]}
              />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesRow}>
          {abilities.map(ability => (
            <View key={ability.name} style={styles.abilityChip}>
              <Text style={styles.abilityChipText}>{ability.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

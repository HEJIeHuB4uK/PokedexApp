import React from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
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
  hasData: boolean;
  abilityDetail: {name: string; effect: string; shortEffect: string} | null;
  abilityLoading: boolean;
  abilityError: boolean;
  selectedAbility: string | null;
  onAbilityPress: (name: string) => void;
  onCloseAbility: () => void;
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
  hasData,
  abilityDetail,
  abilityLoading,
  abilityError,
  selectedAbility,
  onAbilityPress,
  onCloseAbility,
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

  if (!hasData) {
    return (
      <View style={styles.container}>
        <Text style={styles.helper}>
          {isOffline
            ? 'Sin informacion disponible sin conexion.'
            : 'Sin informacion disponible.'}
        </Text>
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
        style={[
          styles.favoriteButton,
          isFavorite && styles.favoriteButtonActive,
        ]}>
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
            <Pressable
              key={ability.name}
              style={styles.abilityChip}
              onPress={() => onAbilityPress(ability.name)}>
              <Text style={styles.abilityChipText}>{ability.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Modal
        visible={Boolean(selectedAbility)}
        transparent
        animationType="fade"
        onRequestClose={onCloseAbility}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selectedAbility ?? 'Habilidad'}
            </Text>
            {abilityLoading ? (
              <Text style={styles.modalText}>Cargando...</Text>
            ) : abilityError ? (
              <Text style={styles.modalText}>Ocurrio un error.</Text>
            ) : abilityDetail ? (
              <>
                <Text style={styles.modalText}>{abilityDetail.effect}</Text>
                {abilityDetail.shortEffect ? (
                  <Text style={styles.modalTextMuted}>
                    {abilityDetail.shortEffect}
                  </Text>
                ) : null}
              </>
            ) : (
              <Text style={styles.modalText}>Sin informacion.</Text>
            )}
            <Pressable style={styles.modalButton} onPress={onCloseAbility}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

export type PokemonDetailLayoutProps = {
  name: string;
  imageUrl?: string | null;
  isLoading: boolean;
};

export function PokemonDetailLayout({
  name,
  imageUrl,
  isLoading,
}: PokemonDetailLayoutProps): React.JSX.Element {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
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
    </ScrollView>
  );
}

import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

type PokemonCardProps = {
  name: string;
  imageUrl?: string | null;
};

export function PokemonCard({
  name,
  imageUrl,
}: PokemonCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      {imageUrl ? (
        <FastImage style={styles.image} source={{uri: imageUrl}} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

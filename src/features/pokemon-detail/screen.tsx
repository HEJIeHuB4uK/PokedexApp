import React from 'react';
import {useRoute} from '@react-navigation/native';
import {PokemonDetailLayout} from './Layout';
import {usePokemonDetailController} from './useFeatureController';

type RouteParams = {name: string};

export function PokemonDetailScreen(): React.JSX.Element {
  const route = useRoute();
  const {name} = route.params as RouteParams;
  const {imageUrl, isLoading} = usePokemonDetailController(name);

  return (
    <PokemonDetailLayout
      name={name}
      imageUrl={imageUrl}
      isLoading={isLoading}
    />
  );
}

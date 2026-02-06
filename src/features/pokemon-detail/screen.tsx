import React from 'react';
import {useRoute} from '@react-navigation/native';
import {PokemonDetailLayout} from './Layout';
import {usePokemonDetailController} from './useFeatureController';

type RouteParams = {name: string};

export function PokemonDetailScreen(): React.JSX.Element {
  const route = useRoute();
  const {name} = route.params as RouteParams;
  const {imageUrl, isLoading, isError, stats, types, abilities} =
    usePokemonDetailController(name);

  return (
    <PokemonDetailLayout
      name={name}
      imageUrl={imageUrl}
      types={types.map(entry => ({name: entry.type.name}))}
      stats={stats.map(entry => ({
        name: entry.stat.name,
        value: entry.base_stat,
      }))}
      abilities={abilities.map(entry => ({name: entry.ability.name}))}
      isLoading={isLoading}
      isError={isError}
    />
  );
}

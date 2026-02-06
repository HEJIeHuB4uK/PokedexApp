import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useFavoritesStore} from '../../store/favoritesStore';
import {PokemonDetailLayout} from './Layout';
import {usePokemonDetailController} from './useFeatureController';

type RouteParams = {name: string};

export function PokemonDetailScreen(): React.JSX.Element {
  const route = useRoute();
  const {name} = route.params as RouteParams;
  const {
    imageUrl,
    isLoading,
    isError,
    isOffline,
    hasData,
    stats,
    types,
    abilities,
    abilityDetail,
    abilityLoading,
    abilityError,
    selectedAbility,
    openAbility,
    closeAbility,
  } = usePokemonDetailController(name);
  const isFavorite = useFavoritesStore(state => state.isFavorite(name));
  const toggle = useFavoritesStore(state => state.toggle);

  const onToggleFavorite = () => {
    toggle({name, imageUrl});
  };

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
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
      isLoading={isLoading}
      isError={isError}
      isOffline={isOffline}
      hasData={hasData}
      abilityDetail={abilityDetail}
      abilityLoading={abilityLoading}
      abilityError={abilityError}
      selectedAbility={selectedAbility}
      onAbilityPress={openAbility}
      onCloseAbility={closeAbility}
    />
  );
}

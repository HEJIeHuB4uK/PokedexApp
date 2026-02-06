import React from 'react';
import {PokemonListLayout} from './Layout';
import {usePokemonListController} from './useFeatureController';

export function PokemonListScreen(): React.JSX.Element {
  const {items, query, onChangeQuery, onEndReached, isLoading} =
    usePokemonListController();

  return (
    <PokemonListLayout
      items={items}
      query={query}
      onChangeQuery={onChangeQuery}
      onEndReached={onEndReached}
      isLoading={isLoading}
    />
  );
}

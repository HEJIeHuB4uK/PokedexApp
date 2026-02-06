import React from 'react';
import {PokemonListLayout, PokemonListItem} from '../pokemon-list/Layout';

type SearchLayoutProps = {
  items: PokemonListItem[];
  query: string;
  isOffline: boolean;
  recentSearches: string[];
  recentViews: string[];
  types: string[];
  selectedType: string;
  onChangeQuery: (value: string) => void;
  onSelectType: (value: string) => void;
  onSelectRecent: (name: string) => void;
  onSelectPokemon: (name: string) => void;
  isLoading: boolean;
  isError: boolean;
};

export function SearchLayout({
  items,
  query,
  isOffline,
  recentSearches,
  recentViews: _recentViews,
  types,
  selectedType,
  onChangeQuery,
  onSelectType,
  onSelectRecent,
  onSelectPokemon,
  isLoading,
  isError,
}: SearchLayoutProps): React.JSX.Element {
  return (
    <PokemonListLayout
      items={items}
      query={query}
      isOffline={isOffline}
      recentSearches={recentSearches}
      recentViews={[]}
      types={types}
      selectedType={selectedType}
      title="Busqueda"
      showHistory
      showFilters
      showSearch
      showSearchIcon
      autoFocusSearch
      onChangeQuery={onChangeQuery}
      onSelectType={onSelectType}
      onSelectRecent={onSelectRecent}
      onSelectPokemon={onSelectPokemon}
      onEndReached={() => undefined}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={false}
      hasNextPage={false}
    />
  );
}

import {useMemo, useState} from 'react';
import {InfiniteData, useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiConfig, queryKeys} from '../../constants/api';
import {pokemonTypes, PokemonType} from '../../constants/pokemonTypes';
import {useDebounce} from '../../hooks/useDebounce';
import {
  fetchPokemonByName,
  fetchPokemonByType,
  fetchPokemonList,
} from './services';
import {PokemonListItem} from './Layout';
import {PokemonListResponse, PokemonTypeResponse} from '../../types/pokemon';

function getPokemonIdFromUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

function getImageUrlFromId(id: number | null): string | null {
  if (!id) {
    return null;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function normalizeSearchTerm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
}

export function usePokemonListController() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | PokemonType>('all');

  const debouncedSetQuery = useDebounce((value: string) => {
    setDebouncedQuery(normalizeSearchTerm(value));
  }, 400);

  const listQuery = useInfiniteQuery<
    PokemonListResponse,
    Error,
    InfiniteData<PokemonListResponse>,
    string[],
    number
  >({
    queryKey: [queryKeys.pokemonList],
    initialPageParam: 0,
    queryFn: ({pageParam}) => fetchPokemonList(pageParam, apiConfig.pageSize),
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length * apiConfig.pageSize : undefined,
  });

  const searchQuery = useQuery({
    queryKey: [queryKeys.pokemonDetail, debouncedQuery],
    queryFn: () => fetchPokemonByName(debouncedQuery),
    enabled: debouncedQuery.length > 0 && selectedType === 'all',
    retry: false,
  });

  const typeQuery = useQuery<PokemonTypeResponse>({
    queryKey: [queryKeys.pokemonType, selectedType],
    queryFn: () => fetchPokemonByType(selectedType),
    enabled: selectedType !== 'all',
  });

  const listItems = useMemo(() => {
    const pages = listQuery.data?.pages ?? [];
    return pages.flatMap(page =>
      page.results.map(item => {
        const id = getPokemonIdFromUrl(item.url);
        return {
          name: item.name,
          imageUrl: getImageUrlFromId(id),
        } satisfies PokemonListItem;
      }),
    );
  }, [listQuery.data]);

  const typeItems = useMemo(() => {
    if (!typeQuery.data) {
      return [] as PokemonListItem[];
    }
    return typeQuery.data.pokemon.map(entry => {
      const id = getPokemonIdFromUrl(entry.pokemon.url);
      return {
        name: entry.pokemon.name,
        imageUrl: getImageUrlFromId(id),
      } satisfies PokemonListItem;
    });
  }, [typeQuery.data]);

  const searchItem = useMemo(() => {
    if (!searchQuery.data) {
      return null;
    }
    return {
      name: searchQuery.data.name,
      imageUrl:
        searchQuery.data.sprites?.front_default ??
        getImageUrlFromId(searchQuery.data.id),
    } satisfies PokemonListItem;
  }, [searchQuery.data]);

  const filteredTypeItems = useMemo(() => {
    if (!debouncedQuery) {
      return typeItems;
    }
    return typeItems.filter(item => item.name.includes(debouncedQuery));
  }, [typeItems, debouncedQuery]);

  const items =
    selectedType !== 'all'
      ? filteredTypeItems
      : debouncedQuery
      ? searchItem
        ? [searchItem]
        : []
      : listItems;
  const isLoading =
    selectedType !== 'all'
      ? typeQuery.isLoading
      : debouncedQuery
      ? searchQuery.isLoading
      : listQuery.isLoading;
  const isError =
    selectedType !== 'all'
      ? typeQuery.isError
      : debouncedQuery
      ? searchQuery.isError
      : listQuery.isError;

  const onEndReached = () => {
    if (debouncedQuery || selectedType !== 'all') {
      return;
    }
    if (listQuery.hasNextPage && !listQuery.isFetchingNextPage) {
      listQuery.fetchNextPage();
    }
  };

  const onChangeQuery = (value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  };

  const onSelectType = (value: string) => {
    if (value === selectedType) {
      return;
    }
    setSelectedType(value as 'all' | PokemonType);
  };

  const types = ['all', ...pokemonTypes];

  return {
    items,
    query,
    types,
    selectedType,
    isLoading,
    isError,
    isFetchingNextPage: listQuery.isFetchingNextPage,
    hasNextPage: Boolean(listQuery.hasNextPage),
    onEndReached,
    onChangeQuery,
    onSelectType,
  };
}

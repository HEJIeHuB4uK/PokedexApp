import {useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {debounce} from '../../core/utils/debounce';
import {fetchPokemonList} from './services';

const PAGE_SIZE = 20;

export function usePokemonListController() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const {data, isLoading} = useQuery({
    queryKey: ['pokemon-list', page],
    queryFn: () => fetchPokemonList(page * PAGE_SIZE, PAGE_SIZE),
  });

  const items = useMemo(() => data?.results ?? [], [data]);

  const onEndReached = () => {
    setPage(current => current + 1);
  };

  const onChangeQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 400),
    [],
  );

  return {
    items,
    query,
    isLoading,
    onEndReached,
    onChangeQuery,
  };
}

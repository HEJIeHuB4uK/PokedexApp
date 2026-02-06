import {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '../../constants/api';
import {fetchPokemonByName} from './services';
import {useOfflineStatus} from '../../hooks/useOfflineStatus';
import {useViewHistoryStore} from '../../store/viewHistoryStore';

export function usePokemonDetailController(name: string) {
  const {isOnline, isOffline} = useOfflineStatus();
  const addViewHistory = useViewHistoryStore(state => state.add);
  const {data, isLoading, isError} = useQuery({
    queryKey: [queryKeys.pokemonDetail, name],
    queryFn: () => fetchPokemonByName(name),
    enabled: Boolean(name) && isOnline,
  });

  useEffect(() => {
    const viewedName = data?.name ?? name;
    if (viewedName) {
      addViewHistory(viewedName);
    }
  }, [addViewHistory, data?.name, name]);

  return {
    isLoading,
    isError,
    isOffline,
    name: data?.name ?? name,
    imageUrl: data?.sprites?.front_default ?? null,
    stats: data?.stats ?? [],
    types: data?.types ?? [],
    abilities: data?.abilities ?? [],
  };
}

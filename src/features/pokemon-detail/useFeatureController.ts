import {useEffect, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '../../constants/api';
import {fetchAbilityByName, fetchPokemonByName} from './services';
import {useOfflineStatus} from '../../hooks/useOfflineStatus';
import {useViewHistoryStore} from '../../store/viewHistoryStore';

export function usePokemonDetailController(name: string) {
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const {isOnline, isOffline} = useOfflineStatus();
  const addViewHistory = useViewHistoryStore(state => state.add);
  const {data, isLoading, isError} = useQuery({
    queryKey: [queryKeys.pokemonDetail, name],
    queryFn: () => fetchPokemonByName(name),
    enabled: Boolean(name) && isOnline,
  });

  const abilityQuery = useQuery({
    queryKey: [queryKeys.pokemonAbility, selectedAbility],
    queryFn: () => fetchAbilityByName(selectedAbility ?? ''),
    enabled: Boolean(selectedAbility),
  });

  const abilityDetail = useMemo(() => {
    if (!abilityQuery.data) {
      return null;
    }
    const english = abilityQuery.data.effect_entries.find(
      entry => entry.language.name === 'en',
    );
    return {
      name: abilityQuery.data.name,
      effect: english?.effect ?? 'Sin descripcion disponible.',
      shortEffect: english?.short_effect ?? '',
    };
  }, [abilityQuery.data]);

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
    abilityDetail,
    abilityLoading: abilityQuery.isLoading,
    abilityError: abilityQuery.isError,
    selectedAbility,
    openAbility: (value: string) => setSelectedAbility(value),
    closeAbility: () => setSelectedAbility(null),
    name: data?.name ?? name,
    imageUrl: data?.sprites?.front_default ?? null,
    stats: data?.stats ?? [],
    types: data?.types ?? [],
    abilities: data?.abilities ?? [],
  };
}

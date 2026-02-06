import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '../../constants/api';
import {fetchPokemonByName} from './services';

export function usePokemonDetailController(name: string) {
  const {data, isLoading, isError} = useQuery({
    queryKey: [queryKeys.pokemonDetail, name],
    queryFn: () => fetchPokemonByName(name),
    enabled: Boolean(name),
  });

  return {
    isLoading,
    isError,
    name: data?.name ?? name,
    imageUrl: data?.sprites?.front_default ?? null,
    stats: data?.stats ?? [],
    types: data?.types ?? [],
    abilities: data?.abilities ?? [],
  };
}

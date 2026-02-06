import {apiClient} from '../../core/api/client';
import {endpoints} from '../../core/api/endpoints';

export async function fetchPokemonByName(name: string) {
  const response = await apiClient.get(endpoints.pokemonByName(name));
  return response.data as {
    name: string;
    sprites?: {front_default?: string | null};
  };
}

import {apiClient} from '../../core/api/client';
import {endpoints} from '../../core/api/endpoints';

export async function fetchPokemonList(offset: number, limit: number) {
  const response = await apiClient.get(endpoints.pokemonList(offset, limit));
  return response.data as {results: {name: string; url: string}[]};
}

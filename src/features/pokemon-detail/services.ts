import {apiClient} from '../../core/api/client';
import {endpoints} from '../../core/api/endpoints';
import {PokemonAbilityResponse, PokemonDetailResponse} from '../../types/pokemon';

export async function fetchPokemonByName(name: string) {
  const response = await apiClient.get(endpoints.pokemonByName(name));
  return response.data as PokemonDetailResponse;
}

export async function fetchAbilityByName(name: string) {
  const response = await apiClient.get(endpoints.abilityByName(name));
  return response.data as PokemonAbilityResponse;
}

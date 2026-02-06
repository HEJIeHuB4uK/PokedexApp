import axios from 'axios';
import {apiClient} from '../../core/api/client';
import {endpoints} from '../../core/api/endpoints';
import {PokemonListResponse, PokemonTypeResponse} from '../../types/pokemon';

export async function fetchPokemonList(offset: number, limit: number) {
  const response = await apiClient.get(endpoints.pokemonList(offset, limit));
  return response.data as PokemonListResponse;
}

export async function fetchPokemonByName(name: string) {
  try {
    const response = await apiClient.get(endpoints.pokemonByName(name));
    return response.data as {
      id: number;
      name: string;
      sprites?: {front_default?: string | null};
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function fetchPokemonByType(type: string) {
  const response = await apiClient.get(endpoints.typeByName(type));
  return response.data as PokemonTypeResponse;
}

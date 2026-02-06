export type PokemonListResult = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  results: PokemonListResult[];
};

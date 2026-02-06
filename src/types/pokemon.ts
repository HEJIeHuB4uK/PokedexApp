export type PokemonListResult = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
};

export type PokemonTypeEntry = {
  pokemon: PokemonListResult;
  slot: number;
};

export type PokemonTypeResponse = {
  id: number;
  name: string;
  pokemon: PokemonTypeEntry[];
};

export type PokemonStatEntry = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonTypeSlot = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonAbilitySlot = {
  ability: {
    name: string;
  };
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  sprites?: {front_default?: string | null};
  stats: PokemonStatEntry[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
};

export type AbilityEffectEntry = {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
};

export type PokemonAbilityResponse = {
  id: number;
  name: string;
  effect_entries: AbilityEffectEntry[];
};

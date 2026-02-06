export const endpoints = {
  pokemonList: (offset: number, limit: number) =>
    `/pokemon?offset=${offset}&limit=${limit}`,
  pokemonByName: (name: string) => `/pokemon/${name}`,
  typeByName: (name: string) => `/type/${name}`,
  abilityByName: (name: string) => `/ability/${name}`,
};

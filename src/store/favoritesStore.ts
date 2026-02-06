import {create} from 'zustand';
import {readFavorites, writeFavorites} from '../features/favorites/services';

type FavoritesState = {
  favorites: {name: string; imageUrl?: string | null}[];
  load: () => Promise<void>;
  toggle: (item: {name: string; imageUrl?: string | null}) => Promise<void>;
  isFavorite: (name: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  load: async () => {
    const items = await readFavorites();
    set({favorites: items});
  },
  toggle: async item => {
    const {favorites} = get();
    const exists = favorites.some(entry => entry.name === item.name);
    const next = exists
      ? favorites.filter(entry => entry.name !== item.name)
      : [...favorites, item];
    set({favorites: next});
    await writeFavorites(next);
  },
  isFavorite: name => {
    const {favorites} = get();
    return favorites.some(entry => entry.name === name);
  },
}));

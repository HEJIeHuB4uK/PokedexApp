import {useFavoritesStore} from '../../store/favoritesStore';

export function useFavoritesController() {
  const items = useFavoritesStore(state => state.favorites);

  return {items};
}

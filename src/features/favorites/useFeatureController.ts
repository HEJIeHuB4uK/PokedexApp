import {useEffect} from 'react';
import {useFavoritesStore} from '../../store/favoritesStore';

export function useFavoritesController() {
  const items = useFavoritesStore(state => state.favorites);
  const load = useFavoritesStore(state => state.load);

  useEffect(() => {
    load();
  }, [load]);

  return {items};
}

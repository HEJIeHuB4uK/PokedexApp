import {useEffect, useState} from 'react';
import {FavoriteEntry, readFavorites} from './services';

export function useFavoritesController() {
  const [items, setItems] = useState<FavoriteEntry[]>([]);

  useEffect(() => {
    let isMounted = true;
    readFavorites().then(data => {
      if (isMounted) {
        setItems(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return {items};
}

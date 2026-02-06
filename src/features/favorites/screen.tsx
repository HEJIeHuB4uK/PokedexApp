import React from 'react';
import {FavoritesLayout} from './Layout';
import {useFavoritesController} from './useFeatureController';

export function FavoritesScreen(): React.JSX.Element {
  const {items} = useFavoritesController();
  return <FavoritesLayout items={items} />;
}

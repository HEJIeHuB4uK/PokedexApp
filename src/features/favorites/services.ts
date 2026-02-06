import {readStorage, writeStorage} from '../../core/storage/asyncStorage';
import {storageKeys} from '../../core/storage/keys';

export type FavoriteEntry = {
  name: string;
  imageUrl?: string | null;
};

export async function readFavorites(): Promise<FavoriteEntry[]> {
  return readStorage(storageKeys.favorites, [] as FavoriteEntry[]);
}

export async function writeFavorites(items: FavoriteEntry[]): Promise<void> {
  await writeStorage(storageKeys.favorites, items);
}

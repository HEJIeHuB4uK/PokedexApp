import {create} from 'zustand';
import {readStorage, writeStorage} from '../core/storage/asyncStorage';
import {storageKeys} from '../core/storage/keys';

type SearchHistoryState = {
  history: string[];
  add: (term: string) => Promise<void>;
  load: () => Promise<void>;
};

export const useSearchHistoryStore = create<SearchHistoryState>((set, get) => ({
  history: [],
  load: async () => {
    const history = await readStorage(
      storageKeys.searchHistory,
      [] as string[],
    );
    set({history});
  },
  add: async term => {
    const {history} = get();
    const next = [term, ...history.filter(item => item !== term)].slice(0, 20);
    set({history: next});
    await writeStorage(storageKeys.searchHistory, next);
  },
}));

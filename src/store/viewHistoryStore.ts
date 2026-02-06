import {create} from 'zustand';
import {readStorage, writeStorage} from '../core/storage/asyncStorage';
import {storageKeys} from '../core/storage/keys';

type ViewHistoryEntry = {
  name: string;
  viewedAt: number;
};

type ViewHistoryState = {
  history: ViewHistoryEntry[];
  add: (name: string) => Promise<void>;
  load: () => Promise<void>;
};

export const useViewHistoryStore = create<ViewHistoryState>((set, get) => ({
  history: [],
  load: async () => {
    const history = await readStorage(
      storageKeys.viewHistory,
      [] as ViewHistoryEntry[],
    );
    set({history});
  },
  add: async name => {
    const {history} = get();
    const next = [
      {name, viewedAt: Date.now()},
      ...history.filter(item => item.name !== name),
    ].slice(0, 20);
    set({history: next});
    await writeStorage(storageKeys.viewHistory, next);
  },
}));

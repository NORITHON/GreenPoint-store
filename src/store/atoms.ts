import { atom } from 'recoil';
import { IStore } from '../types';

export const storeState = atom<IStore | null>({
  key: 'store',
  default: null,
});

export const themeModeState = atom<'light' | 'dark'>({
  key: 'themeMode',
  default: (localStorage.getItem('themeMode') ?? 'light') as 'light' | 'dark',
});

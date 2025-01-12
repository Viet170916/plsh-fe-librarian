import type { RootState } from '@/stores/store';
import {
  TypedUseSelectorHook,
  useSelector as reduxUseSelector,
} from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

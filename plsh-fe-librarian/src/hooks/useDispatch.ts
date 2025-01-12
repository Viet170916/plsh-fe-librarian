import type { AppDispatch } from '@/stores/store';
import { useDispatch as reduxUseDispatch } from 'react-redux';

/**
 * Custom hook to dispatch actions in a Redux store.
 *
 * This hook wraps the `useDispatch` hook from `react-redux` to provide typing
 * specific to the application's dispatch function. It ensures that the dispatch
 * function used throughout the application is typed according to the `AppDispatch`
 * type, which is defined in the application's store configuration.
 *
 * @returns {AppDispatch} The typed dispatch function for the Redux store.
 */
export const useDispatch = (): AppDispatch => reduxUseDispatch<AppDispatch>();

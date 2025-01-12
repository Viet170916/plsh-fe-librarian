'use client';
import { JSX, ReactNode } from "react";
import { Provider } from 'react-redux';
import { store } from './store';

interface ProvidersProps {
  children: ReactNode;
}

export default function ProviderRedux({
  children,
}: ProvidersProps): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

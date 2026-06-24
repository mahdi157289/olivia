import { createContext, useContext, useState, type ReactNode } from 'react';

const AppReadyContext = createContext(false);

export function AppReadyProvider({
  children,
  ready,
}: {
  children: ReactNode;
  ready: boolean;
}) {
  return <AppReadyContext.Provider value={ready}>{children}</AppReadyContext.Provider>;
}

export function useAppReady() {
  return useContext(AppReadyContext);
}

export function useAppReadyState() {
  const [ready, setReady] = useState(false);
  return { ready, markReady: () => setReady(true) };
}

'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import ThemeRegistry from '@/ThemeRegistry';
import useUserInitializer from '@/lib/hooks/useUserInitializer';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  useUserInitializer(); // ✅ Safe here — inside Provider
  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </ReduxProvider>
    </Provider>
  );
}

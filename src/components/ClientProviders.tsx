'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import ThemeRegistry from '@/ThemeRegistry';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </Provider>
  );
}

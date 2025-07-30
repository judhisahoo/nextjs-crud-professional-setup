'use client';
import { useMessage } from '@/context/MessageContext';

export const useShowMessage = () => {
  const { showMessage } = useMessage();

  return (type: 'success' | 'error' | 'info', title: string, body: string, url?: string) => {
    showMessage({ type, title, body, url });
  };
};

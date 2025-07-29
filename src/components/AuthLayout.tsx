'use client';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/account/login');
    }
  }, [user, router]); // ✅ include 'router' to fix warning

  return <>{user && children}</>;
}

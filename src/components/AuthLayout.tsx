'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  console.log('user in AuthLayout component');
  const { user } = useAppSelector((state) => state.user);
  console.log('user from redux in AuthLayout ::', user);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log('user from redux in AuthLayout in useeffect ::', user);
    if (!user) {
      console.log('calling redirect to /account/login');
      router.replace('/account/login');
    } else {
      setChecking(false);
    }
  }, [user, router]);

  if (!user || checking) return null;

  return <>{children}</>;
}

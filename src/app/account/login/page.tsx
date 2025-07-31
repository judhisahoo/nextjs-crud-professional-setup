'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  console.log('now in login page');
  const { user } = useAppSelector((state) => state.user);
  console.log('now in login page with user data from redux ::', user);
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  console.log('now in login page with checkcing var ', checking);
  // Simulate checking delay – or sync this with Redux hydration
  useEffect(() => {
    console.log(
      'now in login page in useEffect for setTimeout fun for 100 mili sec to set checking to false',
    );
    setTimeout(() => {
      console.log('now in login page call settimeout and set checking to false');
      setChecking(false);
    }, 100); // Can be 0ms if redux is synced
  }, []);

  useEffect(() => {
    console.log(
      'now in login page in useEffect to rediect to /accont/me if checking is false and user have data',
    );
    if (!checking && user) {
      console.log(
        'now in login page in useEffect hook and going to rediect to /accont/me ===user===',
        user,
      );
      console.log(
        'now in login page in useEffect hook and going to rediect to /accont/me ===checking===',
        checking,
      );
      console.log('Triggering redirect with timeout...');
      setTimeout(() => {
        console.log('going to call router.replace()');
        router.replace('/account/me');
      }, 0); // or 10–50ms if needed
    }
  }, [checking, user, router]);

  if (checking) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>
      <LoginForm />
    </div>
  );
}

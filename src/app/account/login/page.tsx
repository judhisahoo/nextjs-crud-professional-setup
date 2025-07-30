'use client';
import dynamic from 'next/dynamic';
//import Logger from '@/components/debug/Logger';

// Use dynamic import for LoginForm
const LoginForm = dynamic(() => import('@/components/forms/LoginForm'), {
  ssr: false, // Optional: disable Server Side Rendering
  loading: () => <p>Loading login form...</p>, // Optional fallback
});

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>
      <LoginForm />
    </div>
  );
}

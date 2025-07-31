import AuthLayout from '@/components/AuthLayout';

export default function MePage() {
  console.log('now in /account/me page');
  return (
    <AuthLayout>
      <h1>My Account page</h1>
    </AuthLayout>
  );
}

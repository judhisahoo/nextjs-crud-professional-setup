import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Register</h1>
      <RegisterForm />
    </div>
  );
}

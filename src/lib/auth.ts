'use client';

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  status: 'Active' | 'InActive';
  token?: string;
};

// Save user to localStorage (and optionally cookies)
export function setAuth(user: AuthUser) {
  localStorage.setItem('user', JSON.stringify(user));
  document.cookie = `token=${user.token}; path=/`;
}

// Get user from localStorage
export function getAuth(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Remove user on logout
export function clearAuth() {
  localStorage.removeItem('user');
  document.cookie = 'token=; Max-Age=0; path=/';
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!getAuth();
}

'use client';

import { AppBar, Toolbar, Typography, Box, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout, login } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAuth, clearAuth } from '@/lib/auth';

export default function Header() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const authUser = getAuth();
    if (authUser) dispatch(login(authUser));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    clearAuth();
    router.push('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo + Nav */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="h6" component="div">
            🛒 MyShop
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="/" passHref>
              <Button color="inherit">Home</Button>
            </Link>
            <Link href="/products" passHref>
              <Button color="inherit">All Products</Button>
            </Link>
            {user && (
              <Link href="/products/add-product" passHref>
                <Button color="inherit">Add Product</Button>
              </Link>
            )}
          </Stack>
        </Box>

        {/* Right: Auth */}
        <Box>
          {!user ? (
            <Link href="/account/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Stack direction="row" spacing={2}>
              <Link href="/account/me" passHref>
                <Button color="inherit">My Account</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

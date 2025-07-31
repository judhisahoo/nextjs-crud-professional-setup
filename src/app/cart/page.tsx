'use client';
import AuthLayout from '@/components/AuthLayout';
import { ThemeProvider } from '@emotion/react';
import { Box, Container, createTheme, Typography } from '@mui/material';
import React from 'react';

export default function CartPage() {
  const defaultTheme = createTheme();
  return (
    <AuthLayout>
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Box>
            <Typography>Cart Page</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </AuthLayout>
  );
}

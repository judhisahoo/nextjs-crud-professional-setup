'use client';
import { ThemeProvider } from '@emotion/react';
import { Box, Container, createTheme, Typography } from '@mui/material';
import React from 'react';

export default function SupportPage() {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box>
          <Typography>Support Page</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

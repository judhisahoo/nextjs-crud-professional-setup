import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        color: '#555',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </Typography>
    </Box>
  );
}

'use client';

import { registerSchema } from '@/validations/registerSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Box, Paper } from '@mui/material';
import axiosClient from '@/helper/axios.client';

import { useShowMessage } from '@/helper/my-message';

export default function RegisterForm() {
  const showMessage = useShowMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post('/api/auth/register', data);
      localStorage.setItem('ACCESS_TOKEN', res.data.token);
      showMessage('success', 'Registered', 'Your account has been created.', '/account/login');
    } catch (error) {
      console.log(error);
      showMessage('error', 'Registration Message', 'Something went wrong');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="30vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Name"
                sx={{ width: '80%' }}
                {...register('name')}
                error={!!errors.name}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
                helperText={errors.name?.message}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Email"
                sx={{ width: '80%' }}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Phone"
                {...register('phone')}
                sx={{ width: '80%' }}
                error={!!errors.phone}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
                helperText={errors.phone?.message}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="DOB"
                type="date"
                sx={{ width: '80%' }}
                InputLabelProps={{ shrink: true }}
                {...register('dob')}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Age"
                type="number"
                {...register('age')}
                sx={{ width: '80%' }}
                error={!!errors.age}
                helperText={errors.age?.message}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Password"
                type="password"
                sx={{ width: '80%' }}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 5,
              }}
              style={{ height: '80px', paddingTop: '30px', marginLeft: '20px' }}
            >
              <TextField
                label="Confirm Password"
                type="password"
                sx={{ width: '80%' }}
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                inputProps={{ style: { height: '40px', padding: '10px' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 5,
                px: 4,
              }}
              style={{ height: '70px', display: 'flex', flexDirection: 'column' }}
            >
              <Stack
                direction="row"
                spacing={4}
                sx={{ width: '75%', justifyContent: 'center', alignItems: 'center' }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                  style={{ margin: '10px' }}
                >
                  Reset
                </Button>
                <Button type="submit" variant="contained" style={{ margin: '10px' }}>
                  Register
                </Button>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

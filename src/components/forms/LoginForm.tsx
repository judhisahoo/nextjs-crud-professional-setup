'use client';

import { loginSchema } from '@/validations/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Stack,
  Box,
  Paper,
  createTheme,
  ThemeProvider,
  Container,
} from '@mui/material';
import axiosClient from '@/helper/axios.client';

import { useShowMessage } from '@/helper/my-message';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/slices/userSlice';
import { setAuth } from '@/lib/auth';

export default function LoginForm() {
  const defaultTheme = createTheme();
  const showMessage = useShowMessage();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  //const router = useRouter();

  console.log('Form Errors:', errors);

  const onSubmit = async (data) => {
    console.log('calling onSubmit ..................');

    //const baseURL = await axiosClient.defaults.baseURL;
    //console.log('axios client baseURL::', baseURL);

    const res = await axiosClient.post('/api/auth/login', data);
    console.log('res at onSubmit() at LoginForm ::', res);
    if (res.status == 200) {
      const { accessToken, user } = res.data;
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      user.token = accessToken;
      console.log('user data from res', user);
      setAuth(user);

      dispatch(login(user));

      showMessage('success', 'Registered', 'Your account has been created.');
    } else {
      showMessage('error', 'Login Message', res.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
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
                      Login Now
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

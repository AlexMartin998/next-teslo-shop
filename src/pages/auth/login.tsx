import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthLayout } from '@/layouts';
import { loginFormSchema } from '@/shared/utils';
import { tesloApi } from '@/api/axios-client';
import { AxiosError, isAxiosError } from 'axios';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginFormSchema) });

  const onLogin = async ({ email, password }: FormData) => {
    try {
      const {
        data: { token, user },
      } = await tesloApi.post('/user/login', { email, password });
      console.log(token, user);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log In
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="filled"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Log In
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink
                href="/auth/register"
                passHref
                style={{ color: 'inherit' }}
              >
                Don&rsquo;t have an account?{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: '#274494',
                  }}
                >
                  Sign up
                </span>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

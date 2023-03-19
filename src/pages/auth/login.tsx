import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthLayout } from '@/layouts';
import { loginFormSchema } from '@/shared/utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  // const { login } = useAuth(); // without nextAuth
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginFormSchema) });
  const [showError, setShowError] = useState(false);

  const invalidCredentials = router.query?.error;

  const onLogin = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn('credentials', { email, password }); // only providers configured
  };

  /* // // Without NextAuth
    const onLogin = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await login(email, password);
    if (!isValidLogin) {
      setTimeout(() => {
        setShowError(false);
      }, 2100);

      return setShowError(true);
    }

    const destination = router.query?.p?.toString() || '/';
    router.replace(destination);
  }; */

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h1" component="h1">
                  Log In
                </Typography>

                <Chip
                  label="Invalid credentials"
                  color="error"
                  icon={<ErrorOutlineOutlinedIcon />}
                  className="fadeIn"
                  sx={{
                    display: showError || invalidCredentials ? 'flex' : 'none',
                  }}
                />
              </Box>
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
                href={`/auth/register?p=${
                  router.query?.p?.toString() || '/auth/register'
                }`}
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

/* 



*/
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session)
    return { redirect: { destination: p.toString(), permanent: false } };

  return {
    props: {},
  };
};

export default LoginPage;

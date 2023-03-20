import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthLayout } from '@/layouts';
import { useAuth } from '@/context';
import { registerFormSchema } from '@/shared/utils';
import { authOptions } from '../api/auth/[...nextauth]';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(registerFormSchema) });

  const onRegister = async ({ email, name, password }: FormData) => {
    setShowError(false);

    // register with CredentialsProvider DOES Need register endpoint
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setErrMsg(message ?? '');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrMsg('');
      }, 2400);

      return reset();
    }

    // como llama al Endpoint, se crea en DB, y con el `signIn` se hace el Login, creando el JWT con NextAuth ya q invoca al CredentialsProvider q valida q exista el user y q el pass haga match
    await signIn('credentials', { email, password }); // only providers configured
  };

  /*  // Without NextAuth
    const onRegister = async ({ email, name, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setErrMsg(message ?? '');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrMsg('');
      }, 2400);

      return reset();
    }

    router.replace(router.query?.p?.toString() || '/');
  }; */

  return (
    <AuthLayout title="Sign Up">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <form onSubmit={handleSubmit(onRegister)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Sign up
              </Typography>

              <Chip
                label={errMsg}
                color="error"
                icon={<ErrorOutlineOutlinedIcon />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none', my: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="filled"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                Sign up
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink
                href={`/auth/login?p=${
                  router.query?.p?.toString() || '/auth/login'
                }`}
                passHref
                style={{ color: 'inherit' }}
              >
                Already have an account?{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: '#274494',
                  }}
                >
                  Log in
                </span>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

/* 


*/
// // auth protection with SSR
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  // https://next-auth.js.org/configuration/nextjs#in-getserversideprops
  const session = await getServerSession(req, res, authOptions);
  const { p = '/' } = query;

  if (session)
    return { redirect: { destination: p.toString(), permanent: false } };

  return {
    props: {},
  };
};

export default RegisterPage;

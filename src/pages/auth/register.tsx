import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthLayout } from '@/layouts';
import { useAuth } from '@/context';
import { useNavigateTo } from '@/shared/hooks';
import { registerFormSchema } from '@/shared/utils';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const { navigateAndReplace } = useNavigateTo();
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

    navigateAndReplace('/');
  };

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
                href="/auth/login"
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

export default RegisterPage;

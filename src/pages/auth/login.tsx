import { NextPage } from 'next';
import NextLink from 'next/link';

import { AuthLayout } from '@/layouts';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Log In">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Log In
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Email" type="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
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
    </AuthLayout>
  );
};

export default LoginPage;

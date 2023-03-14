import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '@/layouts';

const RegisterPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Sign up
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Full Name" variant="filled" fullWidth />
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
              Sign up
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <NextLink href="/auth/login" passHref style={{ color: 'inherit' }}>
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
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;

import { GetServerSideProps, NextPage } from 'next';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { ShopLayout } from '@/layouts';
import { isValidToken } from '@/shared/utils';

const AdressPage: NextPage = () => {
  return (
    <ShopLayout title="Customer Address" pageDescription="Some description">
      <Typography variant="h1" component="h1">
        Address
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last name" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address 2 (optional)" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="ZIP Code" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              id="country-select"
              // variant="filled"
              label="Country"
              value={3}
            >
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Honduras</MenuItem>
              <MenuItem value={3}>Ecuador</MenuItem>
              <MenuItem value={4}>Mexico</MenuItem>
              <MenuItem value={5}>Argentina</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone number" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button
          color="secondary"
          className="circular-btn"
          size="large"
          sx={{ px: 5 }}
        >
          Check order
        </Button>
      </Box>
    </ShopLayout>
  );
};

// // // Next.js < v12 - WIHOUT MIDDLEWARE (on each page that requires this validation)
// - Only if you need to pre-render a page whose data must be fetched at REQUEST TIME
// se ejecuta Solo en Server Side y c/req q haga el client
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies; // xq cookies viajan en req time
  let isAValidToken = false;

  try {
    await isValidToken(token);
    isAValidToken = true;
  } catch (error) {
    isAValidToken = false;
  }

  if (!isAValidToken)
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default AdressPage;

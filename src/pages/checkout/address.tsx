import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ShopLayout } from '@/layouts';
import { useCart } from '@/context';
import { addressFormSchema, countries } from '@/shared/utils';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  const {
    firstName,
    lastName,
    address,
    address2,
    city,
    zipCode,
    country,
    phone,
  } = JSON.parse(Cookies.get('checkoutAddress') || '{}');

  return {
    firstName,
    lastName,
    address,
    address2,
    city,
    zipCode,
    country,
    phone,
  };
};

const AdressPage: NextPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(addressFormSchema),
    defaultValues: getAddressFromCookies(),
  });
  const router = useRouter();
  const { updateShippingAddress } = useCart();

  const [isMounted, setIsMounted] = useState(false);

  const onAddressSubmit = (data: FormData) => {
    updateShippingAddress(data);

    router.push('/checkout/summary');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <ShopLayout title="Customer Address" pageDescription="Some description">
      <Typography variant="h1" component="h1">
        Address
      </Typography>

      <form onSubmit={handleSubmit(onAddressSubmit)}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="filled"
              fullWidth
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2 (optional)"
              variant="filled"
              fullWidth
              {...register('address2')}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.country}
                  variant="filled"
                >
                  <InputLabel>Country</InputLabel>

                  <Select {...field} label="Country">
                    {countries.map(({ code, name }) => (
                      <MenuItem key={code} value={code}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>{errors.country?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ZIP Code"
              variant="filled"
              fullWidth
              {...register('zipCode')}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone number"
              variant="filled"
              fullWidth
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            sx={{ px: 5 }}
            type="submit"
          >
            Check order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

/* 



*/

/* // // // Next.js < v12 - WIHOUT MIDDLEWARE (on each page that requires this validation)
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
 */

export default AdressPage;

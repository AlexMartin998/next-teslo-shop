import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { ShopLayout } from '@/layouts';
import { useCart } from '@/context';
import { CartList, OrderSummary } from '@/teslo-shop/scenes/CartScene';
import { countries } from '@/shared/utils';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {
  const router = useRouter();
  const {
    shippingAddress,
    orderSummary: { numberOfItems },
  } = useCart();

  useEffect(() => {
    const shippingAddress = JSON.parse(Cookies.get('checkoutAddress') || '{}');
    if (!shippingAddress?.address) router.replace('/checkout/address');
  }, [router]);

  if (!shippingAddress) return <></>;

  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phone,
    zipCode,
    address2 = '',
  } = shippingAddress;

  return (
    <ShopLayout
      title="Order Summary"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      <Typography variant="h1" component="h1" mb={4}>
        Order Summary
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>
                Summary ({numberOfItems}{' '}
                {numberOfItems > 1 ? 'products' : 'product'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery address</Typography>
                <NextLink
                  href="/checkout/address"
                  style={{ textDecoration: 'underline', color: 'black' }}
                >
                  Edit
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ''}
              </Typography>
              <Typography>
                {city}, {zipCode}
              </Typography>
              <Typography>
                {countries.find(c => c.code == country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink
                  href="/cart"
                  style={{ textDecoration: 'underline', color: 'black' }}
                >
                  Edit
                </NextLink>
              </Box>

              {/* Order Summary */}
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;

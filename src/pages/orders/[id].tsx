import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

import { ShopLayout } from '@/layouts';
import { CartList, OrderSummary } from '@/teslo-shop/scenes/CartScene';

const OrderPage = () => {
  return (
    <ShopLayout
      title="Summary of order ADLSD234JND"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      <Typography variant="h1" component="h1" mb={4}>
        Order: 12DJN23JN
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlinedIcon />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label="Paid purchase order"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlinedIcon />}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>Summary (3 items)</Typography>
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

              <Typography>Alex Axes</Typography>
              <Typography>Some address</Typography>
              <Typography>Quito, 17172</Typography>
              <Typography>Ecuador</Typography>
              <Typography>+593 99 9999 999</Typography>

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
                <h1>Pay</h1>

                <Chip
                  sx={{ my: 2 }}
                  label="Paid purchase order"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlinedIcon />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { CartList, OrderSummary } from './components';
import NextLink from 'next/link';

export interface CartSceneProps {}

const CartScene: React.FC<CartSceneProps> = () => {
  return (
    <>
      <Typography variant="h1" component="h1" mb={4}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>Purchase Order</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Order Summary */}
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* No atrapa el middleware cuando uso NextLink a menos q haga el reload in prod */}
                {/* <NextLink href="/checkout/address" prefetch={false}> */}
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    href="/checkout/address"
                  >
                    Checkout
                  </Button>
                {/* </NextLink> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CartScene;

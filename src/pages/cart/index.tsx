import { ShopLayout } from '@/layouts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

const CartPage = () => {
  return (
    <ShopLayout
      title="Shopping Cart"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      <Typography variant="h1" component="h1">
        Shopping Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CardList */}
        </Grid>

        <Grid item xs={12} sm={7}>
          <Card className="summary-card">
            <CardContent>
              <Typography>Purchase Order</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Order Summary */}

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;

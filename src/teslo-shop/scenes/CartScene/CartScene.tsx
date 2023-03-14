import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { CartList } from './components';

export interface CartSceneProps {}

const CartScene: React.FC<CartSceneProps> = () => {
  return (
    <>
      <Typography variant="h1" component="h1">
        Shopping Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
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
    </>
  );
};

export default CartScene;

import NextLink from 'next/link';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { useCart } from '@/context';
import { ItemCounter } from '@/shared/components';
import { ICartProduct } from '@/interfaces';

interface CartListProps {
  editable?: boolean;
}

const CartList: React.FC<CartListProps> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeProductFromCart } = useCart();

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantity: number
  ) => {
    product.quantity = newQuantity;

    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map(product => (
        <Grid
          key={product.slug + product.size}
          container
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.image}`}
                  component="img"
                  sx={{ borderRadius: '5px' }}
                ></CardMedia>
              </CardActionArea>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  onUpdateQuantity={newQuantity =>
                    onNewCartQuantityValue(product, newQuantity)
                  }
                />
              ) : (
                <Typography variant="h6">
                  {product.quantity}{' '}
                  {product.quantity > 1 ? 'products' : 'product'}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>

            {editable && (
              <Button
                onClick={() => removeProductFromCart(product)}
                variant="text"
                color="secondary"
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;

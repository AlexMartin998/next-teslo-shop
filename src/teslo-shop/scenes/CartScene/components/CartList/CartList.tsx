import NextLink from 'next/link';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { initialData } from '@/database/products';
import { ItemCounter } from '@/shared/components';

interface CartListProps {
  editable?: boolean;
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const CartList: React.FC<CartListProps> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map(product => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/slug`}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.images[0]}`}
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
                Size: <strong>M</strong>
              </Typography>

              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h6">3 items</Typography>
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
              <Button variant="text" color="secondary">
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

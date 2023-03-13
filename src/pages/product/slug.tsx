import { NextPage } from 'next';
import 'react-slideshow-image/dist/styles.css';

import { ShopLayout } from '@/layouts';
import { initialData } from '@/database/products';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlidesShow, SizeSelector } from '@/products/common';
import { ItemCounter } from '@/shared/components';

const product = initialData.products[0];

const ProductPage: NextPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlidesShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>

            {/* Quantity: */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>

              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[3]}
                sizes={product.sizes}
              />
            </Box>

            {/* add to cart */}
            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* <Chip label="Out of Stock" color="error" variant="outlined" /> */}

            {/* Description: */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;

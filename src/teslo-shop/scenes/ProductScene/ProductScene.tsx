import { useState } from 'react';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ProductSlidesShow, SizeSelector } from '@/teslo-shop/common';
import { ItemCounter } from '@/shared/components';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { useCart } from '@/context';

interface ProductSceneProps {
  product: IProduct;
}

interface PSState {
  productInCart: ICartProduct;
}

const ProductScene: React.FC<ProductSceneProps> = ({ product }) => {
  const { addProductToCart } = useCart();
  const [tempCartProduct, setTempCartProduct] = useState<
    PSState['productInCart']
  >({
    _id: product._id!,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const handleSize = (size: ISize) => {
    setTempCartProduct(prev => ({ ...prev, size }));
  };

  const handleUpdateQuantity = (updatedQuantity: number) => {
    setTempCartProduct(currProd => ({
      ...currProd,
      quantity: updatedQuantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    // evitar q se pase x referencia y cambie el tempCartProduct.quantity al llevar el mismo producto con misma talla sin modificar nada y sin aplicar de inmediato la redireccion. (1,2,4,8,16,32 etc.)
    addProductToCart({ ...tempCartProduct });
    // navigateToPath('/cart');
  };

  return (
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

            <ItemCounter
              currentValue={tempCartProduct.quantity}
              maxValue={product.inStock > 10 ? 10 : product.inStock}
              onUpdateQuantity={handleUpdateQuantity}
            />
            <SizeSelector
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              // onSelectedSize={size => handleSize(size)}
              onSelectedSize={handleSize}
            />
          </Box>

          {/* add to cart */}
          {!product.inStock ? (
            <Chip label="Out of Stock" color="error" variant="outlined" />
          ) : (
            <Button
              color="secondary"
              className="circular-btn"
              disabled={!tempCartProduct.size}
              onClick={onAddProduct}
            >
              {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
            </Button>
          )}

          {/* Description: */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Description</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductScene;

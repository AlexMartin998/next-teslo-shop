import { useState } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Chip,
} from '@mui/material';

import { IProduct } from '@/interfaces';

interface ProductCardProps {
  product: IProduct;
}

interface PCState {
  isHovered: boolean;
  isImgLoaded: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<PCState['isHovered']>(false);
  const [isImageLoaded, setIsImageLoaded] =
    useState<PCState['isImgLoaded']>(false);

  const handleLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} prefetch={false}>
          <CardActionArea>
            {!product.inStock && (
              <Chip
                color="error"
                label="Out of stock"
                sx={{
                  position: 'absolute',
                  zIndex: 99,
                  top: '10px',
                  left: '10px',
                }}
              />
            )}

            <CardMedia
              component="img"
              // image={
              //   isHovered
              //     ? `/products/${product.images[1]}`
              //     : `/products/${product.images[0]}`
              // }
              image={
                isHovered
                  ? product.images[1].startsWith('https')
                    ? product.images[1]
                    : `/products/${product.images[1]}`
                  : product.images[0].startsWith('https')
                    ? product.images[0]
                    : `/products/${product.images[0]}`
              }
              alt={product.title}
              className="fadeIn"
              onLoad={handleLoad}
            />
          </CardActionArea>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;

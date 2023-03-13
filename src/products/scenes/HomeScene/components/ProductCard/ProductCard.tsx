import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from '@mui/material';

import { IProduct } from '@/interfaces';
import { useState } from 'react';

interface ProductCardProps {
  product: IProduct;
}

interface PCState {
  isHovered: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<PCState['isHovered']>(false);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={
              isHovered
                ? `products/${product.images[1]}`
                : `products/${product.images[0]}`
            }
            alt={product.title}
            className="fadeIn"
            // onLoad={() => console.log('loaded')}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;

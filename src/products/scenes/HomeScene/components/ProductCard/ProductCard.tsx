import { Grid, Card, CardActionArea, CardMedia } from '@mui/material';

import { IProduct } from '@/interfaces';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Grid item key={product.slug} xs={6} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`products/${product.images[0]}`}
            alt={product.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;

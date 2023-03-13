import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { ShopLayout } from '@/layouts';

import { initialData } from '@/database/products';

export default function HomePage() {
  return (
    <ShopLayout
      title="Teslo-Shop | Home"
      pageDescription="Find Teslo's best products here"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>

      <Grid container spacing={4}>
        {initialData.products.map(product => (
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
        ))}
      </Grid>
    </ShopLayout>
  );
}

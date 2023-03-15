import { Typography } from '@mui/material';

import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { ProductsScene } from '@/teslo-shop';

export default function HomePage() {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="TesloShop - Spend less. Smile more."
      pageDescription="Find Teslo's best products here"
    >
      <ProductsScene products={products} isLoading={isLoading}>
        <Typography variant="h1" component="h1">
          Shop
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          All products
        </Typography>
      </ProductsScene>
    </ShopLayout>
  );
}

import { Typography } from '@mui/material';

import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { ProductsScene } from '@/teslo-shop';

const KidsCategoryPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title="Children's product category"
      pageDescription="Find Teslo's best products here"
    >
      <ProductsScene products={products} isLoading={isLoading}>
        <Typography variant="h1" component="h1">
          Children&apos;s section
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          All our products for kids
        </Typography>
      </ProductsScene>
    </ShopLayout>
  );
};

export default KidsCategoryPage;

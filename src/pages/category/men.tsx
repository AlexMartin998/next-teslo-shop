import { Typography } from '@mui/material';

import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { ProductsScene } from '@/teslo-shop';

const MenCategoryPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title="Men's product category"
      pageDescription="Find Teslo's best products here"
    >
      <ProductsScene products={products} isLoading={isLoading}>
        <Typography variant="h1" component="h1">
          Men&apos;s section
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          All our products for men
        </Typography>
      </ProductsScene>
    </ShopLayout>
  );
};

export default MenCategoryPage;

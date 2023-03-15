import { Typography } from '@mui/material';

import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { ProductsScene } from '@/teslo-shop';

const WomenCategoryPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title="Women's product category"
      pageDescription="Find Teslo's best products here"
    >
      <ProductsScene products={products} isLoading={isLoading}>
        <Typography variant="h1" component="h1">
          Ladies Section
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          All our products for ladies
        </Typography>
      </ProductsScene>
    </ShopLayout>
  );
};

export default WomenCategoryPage;

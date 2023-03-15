import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { HomeScene } from '@/teslo-shop';

const WomenCategoryPage = () => {
  const { products, error, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title="Women's product category"
      pageDescription="Find Teslo's best products here"
    >
      <HomeScene products={products || []} isLoading={isLoading} />
    </ShopLayout>
  );
};

export default WomenCategoryPage;

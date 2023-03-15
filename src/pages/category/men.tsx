import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { HomeScene } from '@/teslo-shop';

const MenCategoryPage = () => {
  const { products, error, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title="Men's product category"
      pageDescription="Find Teslo's best products here"
    >
      <HomeScene products={products || []} isLoading={isLoading} />
    </ShopLayout>
  );
};

export default MenCategoryPage;
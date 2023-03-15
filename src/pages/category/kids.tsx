import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { HomeScene } from '@/teslo-shop';

const KidsCategoryPage = () => {
  const { products, error, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title="Children's product category"
      pageDescription="Find Teslo's best products here"
    >
      <HomeScene products={products || []} isLoading={isLoading} />
    </ShopLayout>
  );
};

export default KidsCategoryPage;

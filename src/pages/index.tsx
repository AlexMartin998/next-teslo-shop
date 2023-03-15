import { ShopLayout } from '@/layouts';
import { useProducts } from '@/shared/hooks';
import { HomeScene } from '@/teslo-shop';

export default function HomePage() {
  const { products, error, isLoading } = useProducts('/products');

  // console.log(data);

  return (
    <ShopLayout
      title="TesloShop - Spend less. Smile more."
      pageDescription="Find Teslo's best products here"
    >
      <HomeScene products={products} isLoading={isLoading} />
    </ShopLayout>
  );
}

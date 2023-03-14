import { ShopLayout } from '@/layouts';
import { HomeScene } from '@/teslo-shop';

export default function HomePage() {
  return (
    <ShopLayout
      title="Teslo-Shop | Home"
      pageDescription="Find Teslo's best products here"
    >
      <HomeScene />
    </ShopLayout>
  );
}

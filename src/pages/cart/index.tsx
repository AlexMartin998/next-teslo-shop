import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useCart } from '@/context';
import { ShopLayout } from '@/layouts';
import { CartScene } from '@/teslo-shop';

const CartPage = () => {
  const { cart, isMounted: isCartLoaded } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isCartLoaded && !cart.length) router.replace('/cart/empty');
  }, [cart.length, isCartLoaded, router]);

  return (
    <ShopLayout
      title="Shopping Cart"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      {isCartLoaded && cart.length > 0 && <CartScene />}
    </ShopLayout>
  );
};

export default CartPage;

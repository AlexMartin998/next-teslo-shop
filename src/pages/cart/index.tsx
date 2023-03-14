import { ShopLayout } from '@/layouts';
import { CartScene } from '@/teslo-shop/scenes/CartScene';

const CartPage = () => {
  return (
    <ShopLayout
      title="Shopping Cart"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      <CartScene />
    </ShopLayout>
  );
};

export default CartPage;

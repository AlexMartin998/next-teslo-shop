import { ShopLayout } from '@/layouts';
import { Typography } from '@mui/material';

export default function HomePage() {
  return (
    <ShopLayout
      title="Teslo-Shop | Home"
      pageDescription="Find Teslo's best products here"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>
    </ShopLayout>
  );
}

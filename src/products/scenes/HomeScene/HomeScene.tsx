import { Typography } from '@mui/material';

import { initialData } from '@/database/products';
import { ProductList } from './components';

interface HomeSceneProps {}

const HomeScene: React.FC<HomeSceneProps> = () => {
  return (
    <>
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>

      <ProductList products={initialData.products as any} />
    </>
  );
};

export default HomeScene;

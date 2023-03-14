import { FullScreenLoading } from '@/shared/components';
import { Typography } from '@mui/material';

import { ProductList } from './components';

interface HomeSceneProps {
  products: any;
  error?: any;
  isLoading: boolean;
}

const HomeScene: React.FC<HomeSceneProps> = ({ products, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Typography variant="h1" component="h1">
            Shop
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            All products
          </Typography>

          <ProductList products={products} />
        </>
      )}
    </>
  );
};

export default HomeScene;

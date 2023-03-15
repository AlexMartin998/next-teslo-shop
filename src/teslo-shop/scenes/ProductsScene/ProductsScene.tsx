import { Box } from '@mui/material';

import { ProductList } from './components';
import { FullScreenLoading } from '@/shared/components';
import { IProduct } from '@/interfaces';

export interface ProductsSceneProps {
  children?: React.ReactNode;
  products: IProduct[];
  isLoading?: boolean;
}

const ProductsScene: React.FC<ProductsSceneProps> = ({
  children,
  products,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ pt: 1, pb: 3 }}
          >
            {children}
          </Box>

          <ProductList products={products} />
        </>
      )}
    </>
  );
};

export default ProductsScene;

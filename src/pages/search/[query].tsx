import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { dbProducts } from '@/api/db';
import { ShopLayout } from '@/layouts';
import { ProductsScene } from '@/teslo-shop';
import { IProduct } from '@/interfaces';

interface SearchPageProps {
  products: IProduct[];
  productsFound: boolean;
  query: string;
}

const SearchPage: NextPage<SearchPageProps> = ({
  products,
  productsFound,
  query,
}) => {
  return (
    <ShopLayout
      title="TesloShop - Spend less. Smile more."
      pageDescription="Find Teslo's best products here"
    >
      <ProductsScene products={products}>
        <Typography variant="h1" component="h1">
          Results
        </Typography>

        {productsFound ? (
          <Typography variant="h2" sx={{ my: 1 }}>
            All results for “{query}”
          </Typography>
        ) : (
          <Box>
            <Typography variant="h2" fontWeight={600} my={2}>
              Sorry, we couldn&apos;t find any results for{' '}
              <q style={{ color: '#3A64D8', marginLeft: 3 }}>{query}</q>
            </Typography>
          </Box>
        )}
      </ProductsScene>
    </ShopLayout>
  );
};

/* 



*/

// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };
  // x si, no quiero q se indexe /search, sino /search/term
  if (!query)
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };

  // x si no hay resultados para el term
  let products = await dbProducts.getProductsByTerm(query);
  const productsFound = !!products.length;

  // return related products
  if (!productsFound) {
    // products = await dbProducts.getProducts();

    // podemos leer de cookies consultas validas q haya hecho antes
    products = await dbProducts.getProductsByTerm('cybertruck');
  }

  return {
    props: { products, productsFound, query },
  };
};

export default SearchPage;

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import 'react-slideshow-image/dist/styles.css';

import { dbProducts } from '@/api/db';
import { ShopLayout } from '@/layouts';
import { ProductScene } from '@/teslo-shop';
import { IProduct } from '@/interfaces';

interface ProductPageProps {
  product: IProduct;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  // // // Fetch de la data en Run Time / Req Time - Requiere 1 Loading - NO tiene SEO
  // // Perdemos SEO xq al inicio NO tiene info de title, desc ni NADA, lo unico q verian seria el Loader
  // const { query } = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${query.slug}`);

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <ProductScene product={product} />
    </ShopLayout>
  );
};

/* 




*/

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async ctx => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug }, // [slug].tsx
    })),

    // genera la page en runtime y la almacena en filesystem (new products after build time)
    fallback: 'blocking', // ISG
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        // if it don't exist, redirect to /
        destination: '/',

        // this page could be exist in the future and it would be indexed
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },

    // ISR
    revalidate: 86400, // c/24h - in seconds  (60*60*24)
  };
};

export default ProductPage;

/* 

  * SSR:  getServerSideProps()   <--  NOOO usar para Productos, ya q queremos el comportamiento de Udemy. Tiene contenido Estatico q lo Revalida c/24h (alumnos, calificaciones, title) y q hace fetch en req time unicamente de la data q cambia constantemente como el price


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);
  if (!product)
    return {
      redirect: {
        destination: '/',

        // page exist, allow indexing by google bots
        permanent: false,
      },
    };

  // TODO: meta tag de la imagen

  return {
    props: { product },
  };
};


 */

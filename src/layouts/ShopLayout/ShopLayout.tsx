import Head from 'next/head';

import { Navbar, SideMenu } from '@/shared/components';

export interface ShopLayoutProps {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;

  children: React.ReactNode;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{`${title} | TesloShop`}</title>

        <meta name="description" content={pageDescription} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}

        <meta name="keywords" content="openjira, tasks, todos, manage" />
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}
      >
        {children}
      </main>

      <footer>
        {/*  */}
        {/*  */}
      </footer>
    </>
  );
};

export default ShopLayout;

import { useEffect } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import { ShopLayout } from '@/layouts';
import { useCart } from '@/context';

const EmptyPage: NextPage = () => {
  const { cart, isMounted: isCartLoaded } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isCartLoaded && cart.length) router.replace('/cart');
  }, [cart.length, isCartLoaded, router]);

  return (
    <ShopLayout
      title="Empty Shopping Cart"
      pageDescription="Your cart is empty. Keep shopping to find a course!"
    >
      {isCartLoaded && !cart.length && (
        <Box
          display="flex"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Typography ml={2}>
              Your cart is empty. Keep shopping to find a course!
            </Typography>

            <NextLink href="/">
              <Button variant="contained" color="primary">
                Keep Shopping
              </Button>
            </NextLink>
          </Box>
        </Box>
      )}
    </ShopLayout>
  );
};

export default EmptyPage;

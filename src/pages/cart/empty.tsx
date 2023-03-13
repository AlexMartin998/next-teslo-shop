import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import { ShopLayout } from '@/layouts';

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title="Empty Shopping Cart"
      pageDescription="Your cart is empty. Keep shopping to find a course!"
    >
      <Box
        display="flex"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />

        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
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
    </ShopLayout>
  );
};

export default EmptyPage;

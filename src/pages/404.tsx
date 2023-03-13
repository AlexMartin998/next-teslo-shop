import { ShopLayout } from '@/layouts';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found | 404" pageDescription="Nothing to show">
      <Box
        display="flex"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography variant="h1" component="h1" fontSize={81} fontWeight={200}>
          404 |
        </Typography>

        <Typography ml={2}>This page could not be found.</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;

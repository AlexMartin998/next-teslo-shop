import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link component="span" display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}> */}
        {!isMobile && (
          <Box>
            <NextLink href="/category/men" passHref>
              <Button>Men</Button>
            </NextLink>
            <NextLink href="/category/men" passHref>
              <Button>Women</Button>
            </NextLink>
            <NextLink href="/category/men" passHref>
              <Button>Kids</Button>
            </NextLink>
          </Box>
        )}

        <Box flex={1} />

        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href="/cart">
          <Link component="span">
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

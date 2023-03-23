import NextLink from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useUi } from '@/context';

export interface NavbarProps {}

const AdminNavbar: React.FC<NavbarProps> = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { toggleMenu } = useUi();

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

        <Button onClick={toggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;

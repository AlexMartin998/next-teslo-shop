import { useState } from 'react';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useCart, useUi } from '@/context';
import { useNavigateTo } from '@/shared/hooks';
import { navLinks } from './navLinks';
import NavLink from './NavLink/NavLink';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { toggleMenu } = useUi();
  const { orderSummary } = useCart();
  const { navigateToPath } = useNavigateTo();
  const numberOfItems = orderSummary?.numberOfItems;

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;
    navigateToPath(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisible
              ? { xs: 'none', md: 'block' }
              : { xs: 'none', sm: 'block' },
          }}
        >
          <Box>
            {navLinks.map(navLink => (
              <NavLink key={navLink.path} {...navLink} />
            ))}
          </Box>
        </Box>

        <Box flex={1} />

        {!isMobile && (
          <>
            {isSearchVisible ? (
              <Input
                autoFocus
                type="text"
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                className="fadeIn"
                //
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && onSearchTerm()}
                sx={{ zIndex: '999' }}
              />
            ) : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                // className="fadeIn"
              >
                <SearchOutlinedIcon />
              </IconButton>
            )}
          </>
        )}

        {/* mobile */}
        {isMobile && (
          <IconButton onClick={toggleMenu}>
            <SearchOutlinedIcon />
          </IconButton>
        )}

        <NextLink href="/cart">
          <Link component="span">
            <IconButton>
              <Badge badgeContent={numberOfItems} max={9} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

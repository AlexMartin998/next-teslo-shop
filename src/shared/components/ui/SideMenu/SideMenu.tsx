import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useMediaQuery,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

import { useAuth, useUi } from '@/context';
import { adminNavLinks, categoriesNavLinks, privateNavLinks } from './navLinks';
import NavLinksList from './NavLinkList/NavLinksList';

export interface SideMenuProps {}

interface SMState {
  searchInput: string;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { isMenuOpen, toggleMenu } = useUi();
  const { user, isLoggedIn, logOut } = useAuth();
  const { push: routerPush, asPath: routerAsPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState<SMState['searchInput']>('');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;

    routerPush(`/search/${searchTerm}`);
    toggleMenu();
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleMenu}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onSearchTerm}
                  >
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
              //
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyUp={e => e.key === 'Enter' && onSearchTerm()}
            />
          </ListItem>

          {/* Private */}
          {isLoggedIn &&
            privateNavLinks.map(navLink => (
              <NavLinksList key={navLink.path} {...navLink} />
            ))}

          {/* Public */}
          {isMobile &&
            categoriesNavLinks.map(navLink => (
              <NavLinksList key={navLink.path} {...navLink} />
            ))}

          {!isLoggedIn && (
            <NavLinksList
              key={'/auth/login'}
              path={`/auth/login?p=${routerAsPath}`}
              Icon={VpnKeyOutlinedIcon}
              title="Login"
            />
          )}

          {isLoggedIn && (
            <ListItem disablePadding onClick={logOut}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </ListItemButton>
            </ListItem>
          )}

          {/* Admin */}
          {isLoggedIn && user?.role === 'admin' && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>
              {adminNavLinks.map(navLink => (
                <NavLinksList key={navLink.path} {...navLink} />
              ))}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;

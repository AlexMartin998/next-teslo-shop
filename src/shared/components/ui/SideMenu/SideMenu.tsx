import { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { useUi } from '@/context';
import { useNavigateTo } from '@/shared/hooks';
import { adminNavLinks, navLinks } from './navLinks';
import NavLinksList from './NavLinkList/NavLinksList';

export interface SideMenuProps {}

interface SMState {
  searchInput: string;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { isMenuOpen, toggleMenu } = useUi();
  const { navigateToPath } = useNavigateTo();
  const [searchTerm, setSearchTerm] = useState<SMState['searchInput']>('');

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;

    navigateToPath(`/search/${searchTerm}`);
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

          {/* Public */}
          {navLinks.map(navLink => (
            <NavLinksList key={navLink.path} {...navLink} />
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>
          {adminNavLinks.map(navLink => (
            <NavLinksList key={navLink.path} {...navLink} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;

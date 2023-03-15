import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  capitalize,
} from '@mui/material';

import { NavLinks } from '../navLinks';
import NextLink from 'next/link';
import { useUi } from '@/context';

export interface NavLinksListProps extends NavLinks {}

const NavLinksList: React.FC<NavLinksListProps> = ({ path, title, Icon }) => {
  const { toggleMenu } = useUi();

  return (
    <NextLink href={path} onClick={toggleMenu} style={{ color: 'inherit' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText>{capitalize(title)}</ListItemText>
        </ListItemButton>
      </ListItem>
    </NextLink>
  );
};

export default NavLinksList;

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  capitalize,
} from '@mui/material';
import { NavLinks } from '../navLinks';

export interface NavLinksListProps extends NavLinks {}

const NavLinksList: React.FC<NavLinksListProps> = ({ path, title, Icon }) => {
  return (
    <ListItem key={path} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>{capitalize(title)}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default NavLinksList;

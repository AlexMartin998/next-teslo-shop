import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export interface NavLinks {
  path: any;
  title: string;
  Icon: any;
}

type NavLinksId = 'home' | 'features' | 'product' | 'clients' | '/';

export const navLinks: NavLinks[] = [
  {
    path: '/profile',
    title: 'profile',
    Icon: AccountCircleOutlinedIcon,
  },
  {
    path: '/my-purchase-orders',
    title: 'My purchase orders',
    Icon: ConfirmationNumberOutlinedIcon,
  },
  {
    path: 'men',
    title: 'men',
    Icon: MaleOutlinedIcon,
  },
  {
    path: 'women',
    title: 'women',
    Icon: FemaleOutlinedIcon,
  },
  {
    path: 'kids',
    title: 'kids',
    Icon: EscalatorWarningOutlinedIcon,
  },
  {
    path: 'login',
    title: 'log In',
    Icon: VpnKeyOutlinedIcon,
  },
  {
    path: 'logout',
    title: 'log Out',
    Icon: LoginOutlinedIcon,
  },
];

export const adminNavLinks: NavLinks[] = [
  {
    path: 'products',
    title: 'products',
    Icon: CategoryOutlinedIcon,
  },
  {
    path: 'orders',
    title: 'Purchase orders',
    Icon: ConfirmationNumberOutlinedIcon,
  },
  {
    path: 'users',
    title: 'users',
    Icon: AdminPanelSettingsOutlinedIcon,
  },
];

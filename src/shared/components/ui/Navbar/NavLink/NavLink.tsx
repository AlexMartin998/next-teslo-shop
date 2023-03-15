import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button } from '@mui/material';

import styles from './styles/NavLink.module.css';

export interface NavLinkProps {
  path: string;
  title: string;
}

const NavLink: React.FC<NavLinkProps> = ({ path, title }) => {
  const { asPath } = useRouter();

  return (
    <NextLink key={path} href={path} passHref>
      <Button className={asPath === path ? styles.navlink : ''}>{title}</Button>
    </NextLink>
  );
};

export default NavLink;

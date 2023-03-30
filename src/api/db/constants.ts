import { ValidRoles } from '@/interfaces';

interface AuthConstants {
  validRoles: ValidRoles[];
}

export const SHOP_CONSTANTS = {
  validGenders: ['men', 'women', 'kid', 'unisex'],
};

export const AUTH_CONSTANS: AuthConstants = {
  validRoles: [ValidRoles.admin, ValidRoles.client, ValidRoles.superUser],
};

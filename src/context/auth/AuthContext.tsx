import { createContext } from 'react';

import { IUser } from '@/interfaces';

interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  login: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps);

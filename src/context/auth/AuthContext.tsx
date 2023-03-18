import { createContext } from 'react';

import { IUser } from '@/interfaces';
import { RegisterReturn } from '../';

interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  login: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<RegisterReturn>;
  logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

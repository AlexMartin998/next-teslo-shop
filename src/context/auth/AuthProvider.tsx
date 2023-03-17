import { useReducer } from 'react';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const Auth_INIT_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INIT_STATE);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

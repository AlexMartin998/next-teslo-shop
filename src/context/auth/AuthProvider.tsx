import { useReducer } from 'react';
import Cookies from 'js-cookie';

import { AuthActionType, AuthContext, authReducer } from './';
import { tesloApi } from '@/api/axios-client';
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const {
        data: { token, user },
      } = await tesloApi.post('/user/login', { email, password });

      Cookies.set('token', token);
      dispatch({ type: AuthActionType.login, payload: user });

      return true;
    } catch (error) {
      //
      dispatch({ type: AuthActionType.logout });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // methods
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

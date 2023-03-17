import { AuthState } from './';
import { IUser } from '@/interfaces';

type AuthAction =
  | { type: AuthActionType.login; payload: IUser }
  | { type: AuthActionType.logout };

export enum AuthActionType {
  login = '[Auth] - Log In',
  logout = '[Auth] - Log Out',
}

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.login:
      return { ...state, isLoggedIn: true, user: action.payload };

    case AuthActionType.logout:
      return { ...state, isLoggedIn: false, user: undefined };

    default:
      return state;
  }
};

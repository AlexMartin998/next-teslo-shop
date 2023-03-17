import { AuthState } from './';
import { IUser } from '@/interfaces';

type AuthAction =
  | { type: AuthActionType.onLogin; payload: IUser }
  | { type: AuthActionType.onLogout };

export enum AuthActionType {
  onLogin = '[Auth] - Log In',
  onLogout = '[Auth] - Log Out',
}

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.onLogin:
      return { ...state, isLoggedIn: true, user: action.payload };

    case AuthActionType.onLogout:
      return { ...state, isLoggedIn: false, user: undefined };

    default:
      return state;
  }
};

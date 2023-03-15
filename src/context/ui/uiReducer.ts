import { UIState } from './';

type UIAction = { type: UIActionType.toggleMenu };

export enum UIActionType {
  toggleMenu = '[UI] - Toggle menu',
}

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UIActionType.toggleMenu:
      return { ...state, isMenuOpen: !state.isMenuOpen };

    default:
      return state;
  }
};

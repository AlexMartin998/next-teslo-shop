import { createContext } from 'react';

interface UIContextProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const UIContext = createContext({} as UIContextProps);

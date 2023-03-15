import { useReducer } from 'react';
import { UIActionType, UIContext, uiReducer } from '.';

export interface UIState {
  isMenuOpen: boolean;
}

interface UiProviderProps {
  children: React.ReactNode;
}

const UI_INIT_STATE: UIState = {
  isMenuOpen: false,
};

export const UIProvider = ({ children }: UiProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INIT_STATE);

  const toggleMenu = () => {
    dispatch({ type: UIActionType.toggleMenu });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // methods
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

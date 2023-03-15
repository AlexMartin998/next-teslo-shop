import { useContext } from 'react';

import { UIContext } from '../ui';

export const useUi = () => useContext(UIContext);

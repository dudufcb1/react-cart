//Imports
import { createContext, useContext } from 'react';

//New context instance
const AppContext = createContext(null);

//Context data
export const ProviderName = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

//Create hook
export const useHookName = () => {
  return useContext(AppContext);
};

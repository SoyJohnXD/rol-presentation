/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
export type IAppContext = {
  userData: any;
};
export const AppContext = createContext<IAppContext>({
  userData: {},
});

export const useAppContext = () => useContext(AppContext);

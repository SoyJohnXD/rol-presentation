import React, { useEffect, useState } from "react";
import { AppContext as AppContextProvider } from ".";

interface IContexProvider {
  children: React.ReactNode;
}
const AppContext: React.FC<IContexProvider> = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}");
      setUserData(user);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AppContextProvider.Provider value={{ userData }}>
      {children}
    </AppContextProvider.Provider>
  );
};

export default AppContext;

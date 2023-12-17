import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("activeTheme") || "default"
  );
  const [user, setUserr] = useState("");
  const setUser = (user) => {
    localStorage.setItem("user", user);
    setUserr(user);
  };

  const getUser = () => {
    return localStorage.getItem("user");
  };

  const value = {
    activeTheme,
    setActiveTheme,
    user,
    setUser,
    getUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

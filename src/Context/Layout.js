import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const useLayout = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const [collapsePinned, setCollapsePinned] = useState(true);
  const value = {
    collapse,
    setCollapse,
    collapsePinned,
    setCollapsePinned,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

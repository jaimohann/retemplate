import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("activeTheme") || "default"
  );
  const [user, setUserr] = useState("");

  const setUser = ({ user, token }) => {
    localStorage.setItem("user", user);
    localStorage.setItem("x-access-token", token);
    setUserr(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("x-access-token");
    setUserr("");
  };

  useEffect(() => {
    setUserr(localStorage.getItem("user"));
  }, [user]);

  const getUser = () => {
    return localStorage.getItem("user");
  };

  const privateRequest = async (url, options) => {
    var reqHeaders = new Headers();
    reqHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("x-access-token")}`
    );
    reqHeaders.append("Content-Type", "application/json");

    options.headers = reqHeaders;

    var requestOptions = options;

    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  const publicRequest = async (url, options) => {
    var reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    options.headers = reqHeaders;
    var requestOptions = options;

    const response = await fetch(
      url,
      requestOptions
      //`https://gitlab.ilearningengines.com/api/v4/issues?access_token=sadSHeYSU97P336tx3L8&scope=all&page=${currentPage}&per_page=${itemsPerPage}`,
    );

    return await response.json();
  };

  const value = {
    activeTheme,
    setActiveTheme,
    user,
    setUser,
    getUser,
    privateRequest,
    publicRequest,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

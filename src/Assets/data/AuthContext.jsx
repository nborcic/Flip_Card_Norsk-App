import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    //console.log("Current token state", localStorage.getItem("token"));
    return localStorage.getItem("token") !== null;
  });

  const login = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    return;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

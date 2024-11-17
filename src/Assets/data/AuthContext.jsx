// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    console.log("current token state", localStorage.getItem("token"));

    return localStorage.getItem("token") !== null;
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    console.log("current token state", localStorage.getItem("token"));

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("current token state", localStorage.getItem("token"));
    
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

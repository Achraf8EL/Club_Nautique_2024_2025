import React, { createContext, useState, useContext } from "react";

// Créer un contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("clientToken"));

  const login = (token) => {
    localStorage.setItem("clientToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("clientToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

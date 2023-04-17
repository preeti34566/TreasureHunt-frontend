import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [playerId, setPlayerId] = useState("");

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, playerId, setPlayerId}}>
      {children}
    </AuthContext.Provider>
  );
};
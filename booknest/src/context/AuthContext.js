import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  // Function to save the token to localStorage and update state
  const saveToken = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  // Function to remove the token from localStorage and update state
  const removeToken = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  // Provide the context value to child components
  return (
    <AuthContext.Provider value={{ authToken, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to auth context
export const useAuth = () => useContext(AuthContext);

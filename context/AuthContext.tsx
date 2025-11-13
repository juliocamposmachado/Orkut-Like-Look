import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getLoggedInUser, setLoggedInUser as saveUser, logoutUser as removeUser, getUserByEmail, addUser } from '../services/storageService';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'friendIds'>) => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    const user = getUserByEmail(email);
    if (user && user.password === pass) {
      setCurrentUser(user);
      saveUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    removeUser();
  };

  const register = (userData: Omit<User, 'id' | 'friendIds'>): User | null => {
      const existingUser = getUserByEmail(userData.email);
      if(existingUser) {
          alert("Email already registered!");
          return null;
      }
      // FIX: The `addUser` function expects a `friendIds` property. A new user should have an empty friends list.
      const newUser = addUser({ ...userData, friendIds: [] });
      setCurrentUser(newUser);
      saveUser(newUser);
      return newUser;
  }

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
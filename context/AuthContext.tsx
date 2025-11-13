import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getLoggedInUser, setLoggedInUser as saveUser, logoutUser as removeUser, getUserByEmail, addUser } from '../services/storageService';

interface GoogleDecodedUser {
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'friendIds'>) => User | null;
  loginWithGoogle: (googleUser: GoogleDecodedUser) => void;
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
      const newUser = addUser({ ...userData, friendIds: [] });
      setCurrentUser(newUser);
      saveUser(newUser);
      return newUser;
  }

  const loginWithGoogle = (googleUser: GoogleDecodedUser) => {
    let user = getUserByEmail(googleUser.email);

    if (!user) {
        // If user doesn't exist, create one without a password
        user = addUser({
            name: googleUser.name,
            email: googleUser.email,
            password: '',
            avatar: googleUser.picture,
            profile: { bio: 'Novo usuário do Orkut Nostalgia!', interests: [], music: [], movies: [] },
            friendIds: [],
        });
    }

    // Now, whether the user existed or was just created, log them in.
    setCurrentUser(user);
    saveUser(user);
  };


  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, register, loginWithGoogle }}>
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
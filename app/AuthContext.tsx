import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Restore session on app start
    SecureStore.getItemAsync('mock_session').then(value => {
      if (value === 'true') {
        setIsSignedIn(true);
      }
    });
  }, []);

  const signIn = async () => {
    await SecureStore.setItemAsync('mock_session', 'true');
    setIsSignedIn(true);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('mock_session');
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useMockAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useMockAuth must be used inside AuthProvider');
  return ctx;
};

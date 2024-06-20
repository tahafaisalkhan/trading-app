import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode; 
}

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

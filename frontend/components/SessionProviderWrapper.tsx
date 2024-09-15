'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      if (status == 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch(`${apiUrl}/api/users/me?email=${session.user.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await response.json();
          setUser(data);
          console.log('User data:', data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [session]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const SessionProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
};

export default SessionProviderWrapper;

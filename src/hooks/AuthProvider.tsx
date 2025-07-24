'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  loggedIn: boolean;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  isLoggedIn: boolean; // Prop to control the auth state
}

export const ClientAuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isLoggedIn,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          console.warn('isLoggedIn is true, but no user data found in localStorage.');
          setUserData(null);
        }
      } else {
        localStorage.removeItem('userData');
        setUserData(null);
      }
    } catch (error) {
      console.error('Failed to process auth state:', error);
      localStorage.removeItem('userData');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const contextValue = {
    loggedIn: isLoggedIn,
    userData,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useClientAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
};

// --- How to use it ---

// /app/components/AuthWrapper.tsx
// A wrapper component that combines server-side session check with the client-side provider.
/*
import { isLoggedIn } from '@/lib/session'; // Your cached server-side function
import { ClientAuthProvider } from '@/lib/ClientAuthContext';

export default async function AuthWrapper({
    children
}: {
    children: React.ReactNode
}) {
    // 1. Check session on the server
    const serverIsLoggedIn = await isLoggedIn();

    // 2. Pass the result as a prop to the client-side provider
    return (
        <ClientAuthProvider isLoggedIn={serverIsLoggedIn}>
            {children}
        </ClientAuthProvider>
    )
}
*/

// /app/layout.tsx
// Then use this wrapper in your layout.
/*
import AuthWrapper from '@/app/components/AuthWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
            {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
*/

// /app/components/UserProfileHeader.tsx
// An example of a client component consuming the context.
/*
'use client';

import { useClientAuth } from '@/lib/ClientAuthContext';

export default function UserProfileHeader() {
  const { loggedIn, userData, loading } = useClientAuth();

  if (loading) {
    return <div>Loading user...</div>;
  }

  return (
    <header>
      {loggedIn && userData ? (
        <p>Welcome back, {userData.username}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </header>
  );
}
*/


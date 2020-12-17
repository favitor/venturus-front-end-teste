import React, { createContext, useCallback, useState, useContext } from 'react';

/**
 * Here we have a hook containing the global state of auth from a user. The methods
 * SignIn and SignOut are here.
 *
 * In the global state constant 'data' is stored the data from the user.
 */

interface SignInCredentials {
  rawName: string;
}

interface AuthContextData {
  user: User | null;
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
}

interface User {
  name: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const name = localStorage.getItem('@VenturusTest:name');
    const firstName = localStorage.getItem('@VenturusTest:firstName');
    const lastName = localStorage.getItem('@VenturusTest:lastName');

    if (name && firstName && lastName) {
      return { name, firstName, lastName };
    }

    return null;
  });

  const signIn = useCallback(({ rawName }) => {
    const name = rawName.toUpperCase();
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').splice(-1)[0];

    localStorage.setItem('@VenturusTest:name', name);
    localStorage.setItem('@VenturusTest:firstName', firstName);
    localStorage.setItem('@VenturusTest:lastName', lastName);

    setData({ name, firstName, lastName });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@VenturusTest:name');
    localStorage.removeItem('@VenturusTest:firstName');
    localStorage.removeItem('@VenturusTest:secondName');
    localStorage.removeItem('@VenturusTest:Teams');
    localStorage.removeItem('@VenturusTest:mostPickedInitials');
    localStorage.removeItem('@VenturusTest:lessPickedInitials');
    localStorage.removeItem('@VenturusTest:mostPickedPlayerInfo');
    localStorage.removeItem('@VenturusTest:lessPickedPlayerInfo');
    localStorage.removeItem('@VenturusTest:HighestAvgAge');
    localStorage.removeItem('@VenturusTest:LowestAvgAge');
    localStorage.removeItem('@VenturusTest:HighestAvgAge');
    localStorage.removeItem('@VenturusTest:LowestAvgAge');

    setData(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

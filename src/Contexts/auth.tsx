import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { User } from 'firebase';

import { auth } from '../firebase';

interface AuthState {
  user: User;
  displayName: string;
  firstName: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends SignInCredentials {
  name: string;
}

interface AuthContextData {
  user?: User;
  displayName: string;
  firstName: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
}

const initialState = {
  displayName: 'Guest',
  firstName: 'Guest',
} as AuthState;

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    return initialState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    console.log('signIn');
    await auth.signInWithEmailAndPassword(email, password);
  }, []);

  const signOut = useCallback(async () => {
    console.log('signOut');
    await auth.signOut();
    setData(initialState);
  }, []);

  const parseDisplayNameAndFirstName = useCallback((name): {
    displayName: string;
    firstName: string;
  } => {
    let displayName = name;
    let firstName = displayName;
    if (displayName) {
      firstName = displayName?.split(' ')[0] || 'User';
    } else {
      displayName = 'User';
      firstName = displayName;
    }

    return { displayName, firstName };
  }, []);

  const signUp = useCallback(
    async ({ email, password, name }) => {
      console.log('signUp');
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({ displayName: name });
      const { displayName, firstName } = parseDisplayNameAndFirstName(
        auth.currentUser?.displayName,
      );
      setData(currentData => ({ ...currentData, displayName, firstName }));
    },
    [parseDisplayNameAndFirstName],
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log('USER >>>', authUser);

      if (authUser) {
        const { displayName, firstName } = parseDisplayNameAndFirstName(
          authUser.displayName,
        );
        setData({ user: authUser, displayName, firstName });
      } else {
        setData(initialState);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [parseDisplayNameAndFirstName]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        displayName: data.displayName,
        firstName: data.firstName,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

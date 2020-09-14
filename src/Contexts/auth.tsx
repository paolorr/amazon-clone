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
}

interface SignInCredentials {
  email: string;
  password: string;
}

type SignUpCredentials = SignInCredentials;

interface AuthContextData {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
}

const initialState = {} as AuthState;

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

  const signUp = useCallback(async ({ email, password }) => {
    console.log('signUp');
    await auth.createUserWithEmailAndPassword(email, password);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log('USER >>>', authUser);

      if (authUser) {
        setData({ user: authUser });
      } else {
        setData(initialState);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp }}>
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

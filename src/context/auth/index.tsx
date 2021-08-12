import React, { useState, createContext } from 'react';
import firebase from 'firebase';

interface Auth {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  loading: boolean;
  error: string | null;
  user: firebase.auth.UserCredential | void;
}

export const AuthContext = createContext<Auth>({} as Auth);

export function AuthProivder({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const [user, setUser] = useState<firebase.auth.UserCredential | void>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const firebaseUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(firebaseError => {
        setError(firebaseError);
      });
    setUser(firebaseUser);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setUser();
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

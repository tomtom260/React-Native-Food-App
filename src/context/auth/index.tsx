import React, { useState, createContext } from 'react';
import firebase from 'firebase';

interface Auth {
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, passwordConfirm: string) => void;
  signOut: () => void;
  loading: boolean;
  error: string | null;
  user: firebase.User | null;
}

export const AuthContext = createContext<Auth>({} as Auth);

export function AuthProivder({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = (email: string, password: string) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(usr => {
        setUser(usr.user);
      })
      .catch((firebaseError: firebase.auth.Error) => {
        setError(firebaseError.message);
      })
      .finally(() => setLoading(false));
  };

  const signUp = (email: string, password: string, passwordConfirm: string) => {
    setLoading(true);
    if (passwordConfirm !== password) {
      setError('Passwords do not match');
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(usr => {
        setUser(usr.user);
      })
      .catch((firebaseError: firebase.auth.Error) => {
        setError(firebaseError.message);
      })
      .finally(() => setLoading(false));
  };

  const signOut = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  firebase.auth().onAuthStateChanged(
    usr => {
      if (usr) setUser(usr);
      setLoading(false);
    },
    err => {
      setError(err.message);
      setLoading(false);
    }
  );

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, user, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signOut,
} from '@firebase/auth';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentUsername, setCurrentUsername] = useState('');
  const [isloading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        setCurrentUsername(user.displayName);
        setLoading(false);
      } else {
        setCurrentUser('');
        setCurrentUsername('');
        setLoading(false);
      }
    });

    return () => unsub();
  }, [auth]);

  const signIn = (email, password) => {
    setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const setUsername = (value) => {
    setCurrentUsername(value);
  };

  const value = {
    signIn,
    signUp,
    logout,
    setUsername,
    currentUser,
    currentUsername,
    isloading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };

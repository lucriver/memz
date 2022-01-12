import React, { useEffect, useState, useContext } from "react";
import Firebase from "../config/firebase";

//Create the context
const AuthContext = React.createContext<any>(undefined);

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

//Have to declare the type of the children of the context
interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string) {
    return Firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  function signin(email: string, password: string) {
    return Firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return Firebase.auth().signOut();
  }

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: any = {
    currentUser,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

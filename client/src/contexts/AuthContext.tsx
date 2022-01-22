import React, { useEffect, useState, useContext } from "react";
import { User as firebaseUser } from "@firebase/auth-types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "../config/firebase";

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
  const [currentUser, setCurrentUser] = useState<firebaseUser | null>();
  const [loading, setLoading] = useState<boolean>(true);

  async function signup(email: string, password: string): Promise<any> {
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email: string, password: string): Promise<any> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout(): Promise<void> {
    const auth = getAuth();
    return signOut(auth);
  }

  function resetPassword(email: string): Promise<any> {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }

  function deleteCreds(): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    return deleteUser(user!);
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
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
    deleteCreds,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

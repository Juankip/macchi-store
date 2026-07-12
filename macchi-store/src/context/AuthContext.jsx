import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./auth-context";

const adminEmails = [
  "admin@macchistore.com",
  "admin@example.com"
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(
        !!currentUser?.email && adminEmails.includes(currentUser.email.toLowerCase())
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

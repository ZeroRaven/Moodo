import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebaseConfig";
import { useFireStore } from "./FirestoreProvider";
//moodo.customerservice@gmail.com

const provider = new GoogleAuthProvider();
const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { addUserInfoToFirestore } = useFireStore();


  useEffect(() => {
    const loginCheck = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user);

            setUser(user);
            navigate("/");
            setIsLoadingUser(false);
          } else {
            console.log("user not here");
            setIsLoadingUser(false);
          }
        });
      } catch (err) {
        setIsLoadingUser(false);
      }
    };
    setIsLoadingUser(true);
    loginCheck();
  }, []);

  const register = async (body) => {
    setIsLoadingUser(true);
    const userCred = await createUserWithEmailAndPassword(
      auth,
      body["email"],
      body["password"]
    );
    await addUserInfoToFirestore(userCred.user.uid, {
      email: body["email"],
      name: body["name"],
    });
    await updateProfile(auth.currentUser, {
      displayName: body["name"],
    });
    setUser(userCred.user);
    navigate("/");
    setIsLoadingUser(false);
  };

  const login = async (email, password) => {
    setIsLoadingUser(true);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCred.user);
    navigate("/");
    setIsLoadingUser(false);
  };

  const loginWithGoogle = async () => {
    setIsLoadingUser(true);
    debugger;
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      navigate("/");
      console.log(token);
      setIsLoadingUser(false);
    } catch {
      setIsLoadingUser(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loginWithGoogle,
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

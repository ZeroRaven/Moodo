import { auth, db } from "../firebaseConfig";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const FireStoreContext = createContext({});
export const useFireStore = () => {
  return useContext(FireStoreContext);
};

export const FireStoreProvider = ({ children }) => {
  const addUserInfoToFirestore = async (userId, userInfo) => {
    try {
      const userDoc = doc(db, `users/${userId}`);
      await setDoc(userDoc, userInfo);
      console.log("the data has been written in db");
    } catch (err) {
      console.log(err);
    }
  };
  const addMoodInfoToFirestore = async ( moodInfo) => {
    try {
      const moodCollection = collection(db, `moods`);
      return await addDoc(moodCollection, moodInfo);

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FireStoreContext.Provider
      value={{ addUserInfoToFirestore, addMoodInfoToFirestore }}
    >
      {children}
    </FireStoreContext.Provider>
  );
};

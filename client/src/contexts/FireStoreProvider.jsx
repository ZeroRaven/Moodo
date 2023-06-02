import { auth, db } from "../firebaseConfig";
import { setDoc, doc, collection, addDoc, query, limit, orderBy, getDocs, where } from "firebase/firestore";
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

  const queryForMoodInfo = async(userId) => {
    const today = new Date()
    const sevenDaysAgo = new Date()

    sevenDaysAgo.setDate(today.getDate() -6)
    const moodQuery = query(
      collection(db, 'moods'),
      where('userId', '==', `${userId}`),
      where('date', '>=', sevenDaysAgo ),
      where('date', '<=', today),
      orderBy('date')
      )
      const querySnapshot = await getDocs(moodQuery)
      return querySnapshot
  }
  return (
    <FireStoreContext.Provider
      value={{ addUserInfoToFirestore, addMoodInfoToFirestore, queryForMoodInfo }}
    >
      {children}
    </FireStoreContext.Provider>
  );
};

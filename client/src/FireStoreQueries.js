import { db } from "./firebaseConfig";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const addUserInfoToFirestore = async (userId, userInfo) => {
  try {
    const userDoc = doc(db, `users/${userId}`);
    await setDoc(userDoc, userInfo);
    console.log("the data has been written in db");
  } catch (err) {
    console.log(err);
  }
};
export const addMoodInfoToFirestore = async (moodInfo) => {
  try {
    const moodCollection = collection(db, `moods`);
    return await addDoc(moodCollection, moodInfo);
  } catch (err) {
    console.log(err);
  }
};

export const queryForMoodInfo = async (userId) => {
  const today = new Date();
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(today.getDate() - 6);
  const moodQuery = query(
    collection(db, "moods"),
    where("userId", "==", `${userId}`),
    where("date", ">=", sevenDaysAgo),
    where("date", "<=", today),
    orderBy("date")
  );
  try {
    const querySnapshot = await getDocs(moodQuery);
    return querySnapshot;
  } catch (err) {
    console.log(err);
  }
};

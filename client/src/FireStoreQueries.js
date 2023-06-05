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

export const addUserInfoToFirestore = async (userId, userInfo) => {
  try {
    const userDoc = doc(db, `users/${userId}`);
    await setDoc(userDoc, userInfo);
  } catch (err) {
    console.error(err);
  }
};
export const addMoodInfoToFirestore = async (moodInfo) => {
  try {
    const moodCollection = collection(db, `moods`);
    return await addDoc(moodCollection, moodInfo);
  } catch (err) {
    console.error(err);
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
    console.error(err);
  }
};


export const addTipsInfoToFirestore = async(tipsInfo) => {
  try {
    const tipsCollection = collection(db, `tips`);
    return await addDoc(tipsCollection, tipsInfo);
  } catch (err) {
    console.error(err);
  }
}

export const queryForTipsInfo = async (mood) => {
  const today = new Date();
  const tipsQuery = query(
    collection(db, "tips"),
    where("mood", "==", `${mood}`),
  );
  try {
    const querySnapshot = await getDocs(tipsQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};


export const queryForAudioInfo = async() => {
  const audioQuery = query(
    collection(db, "meditationAudios"),
    orderBy('title')
  );
  try {
    const querySnapshot = await getDocs(audioQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
}


export const addJournalEntry = async(entryInfo) => {
  try {
    const entryCollection = collection(db, `journalEntries`);
    return await addDoc(entryCollection, entryInfo);
  } catch (err) {
    console.error(err);
  }
}

export const queryJournalEntries = async(userId) => {
  const entriesQuery = query(
    collection(db, "journalEntries"),
    where('userId', '==', `${userId}`),
    orderBy("created_on", "desc")

  );
  try {
    const querySnapshot = await getDocs(entriesQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
}

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
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

export const addTipsInfoToFirestore = async (tipsInfo) => {
  try {
    const tipsCollection = collection(db, `tips`);
    return await addDoc(tipsCollection, tipsInfo);
  } catch (err) {
    console.error(err);
  }
};

export const queryForTipsInfo = async (mood) => {
  const today = new Date();
  const tipsQuery = query(
    collection(db, "tips"),
    where("mood", "==", `${mood}`)
  );
  try {
    const querySnapshot = await getDocs(tipsQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const queryForAudioInfo = async () => {
  const audioQuery = query(
    collection(db, "meditationAudios"),
    orderBy("title")
  );
  try {
    const querySnapshot = await getDocs(audioQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const addJournalEntry = async (entryInfo) => {
  try {
    const entryCollection = collection(db, `journalEntries`);
    return await addDoc(entryCollection, entryInfo);
  } catch (err) {
    console.error(err);
  }
};

export const queryJournalEntries = async (userId) => {
  const entriesQuery = query(
    collection(db, "journalEntries"),
    where("userId", "==", `${userId}`),
    orderBy("created_on", "desc")
  );
  try {
    const querySnapshot = await getDocs(entriesQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const deleteJournalEntry = async (entryId) => {
  const entryRef = doc(db, "journalEntries", `${entryId}`);
  try {
    await deleteDoc(entryRef);
  } catch (err) {
    console.error(err);
  }
};

export const updateJournalEntry = async (entryId, fieldsToUpdate) => {
  const entryRef = doc(db, "journalEntries", `${entryId}`);
  try {
    await updateDoc(entryRef, {
      text: fieldsToUpdate.text,
      updated_on: fieldsToUpdate.updated_on,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (postInfo) => {
  try {
    const postsCollection = collection(db, `posts`);
    return await addDoc(postsCollection, postInfo);
  } catch (err) {
    console.error(err);
  }
};

export const queryAllPosts = async () => {
  const postsQuery = query(
    collection(db, "posts"),
    orderBy("created_on", "desc")
  );
  try {
    const querySnapshot = await getDocs(postsQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const updatePostLike = async (postToLike, userId) => {
  const postRef = doc(db, "posts", `${postToLike.id}`);
  if (!postToLike.likes.includes(userId)) {
    try {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export const deletePost = async (postId) => {
  const postRef = doc(db, "posts", `${postId}`);
  try {
    await deleteDoc(postRef);
  } catch (err) {
    console.error(err);
  }
};

export const AddCommentToFirestore = async (commentInfo) => {
  try {
    const commentsCollection = collection(db, `comments`);
    return await addDoc(commentsCollection, commentInfo);
  } catch (err) {
    console.error(err);
  }
};


export const queryAllComments = async (postId) => {
  const postsQuery = query(
    collection(db, "comments"),
    where('postId','==',`${postId}`),
    orderBy("created_on", "desc")
  );
  try {
    const querySnapshot = await getDocs(postsQuery);
    return querySnapshot;
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (commentId) => {
  const commentRef = doc(db, "comments", `${commentId}`);
  try {
    await deleteDoc(commentRef);
  } catch (err) {
    console.error(err);
  }
};
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR0UfLF30216CEuUdE7jO8E2qhLwgQQy4",
  authDomain: "mero-bhawana.firebaseapp.com",
  databaseURL: "https://mero-bhawana-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mero-bhawana",
  storageBucket: "mero-bhawana.appspot.com",
  messagingSenderId: "488901715785",
  appId: "1:488901715785:web:48f8c0a78e227a19f41c98",
  measurementId: "G-M583Y55QH4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

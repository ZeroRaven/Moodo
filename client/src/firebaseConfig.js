import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9nX9m2rbnDC4hC18gEBok-YBEzzaW3lY",
  authDomain: "mentalhealthapp-28d99.firebaseapp.com",
  projectId: "mentalhealthapp-28d99",
  storageBucket: "mentalhealthapp-28d99.appspot.com",
  messagingSenderId: "69038588759",
  appId: "1:69038588759:web:6870718dac7c384b633412",
  measurementId: "G-39SL0JY1RC",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, " http://127.0.0.1:9099");
// const db = getFirestore(firebaseApp)

// onAuthStateChanged(auth, user => {
//   if(user != null){
//     console.log('logged in')
//   }else{
//     console.log('No user')
//   }
// })

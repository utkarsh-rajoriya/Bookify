"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";

const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const FirebaseProvider = (props) => {
  const auth = getAuth(app);
  const fireStore = getFirestore(app);
  const storage = getStorage(app);
  
  return (
    <FirebaseContext.Provider value={{ auth, fireStore, storage }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

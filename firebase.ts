// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGTjbHbnivjC2qfzngTlslcBcY_peJu9g",
  authDomain: "chatgpt-clone-46aa2.firebaseapp.com",
  projectId: "chatgpt-clone-46aa2",
  storageBucket: "chatgpt-clone-46aa2.appspot.com",
  messagingSenderId: "327385096185",
  appId: "1:327385096185:web:cc1e0dcd1d5fcd4da22728",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

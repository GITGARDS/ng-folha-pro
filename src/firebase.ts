import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDl0SF8APmDbCotEM5jSZ8huRZ0b_hPJMM',
  authDomain: 'portifolio-2362e.firebaseapp.com',
  projectId: 'portifolio-2362e',
  storageBucket: 'portifolio-2362e.firebasestorage.app',
  messagingSenderId: '169087849079',
  appId: '1:169087849079:web:9b52fa6054a73455122c72',
  measurementId: 'G-ZGVQ74B8Y6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
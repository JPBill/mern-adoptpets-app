// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-pets-app-aa12c.firebaseapp.com',
  projectId: 'mern-pets-app-aa12c',
  storageBucket: 'mern-pets-app-aa12c.appspot.com',
  messagingSenderId: '332921356131',
  appId: '1:332921356131:web:faf0fb9b828c1ddb5d1d56',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

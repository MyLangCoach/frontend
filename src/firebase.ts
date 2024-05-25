// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyBMEsPyoEvMTOgFHTn54ePMCUb5YVWIgxw",
//   authDomain: "korre-io.firebaseapp.com",
//   projectId: "korre-io",
//   storageBucket: "korre-io.appspot.com",
//   messagingSenderId: "246394206478",
//   appId: "1:246394206478:web:99eaf5c2a3fae26e587f5f",
//   measurementId: "G-9FZS2M3GHZ"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

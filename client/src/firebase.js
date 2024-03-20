// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "smartcatalog-65e77.firebaseapp.com",
  projectId: "smartcatalog-65e77",
  storageBucket: "smartcatalog-65e77.appspot.com",
  messagingSenderId: "892081751947",
  appId: "1:892081751947:web:838fbe38bf77d3a717918e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsXEwg9NnTGYW3Rn0xd_pjRF6Q4XAH86w",
  authDomain: "registeration-seva.firebaseapp.com",
  projectId: "registeration-seva",
  storageBucket: "registeration-seva.appspot.com",
  messagingSenderId: "402241033243",
  appId: "1:402241033243:web:f9309adc7cf24a312c14be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyAFDjT58Adn-B7MMm31YczcFBPTIUpB51M",
  authDomain: "sparta-bucket-8e16c.firebaseapp.com",
  projectId: "sparta-bucket-8e16c",
  storageBucket: "sparta-bucket-8e16c.appspot.com",
  messagingSenderId: "726564027220",
  appId: "1:726564027220:web:69c36ca798e63877fa66c1",
  measurementId: "G-LFXYQCHS7M"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);


export const db = getFirestore();

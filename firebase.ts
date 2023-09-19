// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzWxc4aOvU55wUeBIYoB6MCxV73F87RA4",
  authDomain: "portfolio-website-7e386.firebaseapp.com",
  projectId: "portfolio-website-7e386",
  storageBucket: "portfolio-website-7e386.appspot.com",
  messagingSenderId: "218678625793",
  appId: "1:218678625793:web:d8b83578b587f6f1fba200",
  measurementId: "G-KSB2TWS9CR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);

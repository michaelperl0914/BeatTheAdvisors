// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP7d5w4QPo4atqzUICLI4WHQ0Y5l5Ouso",
  authDomain: "beat-the-advisors.firebaseapp.com",
  projectId: "beat-the-advisors",
  storageBucket: "beat-the-advisors.appspot.com",
  messagingSenderId: "226768475881",
  appId: "1:226768475881:web:6a274da12b661236568278",
  measurementId: "G-66CVYHB5Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
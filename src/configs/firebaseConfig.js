// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgQl99RuHmJwgJE2N2IecqZowLEy36OI0",
  authDomain: "travel-social-50ef4.firebaseapp.com",
  projectId: "travel-social-50ef4",
  storageBucket: "travel-social-50ef4.appspot.com",
  messagingSenderId: "126017573252",
  appId: "1:126017573252:web:74b8a14281491c3948cdd1",
  measurementId: "G-PN1NJYMET2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
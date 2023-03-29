// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiYTdBeXXlXRBPvyX47sWYKhICkqiCEmQ",
  authDomain: "chatapp-e6ead.firebaseapp.com",
  databaseURL: "https://chatapp-e6ead-default-rtdb.firebaseio.com",
  projectId: "chatapp-e6ead",
  storageBucket: "chatapp-e6ead.appspot.com",
  messagingSenderId: "360165553336",
  appId: "1:360165553336:web:3ade5e1e82e1ef103af04d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
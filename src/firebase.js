// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "chatapp-e6ead.firebaseapp.com",
  databaseURL: "https://chatapp-e6ead-default-rtdb.firebaseio.com",
  projectId: "chatapp-e6ead",
  storageBucket: "chatapp-e6ead.appspot.com",
  messagingSenderId: process.env.FB_MSG_SENDER_ID,
  appId: process.env.FB_APP_IP
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
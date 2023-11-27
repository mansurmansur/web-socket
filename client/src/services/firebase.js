// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: "AIzaSyCGcmhJ3cyPoYGibLmTqidZFfGre_ww7Qs",
  authDomain: "web-chat-408be.firebaseapp.com",
  projectId: "web-chat-408be",
  storageBucket: "web-chat-408be.appspot.com",
  messagingSenderId: "887946897609",
  appId: "1:887946897609:web:6859fc04f7d195ba3b8518",
  measurementId: "G-E0WQ7DHT15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);// Import the functions you need from the SDKs you need
export {app};

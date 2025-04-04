// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9iGYzArxQi1lrgl2hOL3Rm14E8YHAQ7w",
  authDomain: "lnt-push-notification.firebaseapp.com",
  projectId: "lnt-push-notification",
  storageBucket: "lnt-push-notification.firebasestorage.app",
  messagingSenderId: "90824940021",
  appId: "1:90824940021:web:31a479528ccff58f8068bc",
  measurementId: "G-EG851P1PFS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { messaging, getToken, onMessage, analytics };

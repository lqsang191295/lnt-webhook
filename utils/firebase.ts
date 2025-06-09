"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);

const getMessagingClient = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getMessaging(app);
  }
  return null;
};

const getAnalyticsClient = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  }
  return null;
};

export {
  getMessagingClient,
  getAnalyticsClient,
  getToken,
  onMessage,
  isSupported,
};

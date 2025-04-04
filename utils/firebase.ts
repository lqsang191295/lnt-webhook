// firebaseClient.ts
"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9iGYzArxQi1lrgl2hOL3Rm14E8YHAQ7w",
  authDomain: "lnt-push-notification.firebaseapp.com",
  projectId: "lnt-push-notification",
  storageBucket: "lnt-push-notification.appspot.com",
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

export { getMessagingClient, getAnalyticsClient, getToken };

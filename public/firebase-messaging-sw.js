importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA9iGYzArxQi1lrgl2hOL3Rm14E8YHAQ7w",
  authDomain: "lnt-push-notification.firebaseapp.com",
  projectId: "lnt-push-notification",
  storageBucket: "lnt-push-notification.firebasestorage.app",
  messagingSenderId: "90824940021",
  appId: "1:90824940021:web:31a479528ccff58f8068bc",
  measurementId: "G-EG851P1PFS",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage(function (payload) {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self?.addEventListener("notificationclick", function (event) {
  const clickAction = event.notification.data.click_action;

  if (clickAction) {
    clients.openWindow(clickAction);
  }
  event.notification.close();
});

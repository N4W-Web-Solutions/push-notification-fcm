importScripts("https://www.gstatic.com/firebasejs/5.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.1/firebase-messaging.js");
importScripts("src/init.js");

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notification = JSON.parse(payload.data.notification);

  return self.registration.showNotification(notification.title, notification);
});

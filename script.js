const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log(registration);
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.log(`Registration failed with ${error}`);
    }
  }
};

const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service worker support is not avaiable for this browser");
  }
  if (!("Notification" in window)) {
    throw new Error("Notification support is not available");
  }
};

const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  } else {
    new Notification("Hello world");
  }
};

checkPermission();
registerServiceWorker();
// requestPermission();

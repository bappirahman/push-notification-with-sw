const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await fetch("http://localhost:3000/save-subscription", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BP-3Q3m4nCvyngDLVfVLoVDoNogi07o_sHefsPMwb0ZfHlG9p7jZIGwLre5ZIz-4r9nKfK9PDUxlcpC5Qfl-D_w"
    ),
  });
  const response = await saveSubscription(subscription);
  console.log("Subscription successful");
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Pushed from server", {
    body: e.data.text(),
  });
  console.log(e);
});

// Public Key:
// BP-3Q3m4nCvyngDLVfVLoVDoNogi07o_sHefsPMwb0ZfHlG9p7jZIGwLre5ZIz-4r9nKfK9PDUxlcpC5Qfl-D_w
// Private Key:
// QHi3BxGRf1CvMWwLnx_ER7UMFAIhQmx6xq_-DTb8IvA

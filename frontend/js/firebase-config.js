/* Firebase client config
   1) Replace the placeholder values with your Firebase project's config
   2) This file is loaded after the Firebase CDN scripts in the HTML
*/

// Example (replace with your project's values):
// frontend/js/firebase-config.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

firebase.initializeApp(firebaseConfig);


// Initialize Firebase (compat namespace expected from CDN compat scripts)
if (typeof firebase !== 'undefined' && firebase && !firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

// Make auth available globally for existing main.js
if (typeof firebase !== 'undefined' && firebase) {
  window.firebaseAuth = firebase.auth();
}

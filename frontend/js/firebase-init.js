/**
 * Firebase Authentication Initialization (Modular SDK v10.4.0)
 * 
 * This module:
 * - Initializes Firebase with your project configuration
 * - Imports authentication functions from Firebase SDK
 * - Exposes auth object and functions globally for main.js to use
 * - Dispatches 'firebase-ready' event when initialization completes
 * 
 * Loaded by all HTML pages as <script type="module" src="js/firebase-init.js"></script>
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// ============================================
// Firebase Configuration
// ============================================
// 🔑 Replace these values with your Firebase project's credentials from Firebase Console
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


// ============================================
// Firebase App Initialization
// ============================================
// Initialize Firebase with the provided config
const app = initializeApp(firebaseConfig);

// Get authentication instance for use throughout the app
const auth = getAuth(app);

// ============================================
// Global Exports
// ============================================
// Expose auth object globally for use in main.js
window.firebaseAuth = auth;

// Expose Firebase authentication functions globally
// Functions: createUserWithEmailAndPassword, signInWithEmailAndPassword, 
// sendPasswordResetEmail, confirmPasswordReset, updateProfile, signOut
window.firebaseFuncs = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  signOut
};

// Expose configuration for debugging (remove in production)
window._firebaseConfig = firebaseConfig;

// ============================================
// Initialization Complete Event
// ============================================
// Dispatch 'firebase-ready' event so main.js knows Firebase is initialized
try {
  window.dispatchEvent(new Event('firebase-ready'));
} catch (e) {
  // Ignore error if event dispatch fails
}

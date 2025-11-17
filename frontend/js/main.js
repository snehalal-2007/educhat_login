/**
 * Main Authentication Handler
 * 
 * Manages all client-side authentication flows:
 * - User Registration (with password validation)
 * - User Login (with email verification + password check)
 * - Forgot Password (with email verification + reset email sending)
 * - Password Reset (confirmation flow via Firebase email link)
 * 
 * Uses Firebase Client SDK v10.4.0 (modular)
 * ID tokens stored in localStorage under key 'idToken'
 * 
 * Dependencies: firebase-init.js must be loaded first
 */

(async () => {
  /**
   * Wait for Firebase to be initialized (from firebase-init.js)
   * Waits for 'firebase-ready' event with 3-second timeout fallback
   */
  const waitForFirebase = () => new Promise((resolve) => {
    if (window.firebaseAuth && window.firebaseFuncs) return resolve();
    const onReady = () => resolve();
    window.addEventListener('firebase-ready', onReady, { once: true });
    let waited = 0;
    const iv = setInterval(() => {
      if (window.firebaseAuth && window.firebaseFuncs) {
        clearInterval(iv);
        window.removeEventListener('firebase-ready', onReady);
        return resolve();
      }
      waited += 100;
      if (waited >= 3000) {
        clearInterval(iv);
        return resolve();
      }
    }, 100);
  });

  await waitForFirebase();

  /**
   * Display success or error message in a message box element
   * @param {string} elementId - ID of message box element (e.g., 'loginMessage')
   * @param {string} msg - Message text to display
   * @param {string} type - 'success' or 'error' to style appropriately
   */
  function showMessage(elementId, msg, type) {
    const box = document.getElementById(elementId);
    box.textContent = msg;
    box.className = type === "success" ? "message-box message-success" : "message-box message-error";
    box.style.display = "block";
  }

  // Get Firebase auth instance and helper functions from global scope
  const auth = window.firebaseAuth;
  const f = window.firebaseFuncs || {};

  // ============================================
  // LOGIN HANDLER
  // ============================================
  // ============================================
  // LOGIN HANDLER
  // ============================================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login_email").value;
      const password = document.getElementById("login_password").value;

      if (!auth || !f.signInWithEmailAndPassword) {
        showMessage("loginMessage", "Firebase not initialized", "error");
        return;
      }

      try {
        // Attempt to sign in with email and password
        const cred = await f.signInWithEmailAndPassword(auth, email, password);
        
        // Get ID token from user and store for authenticated requests
        const token = await cred.user.getIdToken();
        localStorage.setItem('idToken', token);
        
        showMessage("loginMessage", "Login successful!", "success");
        // Redirect to home page after brief delay
        setTimeout(() => { window.location.href = "home.html"; }, 800);
      } catch (err) {
        // Log error for debugging
        console.error('Login error:', err.code, err.message);
        
        const code = err?.code || '';
        
        // Map Firebase error codes to user-friendly messages
        if (code === 'auth/user-not-found') {
          showMessage("loginMessage", "Email not registered", "error");
        } else if (code === 'auth/invalid-password' || code === 'auth/wrong-password') {
          showMessage("loginMessage", "Incorrect password", "error");
        } else if (code === 'auth/invalid-login-credentials') {
          // Newer Firebase versions use this for invalid login attempts
          showMessage("loginMessage", "Incorrect password", "error");
        } else {
          showMessage("loginMessage", "Login failed", "error");
        }
      }
    });
  }

  // ============================================
  // REGISTER HANDLER
  // ============================================
  // ============================================
  // REGISTER HANDLER
  // ============================================
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("register_name").value;
      const email = document.getElementById("register_email").value;
      const password = document.getElementById("register_password").value;
      const confirm = document.getElementById("register_confirm").value;

      if (!auth || !f.createUserWithEmailAndPassword) {
        showMessage("registerMessage", "Firebase not initialized", "error");
        return;
      }

      // Client-side validation: check password length
      if (password.length < 6) {
        showMessage("registerMessage", "password less than 6 characters.", "error");
        return;
      }

      // Client-side validation: check passwords match
      if (password !== confirm) {
        showMessage("registerMessage", "Passwords do not match", "error");
        return;
      }

      try {
        // Create new user in Firebase
        const cred = await f.createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name
        if (f.updateProfile) {
          await f.updateProfile(cred.user, { displayName: name });
        }
        
        showMessage("registerMessage", "Registered successfully!", "success");
        // Redirect back to login page after brief delay
        setTimeout(() => { window.location.href = "index.html"; }, 1000);
      } catch (err) {
        // Map Firebase error codes to user-friendly messages
        const code = err?.code || '';
        if (code.includes('email-already-in-use')) {
          showMessage("registerMessage", "Email already registered", "error");
        } else if (code.includes('weak-password')) {
          showMessage("registerMessage", "password less than 6 characters.", "error");
        } else {
          showMessage("registerMessage", "Registration failed", "error");
        }
      }
    });
  }

  // ============================================
  // FORGOT PASSWORD HANDLER
  // ============================================
  // ============================================
  // FORGOT PASSWORD HANDLER
  // ============================================
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("forgot_email").value;

      if (!auth || !f.sendPasswordResetEmail) {
        showMessage("forgotMessage", "Firebase not initialized", "error");
        return;
      }

      try {
        // Send password reset email from Firebase
        // Firebase handles sending the email and manages the reset flow
        await f.sendPasswordResetEmail(auth, email, { url: 'http://localhost:5500/index.html' });
        showMessage("forgotMessage", "Reset email sent! Check your inbox", "success");
      } catch (err) {
        console.error('sendPasswordResetEmail error:', err.code, err.message);
        
        const code = err?.code || '';
        
        // Map Firebase error codes to user-friendly messages
        if (code === 'auth/user-not-found') {
          showMessage("forgotMessage", "Email not registered", "error");
        } else {
          showMessage("forgotMessage", "Error sending reset email", "error");
        }
      }
    });
  }
})();
/* Authentication flows initialized. */
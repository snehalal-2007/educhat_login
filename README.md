# Login Application

A full-stack authentication system with user registration, login, and password recovery features using Firebase Authentication and Flask backend.

## 🚀 Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Firebase Authentication SDK v10.4.0 (modular)
- localStorage for session management

**Backend:**
- Python 3.12
- Flask web framework
- Flask-CORS for cross-origin requests
- Firebase Admin SDK for token verification

**Services:**
- Firebase Authentication (Email/Password)
- Firebase Identity Toolkit REST API

## 📁 Project Structure

```
Login/
├── frontend/
│   ├── index.html              # Login page
│   ├── register.html           # Registration page
│   ├── forgot.html             # Forgot password page
│   ├── reset.html              # Password reset page
│   ├── home.html               # Home page (after login)
│   ├── css/
│   │   └── style.css           # Styling for phone UI
│   └── js/
│       ├── firebase-init.js    # Firebase initialization
│       ├── firebase-config.js  # Firebase configuration
│       └── main.js             # Authentication handlers
│
├── backend/
│   ├── app.py                  # Flask main application
│   ├── firebase_key_1.json     # Firebase service account credentials
│   ├── requirements.txt        # Python dependencies
│   ├── controllers/
│   │   └── auth_controller.py  # Authentication logic
│   └── routes/
│       └── auth_routes.py      # API endpoints
│
└── README.md                   # This file
```

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js (for Firebase tools, optional)
- Firebase project with Email/Password authentication enabled

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (optional but recommended):**
   ```bash
   python3.12 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Firebase credentials:**
   - Place your Firebase service account JSON file at `backend/firebase_key_1.json`
   - Update Firebase config in `frontend/js/firebase-config.js` with your project details

5. **Run Flask server:**
   ```bash
   python app.py
   ```
   Server runs on `http://localhost:5050`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Start local server:**
   ```bash
   python3 -m http.server 5500
   ```
   Frontend runs on `http://localhost:5500`

3. **Access the application:**
   - Open browser to `http://localhost:5500/index.html`

## 🔐 Features

### User Registration
- Email validation
- Password strength requirements (minimum 6 characters)
- Password confirmation matching
- Error handling for duplicate emails

### User Login
- Email and password authentication
- Distinguishes between unregistered emails and incorrect passwords
- Stores ID token in localStorage after successful login
- Redirects to home page on success

### Forgot Password
- Email verification
- Firebase-managed password reset emails
- Reset link sent to registered email addresses
- User-friendly error messages

### Password Reset
- Firebase-hosted reset flow
- Confirmation page (reset.html)
- Secure token-based verification

## 🔧 Configuration

### Firebase Setup
Update `frontend/js/firebase-config.js` with your Firebase project details:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### CORS Configuration
Backend is configured to allow:
- Origin: `http://localhost:5500`
- Headers: `Content-Type`, `Authorization`
- Credentials: Enabled

## 📝 API Endpoints

### Authentication Routes (Backend)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Send password reset email
- `POST /reset-password` - Reset password confirmation

*Note: Current implementation uses client-side Firebase Auth. Backend routes are available for future backend-driven authentication.*

## 🎨 UI Design

- Phone-like UI mockup (375px width)
- Purple color scheme (#8C63FF primary)
- Responsive error/success messages
- Mobile-optimized layout

## 🔒 Security

- ID tokens stored in localStorage (consider httpOnly cookies for production)
- CORS configured for specific origin
- Firebase security rules enforced
- Server-side token verification capability available

## 📦 Dependencies

### Backend (`requirements.txt`)
```
Flask==3.0.0
flask-cors==4.0.0
firebase-admin==6.2.0
```

### Frontend
- Firebase Authentication SDK v10.4.0 (CDN)

## 🚀 Production Deployment

Before deploying to production:
1. Replace localhost URLs with actual domain
2. Migrate from localStorage to secure httpOnly cookies
3. Enable Firebase security rules
4. Configure proper CORS origins
5. Set up HTTPS
6. Hide Firebase credentials (use environment variables)
7. Enable backend token verification for protected routes

## 🐛 Troubleshooting

### CORS Errors
- Verify backend is running on port 5050
- Check frontend origin is whitelisted in CORS config
- Ensure Authorization header is included in requests

### Firebase Not Initialized
- Verify firebase-init.js loads before main.js
- Check Firebase config is correct
- Ensure firebase-ready event is fired

### Password Reset Emails Not Received
- Verify email address is registered
- Check Firebase Email Templates are configured
- Confirm email is not marked as spam

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created for Educhat Login System

---

**Last Updated:** November 16, 2025

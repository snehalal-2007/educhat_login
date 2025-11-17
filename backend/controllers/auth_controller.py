"""Firebase Authentication Controller
Handles user registration, login, password reset operations via Firebase Admin SDK.
"""

import os
import firebase_admin
from firebase_admin import auth, credentials, _auth_utils
from flask import jsonify
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK with service account credentials
# This allows server-side user management and token verification
cred = credentials.Certificate("firebase_key_1.json")
firebase_admin.initialize_app(cred)


# ============================================
# USER REGISTRATION
# ============================================
def register_user(data):
    """Create a new user account with email and password.
    
    Args:
        data: Dictionary with keys 'email', 'password', 'full_name'
    
    Returns:
        JSON response with success status and message
    """
    try:
        # Create user in Firebase
        user = auth.create_user(
            email=data["email"],
            password=data["password"],
            display_name=data["full_name"]
        )
        return jsonify({"success": True, "message": "User registered successfully"}), 200

    except _auth_utils.EmailAlreadyExistsError:
        # Email already exists in Firebase
        return jsonify({"success": False, "message": "Email already registered"}), 400

    except Exception as e:
        # Handle other Firebase errors
        return jsonify({"success": False, "message": str(e)}), 400


# ============================================
# USER LOGIN
# ============================================
def login_user(data):
    """Verify user credentials and authenticate login.
    Note: Password verification is handled client-side via Firebase SDK.
    This endpoint verifies the email exists.
    
    Args:
        data: Dictionary with key 'email'
    
    Returns:
        JSON response with success status
    """
    try:
        # Check if user exists by email
        user = auth.get_user_by_email(data["email"])
        return jsonify({"success": True, "message": "Login successful"}), 200

    except _auth_utils.UserNotFoundError:
        # User not found in Firebase
        return jsonify({"success": False, "message": "Invalid email or password"}), 400

    except Exception as e:
        # Handle other Firebase errors
        return jsonify({"success": False, "message": str(e)}), 400


# ============================================
# FORGOT PASSWORD
# ============================================
def forgot_password(data):
    """Generate and send password reset link for user.
    Note: Client-side Firebase SDK now handles sending reset emails.
    This function kept for reference/backend-initiated resets.
    
    Args:
        data: Dictionary with key 'email'
    
    Returns:
        JSON response with reset status
    """
    email = data.get("email")
    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    try:
        # Generate password reset link
        reset_link = auth.generate_password_reset_link(email)
        return jsonify({
            "success": True,
            "message": f"Password reset link sent to {email}",
            "reset_link": reset_link
        }), 200

    except _auth_utils.UserNotFoundError:
        # Email not found in Firebase
        return jsonify({"success": False, "message": "Email not found"}), 400

    except Exception as e:
        # Handle other Firebase errors
        return jsonify({"success": False, "message": str(e)}), 400


# ============================================
# RESET PASSWORD (Confirm Reset)
# ============================================
def reset_password(data):
    """Confirm password reset with out-of-band code.
    The oobCode is obtained from Firebase password reset email link.
    
    Args:
        data: Dictionary with keys 'oobCode' and 'new_password'
    
    Returns:
        JSON response with reset confirmation status
    """
    oob_code = data.get("oobCode")
    new_password = data.get("new_password")

    # Validate required fields
    if not oob_code or not new_password:
        return jsonify({"success": False, "message": "Missing oobCode or new_password"}), 400

    try:
        # Confirm password reset with Firebase
        auth.confirm_password_reset(oob_code, new_password)
        return jsonify({"success": True, "message": "Password reset successfully"}), 200

    except Exception as e:
        # Handle Firebase errors
        return jsonify({"success": False, "message": str(e)}), 400


# ============================================
# ID TOKEN VERIFICATION (Protected Routes)
# ============================================
def verify_id_token(id_token):
    """Verify an ID token from client-side Firebase authentication.
    Used to protect backend routes that require authentication.
    
    Args:
        id_token: JWT token string from Firebase client SDK
    
    Returns:
        Decoded token dict if valid, None if invalid or expired
    
    Example usage in route:
        @app.route('/protected')
        def protected():
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            decoded = verify_id_token(token)
            if not decoded:
                return jsonify({"error": "Unauthorized"}), 401
            # Use decoded['uid'] for user ID
    """
    if not id_token:
        return None
    try:
        # Verify and decode ID token using Firebase Admin SDK
        decoded = auth.verify_id_token(id_token)
        return decoded
    except Exception:
        # Token is invalid, expired, or tampered with
        return None

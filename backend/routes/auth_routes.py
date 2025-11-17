"""Authentication Routes
Defines API endpoints for user authentication operations.
All routes are POST requests expecting JSON payloads.
"""

from flask import Blueprint, request
from controllers.auth_controller import register_user, login_user, forgot_password, reset_password

# Create Blueprint for auth routes
auth_bp = Blueprint("auth", __name__)

# ============================================
# API ENDPOINTS
# ============================================

@auth_bp.route("/register", methods=["POST"])
def register():
    """POST /register
    Register a new user account.
    Body: {"email": string, "password": string, "full_name": string}
    Returns: {"success": boolean, "message": string}
    """
    return register_user(request.json)

@auth_bp.route("/login", methods=["POST"])
def login():
    """POST /login
    Verify user login (email-only, password verified client-side by Firebase).
    Body: {"email": string}
    Returns: {"success": boolean, "message": string}
    """
    return login_user(request.json)

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot():
    """POST /forgot-password
    Initiate forgot password flow (generates reset link).
    Body: {"email": string}
    Returns: {"success": boolean, "message": string, "reset_link": string}
    Note: Client-side Firebase SDK now handles this operation.
    """
    return forgot_password(request.json)

@auth_bp.route("/reset-password", methods=["POST"])
def reset():
    """POST /reset-password
    Confirm password reset with out-of-band code from Firebase email.
    Body: {"oobCode": string, "new_password": string}
    Returns: {"success": boolean, "message": string}
    Note: Firebase handles email-based reset flow natively.
    """
    return reset_password(request.json)

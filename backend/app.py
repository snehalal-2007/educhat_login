"""Flask Backend for Login/Register/Forgot Password Application
Powers authentication routes and API endpoints.
Runs on http://localhost:5050
"""

from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp

# Initialize Flask application
app = Flask(__name__)

# CORS Configuration: Allow frontend (localhost:5500) to make requests
# Includes Authorization header for ID token verification
CORS(app,
     resources={r"/*": {"origins": ["http://localhost:5500"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"])

# Register authentication blueprint (routes in routes/auth_routes.py)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    # Run Flask server in debug mode on port 5050
    app.run(debug=True, port=5050)

import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Proper CORS configuration
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"],
     methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
     supports_credentials=True)

# Import and register routes
from routes import blog_routes
app.register_blueprint(blog_routes, url_prefix='/api')

# Root endpoint
@app.route('/')
def home():
    return jsonify({
        "message": "Vocal Clone API is running!",
        "status": "success",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "blogs": "/api/blogs",
            "favorites": "/api/blogs/favorites"
        }
    })

@app.route('/api')
def api_info():
    return jsonify({
        "message": "Blog API endpoints", 
        "endpoints": [
            "GET /api/blogs - Get all blogs",
            "POST /api/blogs - Create new blog",
            "GET /api/blogs/<id> - Get specific blog",
            "PUT /api/blogs/<id> - Update blog",
            "DELETE /api/blogs/<id> - Delete blog",
            "PATCH /api/blogs/<id>/favorite - Toggle favorite"
        ]
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("=" * 60)
    print("🎵 VOCAL CLONE API SERVER")
    print("=" * 60)
    print("Server: http://localhost:5000")
    print("Available Endpoints:")
    print("  GET  /                     - Home")
    print("  GET  /api                  - API Info")
    print("  GET  /api/health           - Health Check")
    print("  GET  /api/blogs            - Get All Blogs")
    print("  POST /api/blogs            - Create Blog")
    print("  GET  /api/blogs/<id>       - Get Blog")
    print("  PUT  /api/blogs/<id>       - Update Blog")
    print("  DELETE /api/blogs/<id>     - Delete Blog")
    print("  PATCH /api/blogs/<id>/favorite - Toggle Favorite")
    print("  GET  /api/blogs/favorites  - Get Favorite Blogs")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)

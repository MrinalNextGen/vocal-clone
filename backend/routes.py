import logging
from flask import Blueprint, request, jsonify
from models import blog_manager

# Set up logging
logger = logging.getLogger(__name__)

blog_routes = Blueprint('blog_routes', __name__)

@blog_routes.route('/health', methods=['GET'])
def health_check():
    logger.info("Health check requested")
    return jsonify({"success": True, "message": "API is healthy", "status": "success"})

@blog_routes.route('/blogs', methods=['GET'])
def get_all_blogs():
    try:
        logger.info("GET /api/blogs - Fetching all blogs")
        blogs = blog_manager.get_all_blogs()
        logger.info(f"GET /api/blogs - Successfully fetched {len(blogs)} blogs")
        return jsonify({"success": True, "data": blogs})
    except Exception as e:
        logger.error(f"GET /api/blogs - Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs', methods=['POST'])
def create_blog():
    try:
        logger.info("POST /api/blogs - Creating new blog")
        
        # Get JSON data from request
        data = request.get_json()
        logger.info(f"POST /api/blogs - Received data: {data}")
        
        if not data:
            logger.warning("POST /api/blogs - No data provided")
            return jsonify({"success": False, "error": "No data provided"}), 400
        
        # Validate required fields
        if not data.get('heading') or not data.get('description'):
            logger.warning("POST /api/blogs - Missing required fields")
            return jsonify({
                "success": False, 
                "error": "Heading and description are required"
            }), 400
        
        # Create blog using blog manager
        blog, errors = blog_manager.create_blog(data)
        if errors:
            logger.warning(f"POST /api/blogs - Validation errors: {errors}")
            return jsonify({"success": False, "errors": errors}), 400
        
        logger.info(f"POST /api/blogs - Successfully created blog with ID: {blog['id']}")
        return jsonify({"success": True, "data": blog}), 201
        
    except Exception as e:
        logger.error(f"POST /api/blogs - Exception: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs/<int:blog_id>', methods=['GET'])
def get_blog(blog_id):
    try:
        logger.info(f"GET /api/blogs/{blog_id} - Fetching blog")
        blog = blog_manager.get_blog_by_id(blog_id)
        if blog:
            logger.info(f"GET /api/blogs/{blog_id} - Successfully fetched blog")
            return jsonify({"success": True, "data": blog})
        logger.warning(f"GET /api/blogs/{blog_id} - Blog not found")
        return jsonify({"success": False, "error": "Blog not found"}), 404
    except Exception as e:
        logger.error(f"GET /api/blogs/{blog_id} - Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs/<int:blog_id>', methods=['PUT'])
def update_blog(blog_id):
    try:
        logger.info(f"PUT /api/blogs/{blog_id} - Updating blog")
        
        # Get JSON data from request
        data = request.get_json()
        logger.info(f"PUT /api/blogs/{blog_id} - Received data: {data}")
        
        if not data:
            logger.warning(f"PUT /api/blogs/{blog_id} - No data provided")
            return jsonify({"success": False, "error": "No data provided"}), 400
        
        # Check if blog exists
        existing_blog = blog_manager.get_blog_by_id(blog_id)
        if not existing_blog:
            return jsonify({"success": False, "error": "Blog not found"}), 404
        
        # Update the blog using blog_manager
        blog, errors = blog_manager.update_blog(blog_id, data)
        if errors:
            logger.warning(f"PUT /api/blogs/{blog_id} - Errors: {errors}")
            if "Blog not found" in errors:
                return jsonify({"success": False, "error": "Blog not found"}), 404
            return jsonify({"success": False, "errors": errors}), 400
        
        logger.info(f"PUT /api/blogs/{blog_id} - Successfully updated blog")
        return jsonify({"success": True, "data": blog})
        
    except Exception as e:
        logger.error(f"PUT /api/blogs/{blog_id} - Exception: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    try:
        logger.info(f"DELETE /api/blogs/{blog_id} - Deleting blog")
        deleted_blog = blog_manager.delete_blog(blog_id)
        if deleted_blog:
            logger.info(f"DELETE /api/blogs/{blog_id} - Successfully deleted blog")
            return jsonify({"success": True, "data": deleted_blog})
        logger.warning(f"DELETE /api/blogs/{blog_id} - Blog not found")
        return jsonify({"success": False, "error": "Blog not found"}), 404
    except Exception as e:
        logger.error(f"DELETE /api/blogs/{blog_id} - Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs/<int:blog_id>/favorite', methods=['PATCH'])
def toggle_favorite(blog_id):
    try:
        logger.info(f"PATCH /api/blogs/{blog_id}/favorite - Toggling favorite")
        blog = blog_manager.toggle_favorite(blog_id)
        if blog:
            logger.info(f"PATCH /api/blogs/{blog_id}/favorite - Successfully toggled favorite")
            return jsonify({"success": True, "data": blog})
        logger.warning(f"PATCH /api/blogs/{blog_id}/favorite - Blog not found")
        return jsonify({"success": False, "error": "Blog not found"}), 404
    except Exception as e:
        logger.error(f"PATCH /api/blogs/{blog_id}/favorite - Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@blog_routes.route('/blogs/favorites', methods=['GET'])
def get_favorite_blogs():
    try:
        logger.info("GET /api/blogs/favorites - Fetching favorite blogs")
        all_blogs = blog_manager.get_all_blogs()
        favorite_blogs = [blog for blog in all_blogs if blog.get('isFavorite', False)]
        logger.info(f"GET /api/blogs/favorites - Successfully fetched {len(favorite_blogs)} favorite blogs")
        return jsonify({"success": True, "data": favorite_blogs, "count": len(favorite_blogs)}), 200
    except Exception as e:
        logger.error(f"GET /api/blogs/favorites - Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

// API service for blog management
const API_BASE_URL = 'http://localhost:5000/api';

// Add debugging for API calls
const DEBUG = true;

class BlogAPI {
  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use the default error message
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  }

  // Get all blogs
  async getAllBlogs() {
    try {
      if (DEBUG) console.log('API: Fetching all blogs from:', `${API_BASE_URL}/blogs`);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      const result = await this.handleResponse(response);
      if (DEBUG) console.log('API: Successfully fetched blogs:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  // Get a specific blog by ID
  async getBlogById(blogId) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  }

  // Create a new blog
  async createBlog(blogData) {
    try {
      if (DEBUG) console.log('API: Creating new blog:', blogData);
      
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      const result = await this.handleResponse(response);
      if (DEBUG) console.log('API: Successfully created blog:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }

  // Update an existing blog
  async updateBlog(blogId, blogData) {
    try {
      if (DEBUG) console.log(`API: Updating blog ${blogId}:`, blogData);
      
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      const result = await this.handleResponse(response);
      if (DEBUG) console.log('API: Successfully updated blog:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }

  // Delete a blog
  async deleteBlog(blogId) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE',
      });
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }

  // Toggle favorite status
  async toggleFavorite(blogId) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/favorite`, {
        method: 'PATCH',
      });
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  // Get all favorite blogs
  async getFavoriteBlogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/favorites`);
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching favorite blogs:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const blogAPI = new BlogAPI();
export default blogAPI;

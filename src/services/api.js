const API_BASE_URL = 'http://localhost:5000/api';

class BlogAPI {
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
    console.log(`API Response [${response.status}]:`, data);
    return data;
  }

  async getAllBlogs() {
    try {
      console.log('API: Fetching all blogs from:', `${API_BASE_URL}/blogs`);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      const result = await this.handleResponse(response);
      console.log('API: Successfully fetched blogs:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  async getBlogById(blogId) {
    try {
      console.log(`API: Fetching blog ${blogId}`);
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
      const result = await this.handleResponse(response);
      console.log('API: Successfully fetched blog:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  }

  async createBlog(blogData) {
    try {
      console.log('API: Creating new blog:', blogData);
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const result = await this.handleResponse(response);
      console.log('API: Successfully created blog:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }

  async updateBlog(blogId, blogData) {
    try {
      console.log(`API: Updating blog ${blogId}:`, blogData);
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const result = await this.handleResponse(response);
      console.log('API: Successfully updated blog:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }

  async deleteBlog(blogId) {
    try {
      console.log(`API: Deleting blog ${blogId}`);
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE',
      });
      const result = await this.handleResponse(response);
      console.log('API: Successfully deleted blog');
      return result;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }

  async toggleFavorite(blogId) {
    try {
      console.log(`API: Toggling favorite for blog ${blogId}`);
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/favorite`, {
        method: 'PATCH',
      });
      const result = await this.handleResponse(response);
      console.log('API: Successfully toggled favorite:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  async getFavoriteBlogs() {
    try {
      console.log('API: Fetching favorite blogs');
      const response = await fetch(`${API_BASE_URL}/blogs/favorites`);
      const result = await this.handleResponse(response);
      console.log('API: Successfully fetched favorite blogs:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching favorite blogs:', error);
      throw error;
    }
  }
}

export const blogAPI = new BlogAPI();
export default blogAPI;

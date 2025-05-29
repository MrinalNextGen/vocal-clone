import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import BlogsPage from "./pages/BlogsPage";
import EditBlogPage from "./pages/EditBlogPage";
import { blogAPI } from "./services/api";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load blogs from API
  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading blogs from API...");
      const blogData = await blogAPI.getAllBlogs();
      console.log("Blogs loaded successfully:", blogData);
      setBlogs(blogData);
    } catch (err) {
      console.error("Error loading blogs:", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "blogs") {
      loadBlogs();
    }
  }, [currentPage]);

  const handleLogin = () => {
    setCurrentPage("blogs");
  };

  const handleEditBlog = (blog = null) => {
    setEditingBlog(blog);
    setCurrentPage("edit");
  };

  const handleSaveBlog = async (blogData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Saving blog:", blogData);
      
      if (editingBlog) {
        console.log("Updating existing blog with ID:", editingBlog.id);
        await blogAPI.updateBlog(editingBlog.id, blogData);
        console.log("Blog updated successfully");
      } else {
        console.log("Creating new blog");
        await blogAPI.createBlog(blogData);
        console.log("Blog created successfully");
      }

      setCurrentPage("blogs");
      setEditingBlog(null);
      await loadBlogs(); // Reload blogs to show changes
    } catch (err) {
      console.error("Error saving blog:", err);
      setError(`Failed to ${editingBlog ? 'update' : 'create'} blog: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        setLoading(true);
        setError(null);
        console.log("Deleting blog with ID:", blogId);
        await blogAPI.deleteBlog(blogId);
        await loadBlogs(); // Reload blogs after deletion
        console.log("Blog deleted successfully");
      } catch (err) {
        console.error("Error deleting blog:", err);
        setError("Failed to delete blog. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleFavorite = async (blogId) => {
    try {
      setError(null);
      console.log("Toggling favorite for blog ID:", blogId);
      await blogAPI.toggleFavorite(blogId);
      await loadBlogs(); // Reload blogs to get updated favorite status
      console.log("Favorite toggled successfully");
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError("Failed to update favorite status. Please try again.");
    }
  };

  const handleBackToBlogs = () => {
    setCurrentPage("blogs");
    setEditingBlog(null);
    setError(null);
  };

  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentPage === "edit") {
    return (
      <EditBlogPage
        blog={editingBlog}
        onSave={handleSaveBlog}
        onBack={handleBackToBlogs}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <BlogsPage
      blogs={blogs}
      onEdit={handleEditBlog}
      onDelete={handleDeleteBlog}
      onToggleFavorite={handleToggleFavorite}
      onAddNew={() => handleEditBlog()}
      loading={loading}
      error={error}
    />
  );
}

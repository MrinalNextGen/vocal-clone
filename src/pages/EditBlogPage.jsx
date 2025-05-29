import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export default function EditBlogPage({ blog, onSave, onBack, loading, error }) {
  const [formData, setFormData] = useState({
    image: "",
    heading: "",
    subHeading: "",
    description: "",
    author: "Current User",
    authorImage: "https://via.placeholder.com/40x40/cccccc/666666?text=User",
    isFavorite: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        image: blog.image || "",
        heading: blog.heading || "",
        subHeading: blog.subHeading || "",
        description: blog.description || "",
        author: blog.author || "Current User",
        authorImage: blog.authorImage || "https://via.placeholder.com/40x40/cccccc/666666?text=User",
        isFavorite: blog.isFavorite || false,
      });
    }
  }, [blog]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.heading.trim()) {
      newErrors.heading = "Heading is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("EditBlogPage: Submitting form data:", formData);
      await onSave(formData);
    } catch (error) {
      console.error("EditBlogPage: Error saving blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={onBack}
                className="mr-4 p-2 hover:bg-gray-100"
                disabled={isSubmitting || loading}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {blog ? "Edit Story" : "Create New Story"}
                </h1>
                <p className="text-sm text-gray-500">
                  {blog ? "Update your story" : "Share your thoughts with the world"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={loading || isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="blog-form"
                className="bg-black text-white hover:bg-gray-800"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{blog ? "Updating..." : "Publishing..."}</span>
                  </div>
                ) : (
                  blog ? "Update Story" : "Publish Story"
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Label className="text-lg font-semibold text-gray-900 mb-4 block">
              Cover Image
            </Label>
            
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Cover preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x300/cccccc/666666?text=Cover+Image";
                  }}
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <p className="text-gray-600 mb-2">Add a cover image to your story</p>
                <p className="text-sm text-gray-500">Recommended: 1200x600px</p>
              </div>
            )}
            
            <div className="mt-4">
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter an image URL
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Heading */}
            <div>
              <Label htmlFor="heading" className="text-lg font-semibold text-gray-900 mb-2 block">
                Title *
              </Label>
              <Input
                id="heading"
                type="text"
                value={formData.heading}
                onChange={(e) => handleInputChange("heading", e.target.value)}
                placeholder="Write your story title..."
                className={`w-full text-lg ${errors.heading ? 'border-red-500' : ''}`}
                required
              />
              {errors.heading && (
                <p className="text-red-500 text-sm mt-1">{errors.heading}</p>
              )}
            </div>

            {/* Sub-Heading */}
            <div>
              <Label htmlFor="subHeading" className="text-lg font-semibold text-gray-900 mb-2 block">
                Subtitle
              </Label>
              <Input
                id="subHeading"
                type="text"
                value={formData.subHeading}
                onChange={(e) => handleInputChange("subHeading", e.target.value)}
                placeholder="Add a subtitle (optional)"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                A brief description that appears below your title
              </p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-lg font-semibold text-gray-900 mb-2 block">
                Story Content *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Tell your story..."
                className={`w-full min-h-[300px] resize-y text-base leading-relaxed ${errors.description ? 'border-red-500' : ''}`}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length} characters
              </p>
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <Label className="text-lg font-semibold text-gray-900 block">
              Author Information
            </Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="author" className="text-sm font-medium text-gray-700 mb-2 block">
                  Author Name
                </Label>
                <Input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Author name"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="authorImage" className="text-sm font-medium text-gray-700 mb-2 block">
                  Author Image URL
                </Label>
                <Input
                  id="authorImage"
                  type="url"
                  value={formData.authorImage}
                  onChange={(e) => handleInputChange("authorImage", e.target.value)}
                  placeholder="https://example.com/author-image.jpg"
                  className="w-full"
                />
              </div>
            </div>

            {/* Author Preview */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <img
                src={formData.authorImage}
                alt={formData.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/48x48/cccccc/666666?text=User";
                }}
              />
              <div>
                <p className="font-medium text-gray-900">{formData.author}</p>
                <p className="text-sm text-gray-500">Author preview</p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Label className="text-lg font-semibold text-gray-900 mb-4 block">
              Story Settings
            </Label>
            
            <div className="flex items-center space-x-3">
              <input
                id="isFavorite"
                type="checkbox"
                checked={formData.isFavorite}
                onChange={(e) => handleInputChange("isFavorite", e.target.checked)}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
              />
              <Label htmlFor="isFavorite" className="text-sm font-medium text-gray-700">
                Mark as featured story
              </Label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Featured stories appear prominently in your profile
            </p>
          </div>

          {/* Mobile Submit Buttons */}
          <div className="md:hidden flex flex-col space-y-3 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {loading || isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{blog ? "Updating..." : "Publishing..."}</span>
                </div>
              ) : (
                blog ? "Update Story" : "Publish Story"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting || loading}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

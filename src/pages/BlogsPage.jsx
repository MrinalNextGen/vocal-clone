import React from "react";
import { Button } from "../components/ui/button";
import { Heart, Edit, Trash2 } from "lucide-react";

export default function BlogsPage({ 
  blogs, 
  onEdit, 
  onDelete, 
  onToggleFavorite, 
  onAddNew, 
  loading, 
  error 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-2 bg-gray-700 rounded-full"></div>
                    <div className="w-0.5 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-0.5 h-4 bg-gray-700 rounded-full"></div>
                    <div className="w-0.5 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-semibold text-black">Vocal</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button className="text-gray-500 hover:text-black text-sm font-medium">Home</button>
                <button className="text-black text-sm font-semibold">Top Stories</button>
                <button className="text-gray-500 hover:text-black text-sm font-medium">Latest Stories</button>
                <button className="text-gray-500 hover:text-black text-sm font-medium">Communities</button>
                <button className="text-gray-500 hover:text-black text-sm font-medium">Challenges</button>
                <button className="text-gray-500 hover:text-black text-sm font-medium">Resources</button>
                <button className="text-gray-500 hover:text-black text-sm font-medium">Vocal+</button>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-black text-sm font-medium">Join</button>
              <button className="text-gray-500 hover:text-black text-sm font-medium">Sign In</button>
              <Button onClick={onAddNew} className="bg-gray-800 text-white hover:bg-gray-900 text-sm px-4 py-2 rounded-md" disabled={loading}>
                Create Story
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left">
            <h1 className="text-6xl font-bold text-black mb-4">Top Stories</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              New stories you'll love, handpicked for you by our team and updated daily.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 mt-4">Loading stories...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600 mb-6">Create your first story to get started!</p>
            <Button onClick={onAddNew} className="bg-gray-800 text-white hover:bg-gray-900">
              Create Your First Story
            </Button>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
                {/* Blog Image */}
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={blog.image || "/placeholder.svg?height=200&width=400"}
                    alt={blog.heading}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=400";
                    }}
                  />
                </div>
                
                {/* Blog Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {blog.heading}
                  </h2>
                  
                  {blog.subHeading && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-1 font-medium">
                      {blog.subHeading}
                    </p>
                  )}
                  
                  <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={blog.authorImage || "/placeholder.svg?height=40&width=40"}
                        alt={blog.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=40&width=40";
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                        <p className="text-xs text-gray-500">{blog.createdAt}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onToggleFavorite(blog.id)}
                        disabled={loading}
                        className={`p-2 rounded-full transition-colors disabled:opacity-50 ${
                          blog.isFavorite 
                            ? 'text-red-500 hover:text-red-600 bg-red-50' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={blog.isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart className={`w-4 h-4 ${blog.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => onEdit(blog)}
                        disabled={loading}
                        className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50"
                        title="Edit story"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => onDelete(blog.id)}
                        disabled={loading}
                        className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

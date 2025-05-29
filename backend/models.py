from datetime import datetime
import json

class Blog:
    """Blog model class to represent a single blog post"""
    
    def __init__(self, id=None, image="", heading="", subHeading="", description="", 
                 author="Current User", authorImage="", isFavorite=False, createdAt=None):
        self.id = id
        self.image = image
        self.heading = heading
        self.subHeading = subHeading
        self.description = description
        self.author = author
        self.authorImage = authorImage or "https://randomuser.me/api/portraits/men/1.jpg"
        self.isFavorite = isFavorite
        self.createdAt = createdAt or datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    def to_dict(self):
        """Convert blog object to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'image': self.image,
            'heading': self.heading,
            'subHeading': self.subHeading,
            'description': self.description,
            'author': self.author,
            'authorImage': self.authorImage,
            'isFavorite': self.isFavorite,
            'createdAt': self.createdAt
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create blog object from dictionary data"""
        return cls(
            id=data.get('id'),
            image=data.get('image', ''),
            heading=data.get('heading', ''),
            subHeading=data.get('subHeading', ''),
            description=data.get('description', ''),
            author=data.get('author', 'Current User'),
            authorImage=data.get('authorImage', ''),
            isFavorite=data.get('isFavorite', False),
            createdAt=data.get('createdAt')
        )
    
    def validate(self):
        """Validate blog data and return list of errors"""
        errors = []
        
        # Check required fields
        if not self.heading or not self.heading.strip():
            errors.append("Heading is required")
        
        if not self.description or not self.description.strip():
            errors.append("Description is required")
        
        # Check minimum length
        if self.description and len(self.description.strip()) < 10:
            errors.append("Description must be at least 10 characters")
        
        # Check maximum length
        if self.heading and len(self.heading.strip()) > 200:
            errors.append("Heading must be less than 200 characters")
        
        if self.description and len(self.description.strip()) > 5000:
            errors.append("Description must be less than 5000 characters")
        
        return errors
    
    def update_from_dict(self, data):
        """Update blog fields from dictionary data"""
        if 'image' in data:
            self.image = data['image']
        if 'heading' in data:
            self.heading = data['heading']
        if 'subHeading' in data:
            self.subHeading = data['subHeading']
        if 'description' in data:
            self.description = data['description']
        if 'author' in data:
            self.author = data['author']
        if 'authorImage' in data:
            self.authorImage = data['authorImage']
        if 'isFavorite' in data:
            self.isFavorite = data['isFavorite']

class BlogManager:
    """Manager class to handle all blog operations"""
    
    def __init__(self):
        self.blogs = []
        self.next_id = 1
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        """Initialize with sample blog data"""
        sample_blogs = [
            {
                "id": 1,
                "image": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
                "heading": "Angelique's Repose",
                "subHeading": "A peaceful moment in nature",
                "description": "Angelique hides quietly in a shrub as bees and birds flit around her. A ladybug climbs up her arm to rest on her shoulder, while butterflies dance around her head. This serene moment captures the harmony between human and nature, showing how we can find peace in the simplest of moments.",
                "author": "Andrea Corwin",
                "authorImage": "https://randomuser.me/api/portraits/women/44.jpg",
                "isFavorite": False,
                "createdAt": "3 days ago in Poets"
            },
            {
                "id": 2,
                "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
                "heading": "A Hack You Can Try To Become a Creative Hero",
                "subHeading": "Unlock your creative potential",
                "description": "I've stopped writing on Vocal. Well, evidentially, I haven't – I'm writing on Vocal right now. Look at me go. The point is, creativity isn't about waiting for inspiration—it's about showing up consistently and doing the work. Here's a simple hack that changed everything for me.",
                "author": "Jamie Jackson",
                "authorImage": "https://randomuser.me/api/portraits/men/32.jpg",
                "isFavorite": True,
                "createdAt": "about 12 hours ago in Art"
            },
            {
                "id": 3,
                "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
                "heading": "My Experience on Vocal",
                "subHeading": "One month milestone",
                "description": "Celebrate good times, come on! 🎉 Today marks a special little milestone: I've officially been on Vocal for one whole month. It's been an incredible journey of discovery, creativity, and community building. Here's what I've learned so far.",
                "author": "Dalma Ubitz",
                "authorImage": "https://randomuser.me/api/portraits/women/22.jpg",
                "isFavorite": False,
                "createdAt": "about 24 hours ago in Journal"
            },
            {
                "id": 4,
                "image": "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=400&q=80",
                "heading": "In Case I Never Fall",
                "subHeading": "A heartfelt message",
                "description": "To My Parents: My voice is sometimes clearer when written. Not tangled in sobs, not silenced by the weight of unshed tears. These words carry the love I struggle to speak aloud, the gratitude that overwhelms me, and the fears that keep me awake at night.",
                "author": "Nicole Fenn",
                "authorImage": "https://randomuser.me/api/portraits/women/12.jpg",
                "isFavorite": False,
                "createdAt": "4 days ago in Poets"
            }
        ]
        
        # Create Blog objects from sample data
        for blog_data in sample_blogs:
            blog = Blog.from_dict(blog_data)
            self.blogs.append(blog)
        
        self.next_id = 5
    
    def get_all_blogs(self):
        """Get all blogs as dictionary list"""
        return [blog.to_dict() for blog in self.blogs]
    
    def get_blog_by_id(self, blog_id):
        """Get a specific blog by ID"""
        for blog in self.blogs:
            if blog.id == blog_id:
                return blog.to_dict()
        return None
    
    def create_blog(self, data):
        """Create a new blog"""
        try:
            # Create new blog object
            blog = Blog.from_dict(data)
            blog.id = self.next_id
            blog.createdAt = "Just now"
            
            # Validate blog data
            errors = blog.validate()
            if errors:
                return None, errors
            
            # Add to blogs list
            self.blogs.append(blog)
            self.next_id += 1
            
            return blog.to_dict(), None
            
        except Exception as e:
            return None, [f"Error creating blog: {str(e)}"]
    
    def update_blog(self, blog_id, data):
        """Update an existing blog"""
        try:
            # Find the blog
            blog_to_update = None
            for blog in self.blogs:
                if blog.id == blog_id:
                    blog_to_update = blog
                    break
            
            if not blog_to_update:
                return None, ["Blog not found"]
            
            # Update blog fields
            blog_to_update.update_from_dict(data)
            
            # Validate updated blog
            errors = blog_to_update.validate()
            if errors:
                return None, errors
            
            return blog_to_update.to_dict(), None
            
        except Exception as e:
            return None, [f"Error updating blog: {str(e)}"]
    
    def delete_blog(self, blog_id):
        """Delete a blog by ID"""
        try:
            for i, blog in enumerate(self.blogs):
                if blog.id == blog_id:
                    deleted_blog = self.blogs.pop(i)
                    return deleted_blog.to_dict()
            return None
            
        except Exception as e:
            print(f"Error deleting blog: {str(e)}")
            return None
    
    def toggle_favorite(self, blog_id):
        """Toggle favorite status of a blog"""
        try:
            for blog in self.blogs:
                if blog.id == blog_id:
                    blog.isFavorite = not blog.isFavorite
                    return blog.to_dict()
            return None
            
        except Exception as e:
            print(f"Error toggling favorite: {str(e)}")
            return None
    
    def get_favorite_blogs(self):
        """Get all favorite blogs"""
        try:
            favorite_blogs = [blog.to_dict() for blog in self.blogs if blog.isFavorite]
            return favorite_blogs
            
        except Exception as e:
            print(f"Error getting favorite blogs: {str(e)}")
            return []
    
    def search_blogs(self, query):
        """Search blogs by heading or description"""
        try:
            query = query.lower().strip()
            matching_blogs = []
            
            for blog in self.blogs:
                if (query in blog.heading.lower() or 
                    query in blog.description.lower() or 
                    query in blog.author.lower()):
                    matching_blogs.append(blog.to_dict())
            
            return matching_blogs
            
        except Exception as e:
            print(f"Error searching blogs: {str(e)}")
            return []
    
    def get_blogs_by_author(self, author):
        """Get all blogs by a specific author"""
        try:
            author_blogs = [blog.to_dict() for blog in self.blogs if blog.author.lower() == author.lower()]
            return author_blogs
            
        except Exception as e:
            print(f"Error getting blogs by author: {str(e)}")
            return []

# Create global blog manager instance
blog_manager = BlogManager()

# Export for easy importing
__all__ = ['Blog', 'BlogManager', 'blog_manager']

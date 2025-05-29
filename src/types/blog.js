// Blog type definition converted from TypeScript
export const createBlog = (data = {}) => ({
  id: data.id || Date.now().toString(),
  image: data.image || "",
  heading: data.heading || "",
  subHeading: data.subHeading || "",
  description: data.description || "",
  author: data.author || "Anonymous",
  authorImage: data.authorImage || "/placeholder.svg?height=40&width=40",
  createdAt: data.createdAt || new Date().toISOString(),
  isFavorite: data.isFavorite || false,
});

// Form data type
export const createFormData = (data = {}) => ({
  image: data.image || "",
  heading: data.heading || "",
  subHeading: data.subHeading || "",
  description: data.description || "",
  author: data.author || "Current User",
  authorImage: data.authorImage || "/placeholder.svg?height=40&width=40",
  isFavorite: data.isFavorite || false,
});

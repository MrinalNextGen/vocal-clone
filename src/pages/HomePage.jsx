const blogs = [
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "To Speak of Secret Futures",
    subheading: "A journey into the unknown",
    description: "A poetic exploration of destiny and hope, blending the real and the imagined.",
    author: "Aditi Kalyan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    meta: "4 days ago in Poets"
  },
     
];

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={blog.image} alt={blog.title} className="rounded-lg w-full h-40 object-cover mb-4" />
      <h2 className="font-bold text-lg mb-1">{blog.title}</h2>
      <div className="text-gray-500 text-sm mb-1">{blog.subheading}</div>
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{blog.description}</p>
      <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
        <img src={blog.avatar} alt={blog.author} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <div className="text-sm font-medium">{blog.author}</div>
          <div className="text-xs text-gray-400">{blog.meta}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center space-x-8">
          <span className="font-bold text-2xl flex items-center"><span className="mr-2">🎵</span>Vocal</span>
          <a href="#" className="text-gray-700 font-medium">Home</a>
          <a href="#" className="text-black font-bold border-b-2 border-black">Top Stories</a>
          <a href="#" className="text-gray-700 font-medium">Latest Stories</a>
          <a href="#" className="text-gray-700 font-medium">Communities</a>
          <a href="#" className="text-gray-700 font-medium">Challenges</a>
          <a href="#" className="text-gray-700 font-medium">Resources</a>
          <a href="#" className="text-gray-700 font-medium">Vocal+</a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xl">🔍</span>
          <a href="#" className="text-gray-700">Join</a>
          <a href="#" className="text-gray-700">Sign In</a>
          <button className="bg-black text-white px-4 py-2 rounded ml-2">Create Story</button>
        </div>
      </nav>
      {/* Top Stories */}
      <div className="px-8 pt-8">
        <h1 className="text-4xl font-bold mb-2">Top Stories</h1>
        <p className="text-gray-500 mb-8">New stories you’ll love, handpicked for you by our team and updated daily.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, idx) => <BlogCard blog={blog} key={idx} />)}
        </div>
      </div>
    </div>
  );
}

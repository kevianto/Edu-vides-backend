import Blog from "../models/Blog.js";

// ✅ Add a Blog (with Image Upload)
export const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Handle both file upload and URL

    const newBlog = new Blog({
      title,
      description,
      author: req.user.id, // Save the logged-in user's ID
      image, // Store image URL
    });

    await newBlog.save();
    return res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error(error); // Debugging
    return res.status(500).json({ success: false, message: "Error in adding blog" });
  }
};

// ✅ Fetch All Blogs (Public Access)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name -_id")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't retrieve blogs" });
  }
};

// ✅ Fetch Only User-Created Blogs (Authentication Required)
export const getUserBlogs = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    const userBlogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, blogs: userBlogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't retrieve user blogs" });
  }
};

// ✅ Update a Blog (Only by the Author)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    // Ensure the logged-in user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this blog" });
    }

    const image = req.file ? req.file.path : req.body.image || blog.image; // Keep old image if none provided

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true }
    );

    return res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't update blog" });
  }
};

// ✅ Delete a Blog (Only by the Author)
export const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    // Ensure the logged-in user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't delete blog" });
  }
};

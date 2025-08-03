const Blog = require('./schema');

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    // const blog = new Blog({ title, description, tags });
    const blog = new Blog({
      title,
      description,
      tags,
      user: req.user.id, // Attach user ID from JWT
    });
    await blog.save();

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// // Get all blogs (basic, without filters for now)
// exports.getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: blogs });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

exports.getBlogs = async (req, res) => {
  try {
    const { tag, search, sort = 'desc', page = 1, limit = 10 } = req.query;

    const query = {};

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = sort === 'asc' ? 1 : -1;

    // Convert to numbers
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    // Get total count for pagination metadata
    const total = await Blog.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(total / limitNumber);

    const blogs = await Blog.find(query)
      .sort({ createdAt: sortOrder })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      count: blogs.length,
      page: pageNumber,
      totalPages,
      totalBlogs: total,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("comments");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updatedBlog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await blog.remove();

    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

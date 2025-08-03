const Comment = require('./schema');
const Blog = require('../blog/schema');

// Add a comment
exports.createComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // const comment = new Comment({ blogId, text });
    const comment = new Comment({
      text,
      blog: blogId,
      user: req.user.id,
    });
    await comment.save();

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get comments for a specific blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true, runValidators: true }
    );
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

    // Optionally: remove from blog.comments[] if needed
    await Blog.updateOne(
      { _id: comment.blogId },
      { $pull: { comments: comment._id } }
    );

    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

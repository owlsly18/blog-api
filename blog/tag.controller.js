// blog/tag.controller.js
const Blog = require('./schema');

// Get all unique tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tags");
    res.json({ success: true, tags });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

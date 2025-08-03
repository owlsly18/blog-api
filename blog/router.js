const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('./controller');

const {getAllTags} = require('./tag.controller');

const protect = require('../middleware/auth'); 
const validate = require('../middleware/validate');
const { createBlogSchema, updateBlogSchema } = require('../validators/blogValidator');

// Base route: /api/blogs
router.post('/', protect, validate(createBlogSchema) , createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', protect, validate(updateBlogSchema), updateBlog);
router.delete('/:id', protect, deleteBlog);

// Tag route
router.get('/tags/all', getAllTags); // e.g. /api/blogs/tags/all

module.exports = router;

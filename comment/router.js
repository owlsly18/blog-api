const express = require('express');
const router = express.Router();
const {
  createComment,
  getAllComments,
  getCommentsByBlog,
  getCommentById,
  updateComment,
  deleteComment,
} = require('./controller');

const protect = require('../middleware/auth'); 
const validate = require('../middleware/validate');
const { createCommentSchema, updateCommentSchema } = require('../validators/commentValidator');

// Base: /api/comments
router.post('/', protect, validate(createCommentSchema), createComment);
router.get('/', getAllComments);
router.get('/blog/:blogId', getCommentsByBlog);
router.get('/:id', getCommentById);
router.put('/:id', protect, validate(updateCommentSchema), updateComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;

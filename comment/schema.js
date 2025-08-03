const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);

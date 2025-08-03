const Joi = require('joi');

const createCommentSchema = Joi.object({
  blogId: Joi.string().hex().length(24).required(),  // MongoDB ObjectId validation
  text: Joi.string().min(1).max(500).required(),
});

const updateCommentSchema = Joi.object({
  text: Joi.string().min(1).max(500).required(),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};

const Joi = require('joi');

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};

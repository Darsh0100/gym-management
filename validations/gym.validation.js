const Joi = require("joi");

exports.createGymSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  description: Joi.string().optional(),
  facilities: Joi.array().items(Joi.string()),
});

exports.updateGymSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  description: Joi.string().optional(),
  facilities: Joi.array().items(Joi.string()).optional(),
}).min(1);

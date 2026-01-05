const Joi = require("joi");

exports.createPlanSchema = Joi.object({
  gymId: Joi.string().required(),
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  duration: Joi.number().positive().required(),
  benefits: Joi.array().items(Joi.string()),
});

exports.updatePlanSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  price: Joi.number().positive().optional(),
  duration: Joi.number().positive().optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
}).min(1); // 👈 at least one field required

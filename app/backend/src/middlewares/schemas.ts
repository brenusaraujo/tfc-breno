import Joi = require('joi');

const MSG_SOME_REQUIRED = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': MSG_SOME_REQUIRED,
    'any.required': MSG_SOME_REQUIRED,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': MSG_SOME_REQUIRED,
    'any.required': MSG_SOME_REQUIRED,
  }),
});

export default {
  loginSchema,
};

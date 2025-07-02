import Joi from "joi";

const register = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().required().messages({
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

const sendOtp = Joi.object({
  phone_number: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
});

export default { register , sendOtp };
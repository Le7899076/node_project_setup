import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required().messages({
    'string.empty': 'title is required',
    'any.required': 'title is required',
  }),
  body: Joi.string().required().messages({
    'string.empty': 'body is required',
    'any.required': 'body is required',
  }),
});

const update = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export default { create, update };
import Joi from "joi";
export const signup = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const loginValidate = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

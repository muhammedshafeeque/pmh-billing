import Joi from "joi";
export const AccountValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

import Joi from "joi";
export const RackValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    section: Joi.string().required(),
  }),
};
export const SectionValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
  }),
};

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
export const StockValidation = {
  body: Joi.object().keys({
    item:Joi.string().required(),
    rack:Joi.string().required(),
    purchaseRate:Joi.string().required(),
    purchasedQouantity:Joi.string().required(),
    status:Joi.string().required()
  }),
};

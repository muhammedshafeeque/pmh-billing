import Joi from "joi";
export const AccountValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
export const invoiceValidation={
  body:Joi.object().keys({
    customer:Joi.string().required(),
    items:Joi.array().items(Joi.object().keys({
      item:Joi.string().required(),
      quantity:Joi.string().required(),
      sellingUnit:Joi.string().required(),
    })),
    invoiceNumber:Joi.string().required(),
    date:Joi.date().required(),
    discount:Joi.number().required()
  })
}

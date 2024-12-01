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
      quantity:Joi.number().required(),
      unit:Joi.string().required(),
      stock:Joi.string().required()
    })),
    invoiceNumber:Joi.string().required(),
    date:Joi.date().required(),
    discount:Joi.number().required()
  })
}
export const collectionValidation={
  body:Joi.object().keys({
    customerId:Joi.string().required(),
    amount:Joi.number().required(),
    method:Joi.string().required()
  })
}

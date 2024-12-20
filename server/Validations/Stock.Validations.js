import Joi from "joi";
export const RackValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    section: Joi.string().required(),
    description: Joi.string(),
  }),
};
export const SectionValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string(),
  }),
};
export const CateGoryValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string(),
  }),
};
export const StockValidation = {
  body: Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        item: Joi.string().required(),
        purchaseRate: Joi.number().required(),
        purchasedQuantity: Joi.number().required(),
        sellablePricePerUnit: Joi.number().required(),
        purchasedRatePerUnit:Joi.number().required(),
        purchasedUnit:Joi.string().required(),
        expiry: Joi.date(),
        status: Joi.string(),
        purchaseDate: Joi.date(), 
      })
    ),
    vendor: Joi.string().required(),
    payableAmount:Joi.number().required(),
    billAmount:Joi.number().required(),
    payedAmount:Joi.number().required(),
    account:Joi.string()
  }),
};
export const itemValidations = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      code: Joi.string().required(),
      racks: Joi.array().items(Joi.string()).required(),
      unit: Joi.string().required(),
      totalStock: Joi.number().required(),
      category: Joi.string(),
      remark: Joi.string(),
    })
  ),
};

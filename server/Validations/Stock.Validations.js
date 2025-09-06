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
export const StockUpdateValidation = {
  body: Joi.object().keys({
    item: Joi.string().optional(),
    purchaseRate: Joi.number().optional(),
    purchasedQuantity: Joi.number().optional(),
    sellablePricePerUnit: Joi.number().optional(),
    purchasedRatePerUnit: Joi.number().optional(),
    purchasedUnit: Joi.string().optional(),
    ExpiryDate: Joi.string().optional(),
    status: Joi.string().optional(),
    purchaseDate: Joi.date().optional(),
    vendor: Joi.string().optional(),
    quantity: Joi.number().optional(),
    wastage: Joi.number().optional(),
    profit: Joi.number().optional(),
    ProfitPercentage: Joi.number().optional(),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
export const itemValidations = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      code: Joi.string().required(),
      racks: Joi.array().items(Joi.string()).required(),
      unit: Joi.string().required(),
      category: Joi.string(),
      remark: Joi.string().allow('', null).optional(),
    })
  ),
};

export const itemUpdateValidations = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    racks: Joi.array().items(Joi.string()).required(),
    unit: Joi.string().required(),
    category: Joi.string(),
    remark: Joi.string().allow('', null).optional(),
  }),
};

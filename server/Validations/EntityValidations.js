import Joi from "joi";
export const vendorValidation = Joi.object({
  name: Joi.string().trim().required(),
  contactEmail: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Please provide a valid email address",
  }),
  contactPhone: Joi.number().required(),
  street: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  state: Joi.string().trim().optional(),
  zipCode: Joi.number().optional(),
  country: Joi.string().trim().optional(),
  accountBallance: Joi.number().optional(),
});

export const customerValidation = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().messages({
    "string.email": "Please provide a valid email address",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)

    .messages({
      "string.pattern.base": "Please provide a valid phone number",
    }),
  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    zipCode: Joi.string()
      .trim()
      .pattern(/^\d{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "Please provide a valid zip code",
      }),
    country: Joi.string().trim().optional(),
  }).optional(),
  dateOfBirth: Joi.date().optional(),
});
export const createCustomerFromInvoice = Joi.object({
  name: Joi.string().required(),
  mobile: Joi.string().required(),
  address: Joi.string().optional(),
});

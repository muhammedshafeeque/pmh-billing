import Joi from "joi";

export const genSequenceValidation={
    body:Joi.object({
        type:Joi.string().required()
    })
}
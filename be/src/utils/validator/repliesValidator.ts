import * as Joi from "joi"

export const createReplySchema = Joi.object({
    content: Joi.string().max(250),
    image: Joi.string().allow(null),
    // thread: Joi.number().required(),
    // user: Joi.number().required(),
})
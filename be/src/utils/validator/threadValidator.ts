import * as Joi from 'joi'

export const createThreadSchema = Joi.object({
    content: Joi.string().max(225).required(),
    image: Joi.string().allow(null),
})

export const updateThreadSchema = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
});
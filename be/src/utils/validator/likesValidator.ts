import * as Joi from "joi"

export const createLikeSchema = Joi.object({
  threadId: Joi.number().required(),
  userId: Joi.number().required(),
});

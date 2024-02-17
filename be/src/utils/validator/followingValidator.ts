import * as Joi from "joi";

export const followingSchema = Joi.object({
  followedUserId: Joi.number().required(),
  follower: Joi.number().required(),
});
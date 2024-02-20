import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";
import { createReplySchema } from "../utils/validator/repliesValidator";

export default new class RepliesController {
    async createReply(req: Request, res: Response) {
        try {
            await RepliesService.createReply(req, res)
        } catch (error) {
            throw error
        }
    }

    async getOneReplies(req: Request, res: Response) {
        try {
            await RepliesService.getOneReplies(req, res)
        } catch (error) {
            throw error
        }
    }

    async deleteReply(req: Request, res: Response) {
        try {
            await RepliesService.deleteReply(req, res)
        } catch (error) {
            throw error
        }
    }

    async getAllReplies(req: Request, res: Response) {
        try {
            await RepliesService.getAllReplies(req, res)
        } catch (error) {
            throw error
        }
    }
}
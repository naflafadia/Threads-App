import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

export default new class RepliesController {
    async createReply(req: Request, res: Response) {
        await RepliesService.createReply(req, res)
    }

    async createRepliesForThread(req: Request, res: Response) {
        await RepliesService.getRepliesForThread(req, res)
    }
}
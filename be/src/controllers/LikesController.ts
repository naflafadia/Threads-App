import { Request, Response } from "express";
import LikesService from "../services/LikesService";

export default new class LikesController {
    async createLike(req: Request, res: Response) {
        try {
            await LikesService.createLike(req, res)
        } catch (error) {
            throw error
        }
    }

    async getLikesForThread(req: Request, res: Response) {
        await LikesService.getLikesForThread(req, res);
    }

    async unLike(req: Request, res: Response) {
        try {
            await LikesService.unLike(req, res)
        } catch (error) {
            throw error
        }
    }

    async getAllLike(req: Request, res: Response) {
        try {
            await LikesService.getAllLikes(req, res)
        } catch (error) {
            throw error
        }
    }
}

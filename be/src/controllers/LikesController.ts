import { Request, Response } from "express";
import LikesService from "../services/LikesService";

export default new class LikesController {
    async createLike(req: Request, res: Response) {
        await LikesService.createLike(req, res);
    }

    async getLikesForThread(req: Request, res: Response) {
        await LikesService.getLikesForThread(req, res);
    }
}

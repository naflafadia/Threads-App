import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";

export default new class ThreadsController {
    findAllThreads(req: Request, res: Response) {
        ThreadsService.findAllThreads(req, res)
    }

    findOneThread(req: Request, res: Response) {
        ThreadsService.findOneThread(req, res)
    }

    createThread(req: Request, res: Response) {
        ThreadsService.createThread(req, res)
    }
}
import { Request, Response } from "express";
import threadsService from "../services/ThreadsService";

export default new (class ThreadsController {
    async getAllThreads(req: Request, res: Response) {
        try {
            const threads = await threadsService.getAllThreads();
            return res.status(200).json({ status: "success", data: { threads } });
        } catch (error) {
            
            console.error("Error getting all threads:", error);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    async getOneThread(req: Request, res: Response) {
        try {
            const threadId = parseInt(req.params.id);
            const thread = await threadsService.getOneThread(threadId);
            return res.status(200).json({ status: "success", data: { thread } });
        } catch (error) {
            console.error("Error getting one thread:", error);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }
})();

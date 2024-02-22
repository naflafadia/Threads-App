import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";

export default new class ThreadsController {
    async findAllThreads(req: Request, res: Response) {
        try {
          const response = await ThreadsService.findAllThreads();
          return res.status(200).json(response);
        } catch (error) {
          console.error("Error getting all Thread:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
      }

      async findOneThread(req: Request, res: Response) {
        try {
          const id = parseInt(req.params.id, 10);
          const response = await ThreadsService.findOneThread(id);
          return res.status(200).json(response);
        } catch (error) {
          console.error("Error getting a Thread:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
      }

    async createThread(req: Request, res: Response) {
        try {
          await ThreadsService.createThread(req, res)
        } catch (error) {
          throw error
        }
    }

    async deleteThread(req: Request, res: Response) {
      try {
        await ThreadsService.deleteThread(req, res)
      } catch (error) {
        throw error
      }
    }

}

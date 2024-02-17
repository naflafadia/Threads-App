import { Repository } from "typeorm";
import { Replies } from "../entities/Replies"
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Threads } from "../entities/Threads";
import * as jwt from "jsonwebtoken"
import { log } from "console";

export default new class RepliesService {
    private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies)

    async createReply(req: Request, res: Response): Promise<Response> {
        try {
            const { content, threadId } = req.body;
            const loginSession = res.locals.loginSession;
    
            if (!content || !threadId) {
                return res.status(400).json({ message: "Content and threadId are required" });
            }
    
            const reply = this.RepliesRepository.create({
                content: content,
                thread: { id: threadId },
                user: { id: loginSession.user.id }
            });
    
            const saveReply = await this.RepliesRepository.save(reply);
    
            return res.status(201).json({
                message: "Reply created successfully",
                data: saveReply
            });
        } catch(error) {
            console.error("Error during reply creation:", error);
            return res.status(500).json({ message: "Failed to create reply" });
        }
    }
    
    async getRepliesForThread(req: Request, res: Response): Promise<Response> {
        try {
            const id:  number = Number(req.params.id);
            const replies = await this.RepliesRepository.findOne({
                where: { id: id },
                relations: ["user", "thread"],
            });
    
            if (!replies) {
                // Jika replies tidak ditemukan, kembalikan respons dengan pesan "id not found"
                return res.status(404).json({ message: "Id not found" });
            }
    
            return res.status(200).json({
                status: "success",
                data: replies,
            });
        } catch(error) {
            console.error("Error during retrieval of replies:", error);
            return res.status(500).json({ message: "Failed to retrieve replies" });
        }
    }
}
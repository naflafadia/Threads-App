import { Repository } from "typeorm";
import { Likes } from "../entities/Likes"
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Threads } from "../entities/Threads";

export default new class LikesService {
    private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

    async createLike(req: Request, res: Response): Promise<Response> {
        try {
            const { threadId, userId } = req.body;

            // Membuat like
            const like = this.LikesRepository.create({
                thread: { id: threadId },
                user: { id: userId }
            });

            // Menyimpan like
            const savedLike = await this.LikesRepository.save(like);

            // Mengembalikan respons
            return res.status(201).json({
                message: "Like created successfully",
                data: savedLike
            });
        } catch(error) {
            console.error("Error during like creation:", error);
            return res.status(500).json({ message: "Failed to create like" });
        }
    }

    async getLikesForThread(req: Request, res: Response): Promise<Response> {
        try {
            const threadId: number = parseInt(req.params.threadId, 10);

            // Mengambil likes berdasarkan threadId
            const likes = await this.LikesRepository.find({
                where: {
                    thread: {
                        id: threadId,
                    },
                },
                relations: ["user", "thread"]
            });

            // Memformat respons
            const formattedLikes = likes.map(like => ({
                user: { id: like.user.id, userName: like.user.userName },
                thread: { id: like.thread.id, content: like.thread.content, image: like.thread.image },
                id: like.id
            }));

            // Mengembalikan respons
            return res.status(200).json({
                message: "Success",
                data: formattedLikes
            });
        } catch(error) {
            console.error("Error during retrieval of likes:", error);
            return res.status(500).json({ message: "Failed to retrieve likes" });
        }
    }
}

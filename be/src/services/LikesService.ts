import { CommandStartedEvent, Repository } from "typeorm";
import { Likes } from "../entities/Likes"
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Threads } from "../entities/Threads";

export default new class LikesService {
    private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);
    private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads)

    async createLike(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id
            const threadId = parseInt(req.params.id, 10);

            const checkThrad = await this.ThreadRepository.findOne({
                where: {id: threadId}
            })

            if(!checkThrad) {
                return res.status(404).json({message: "thread not found"})
            }

            const like = this.LikesRepository.create({
                user: userId  ,
                thread: checkThrad,
            })

            const response = await this.LikesRepository.save(like)
            return res.status(200).json({message: "succes like this thread", data: response})
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

    async getAllLikes(req: Request, res: Response) : Promise<Response> {
        try {
           const response = await this.LikesRepository.find({
            relations: ["user", "thread"],
            select: {
                user: {
                    id: true,
                    fullName: true,
                    userName: true
                },
                thread: {
                    id: true,
                    content: true
                }
            }
           })

           return res.status(200).json({message: "succes geting all like", data: response})
        } catch (error) {
            return res.status(500).json({message: "error while geting all like"})
        }
    }

    async unLike(req: Request, res: Response) : Promise<Response> {
        try {
            const thread =  parseInt(req.params.id, 10);
            const userId = res.locals.loginSession.user.id
            
            const checkLikes = await this.LikesRepository.findOne({
                where: {
                    user: {id: userId},
                    thread: {id: thread}
                }
            })

            if(!checkLikes) {
                return res.status(400).json({message: "not yet like this thread"})
            }

            const response = await this.LikesRepository.delete(checkLikes)
            return res.status(200).json({message: "success unlike this thread"})
        } catch (error) {
            return res.status(500).json({message: "error while unlike this thread"})
        }
    }

}

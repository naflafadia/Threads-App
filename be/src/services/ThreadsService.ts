import { Threads } from "../entities/Threads";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema } from "../utils/validator/threadValidator";
import cloudinary from "../libs/cloudinary";
import { equal } from "joi";

export default new class ThreadsService {
    private readonly ThreadRepository : Repository <Threads> = AppDataSource.getRepository(Threads)

    async findAllThreads (req: Request, res: Response) {
        try {
            const response = await this.ThreadRepository.find()

            return res.status(200).json({
                message: "get all threads",
                data: response
            })
        } catch (error) {
            return res.status(500).json({message: "server error while get threads"})
        }
    }

    // async findOneThread(req: Request, res: Response) {
    //     try {
    //         const id: number = Number(req.params.id);
    //         const threadDetails = await this.ThreadRepository.findOne({
    //             where: {id},
    //             relations: ["user", "replies"]});
    
    //         if (threadDetails) {
    //             const responseData = {
    //                 id: threadDetails.id,
    //                 content: threadDetails.content,
    //                 user: {
    //                     id: threadDetails.user.id,
    //                     userName: threadDetails.user.userName,
    //                     fullName: threadDetails.user.fullName,
    //                     profil_picture: threadDetails.user.profil_picture,
    //                 },
    //                 postedAt: threadDetails.postedAt.toISOString(),
    //                 likes: threadDetails.likes,
    //                 replies: threadDetails.replies ? threadDetails.replies.length : 0, // Assuming replies is an array
    //             };
    
    //             return res.status(200).json({ status: "success", data: responseData });
    //         } else {
    //             return res.status(404).json({ message: "Thread not found!" });
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         return res.status(500).json({ message: "Error" });
    //     }
    // }

    async findOneThread(req: Request, res: Response) {
        try {
            const id: number = Number(req.query.thread_id);
            const threadDetails = await this.ThreadRepository.findOne({
                where: { id },
                relations: ["user", "replies", "replies.user"],
            });

            console.log("ini thread", threadDetails)
    
            if (!threadDetails) {
                return res.status(404).json({ message: "Thread not found!" });
            }
    
            const formattedReplies = threadDetails.replies.map(reply => ({
                id: reply.id,
                content: reply.content,
                user: {
                    id: reply.user.id,
                    username: reply.user.userName,
                    name: reply.user.fullName,
                    profile_picture: reply.user.profil_picture,
                },
                // created_at: reply.created_at.toISOString(),
            }));
    
            const responseData = {
                id: threadDetails.id,
                content: threadDetails.content,
                user: {
                    id: threadDetails.user.id,
                    username: threadDetails.user.userName,
                    name: threadDetails.user.fullName,
                    profile_picture: threadDetails.user.profil_picture,
                },
                postedAt: threadDetails.postedAt.toISOString(),
                likes: threadDetails.likes,
                replies: formattedReplies,
            };
    
            return res.status(200).json({ status: "success", data: responseData });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: "Error" });
        }
    }
    
    async createThread(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession
            const image = res.locals.filename
            console.log("ini gambar", image)
            const data = this.ThreadRepository.create({
                content: req.body.content,
                image: image || null,
            })

            const { error, value } = createThreadSchema.validate(data);
            if(error) return res.status(400).json(error.details[0].message)

            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.image)

            const thread = {
                ...value,
                image: cloudinaryRes.secure_url,
                user: {
                    id: userId.user.id
                }
            }
              console.log("ini adalah", thread)
        
              const insertData = await this.ThreadRepository.save(thread)
              return res.status(200).json({
                message: "success create thread",
                insertData: insertData,
              })
        } catch(error) {
            console.error("Error creating thread:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
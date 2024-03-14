import { Repository } from "typeorm";
import { Replies } from "../entities/Replies"
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import { createThreadSchema } from "../utils/validator/threadValidator";
import { threadId } from "worker_threads";
import { log } from "console";

export default new class RepliesService {
    private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies)

    async createReply(req: Request, res: Response) : Promise<Response> {
        try {
            const threadId: number = parseInt(req.params.id,10);
            const userId = res.locals.loginSession
            const content = req.body.content
            let image =  null

            if(req.file) {
                image = res.locals.filename
            }
                
            const {error, value} = createThreadSchema.validate({content, image})
            if(error) return res.status(400).json(error.details[0].message)
                
            let isCloudinary = null
            if(image != null ) {
                cloudinary.upload()
                const cloudinaryRes = await cloudinary.destination(value.image)
                isCloudinary = cloudinaryRes.secure_url
            }

            const data = this.RepliesRepository.create({
                content: req.body.content,
                image : isCloudinary,
                user: {
                    id: userId.user.id
                },
                thread: {
                    id: threadId
                }
            })

                // const replyRes = ({
                //     ...value,
                //     image,
                //     user: {
                //         id: userId.user.id
                //     },
                //     thread: {
                //         id: threadId
                //     }
                // })
            console.log(image, 'imageee');
            console.log(isCloudinary, 'cloudy');
            
            
            const newReply = await this.RepliesRepository.save(data)
            return res.status(200).json({message: "succes create reply", data: newReply})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "interal server error"})
        }
    }

    async getOneReplies(req: Request, res: Response): Promise<Response> {
        try {
            const id:  number = Number(req.params.id);
            const replies = await this.RepliesRepository.findOne({
                where: { id: id },
                relations: ["user", "thread"],
            });
    
            if (!replies) {
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

    async deleteReply(req: Request, res: Response) : Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10)
            if (isNaN(id)) {
                return res.json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type integer"
                });
            }

            const response = await this.RepliesRepository.delete(id)

            return res.status(200).json({message: "succes deleting reply", data: response})
        } catch (error) {
            return res.status(200).json({message: "error while deleting reply"})
        }
    }

    async getAllReplies(req: Request, res: Response) : Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const response = await this.RepliesRepository.find({
                where: { 
                    thread: { id : id, } },
                relations: ["user"],
                select: {
                    user: {
                      id: true,
                      userName: true,
                      fullName: true,
                      profil_picture: true,
                    },
                    thread: {
                        id: true,
                        content: true,
                    }
                  },
            })


            return res.status(200).json({message: "success geting all reply", data: response})

        } catch (error) {
            
            return res.status(500).json({message: "error while geting reply"})
        }
    }
}
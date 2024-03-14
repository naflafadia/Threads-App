import { Threads } from "../entities/Threads";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema } from "../utils/validator/threadValidator";
import cloudinary from "../libs/cloudinary";
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale'; 

export default new class ThreadsService {
    private readonly ThreadRepository : Repository <Threads> = AppDataSource.getRepository(Threads)

    async findAllThreads(): Promise<object | string> {
        try {
          const response = await this.ThreadRepository.createQueryBuilder("threads")
            .leftJoin("threads.user", "user")
            .leftJoin("threads.likes", "likes")
            .leftJoin("threads.replies", "replies")
            .addSelect(['user.userName', 'user.fullName'])
            .loadRelationCountAndMap("threads.likesCount", "threads.likes")
            .loadRelationCountAndMap("threads.replyCount", "threads.replies").orderBy({
              "threads.id" : "DESC"
            })
            .getMany();

            response.forEach(thread => {
              const formattedDate = format(new Date(thread.postedAt), 'dd MMMM, yyyy', { locale: idLocale });
              thread.postedAt = new Date(formattedDate);
          });

          return {
            message: "success getting all Threads",
            data: response,
          };
        } catch (error) {
          return `message: ${error}`;
        }
      }

    async findOneThread(id: number): Promise<object | string> {
        try {

          const response = await this.ThreadRepository.createQueryBuilder("threads")
          .leftJoin("threads.user", "user")
          .leftJoin("threads.likes", "likes")
          .leftJoin("threads.replies", "replies")
          .addSelect(['user.userName', 'user.fullName'])
          .loadRelationCountAndMap("threads.likesCount", "threads.likes")
          .loadRelationCountAndMap("threads.replyCount", "threads.replies").orderBy({
            "threads.id" : "DESC"
          })
          .where('threads.id=:id', {id})
          .getOne();
          // const response = await this.ThreadRepository.findOne({
          //   where: { id },
          // });

          const formattedDate = format(new Date(response.postedAt), 'dd MMMM, yyyy', { locale: idLocale });
          response.postedAt = new Date(formattedDate);


          return {
            message: "success getting a Thread",
            data: response,
          };
        } catch (error) {
          return "message: something error while getting a Thread";
        }
      }
    
    async createThread(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession
            const content = req.body.content            
            let image = null

            if(req.file) {
              image = res.locals.filename
            }
            
            const { error, value } = createThreadSchema.validate({content, image});
            if(error) return res.status(400).json(error.details[0].message)
            
            let isCloudinary = null
            if(image != null ) {
              cloudinary.upload()
              const cloudinaryRes = await cloudinary.destination(value.image)
              isCloudinary = cloudinaryRes.secure_url
            }
            
            const data = this.ThreadRepository.create({
                image: isCloudinary,
                content: value.content,
                user: {
                  id: userId.user.id
                }
            })
            // const thread = {
            //     ...value,
            //     image: ,
            //     user: {
            //         id: userId.user.id
            //     }
            // }
              // console.log("ini adalah", thread)
        
              const insertData = await this.ThreadRepository.save(data)
              return res.status(200).json({
                message: "success create thread",
                insertData: insertData,
              })
        } catch(error) {
            console.error("Error creating thread:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    // async createThread(req: Request, res: Response) {
    //     try {
    //         const userId = res.locals.loginSession
    //         const image = res.locals.filename
    //         const data = this.ThreadRepository.create({
    //             content: req.body.content,
    //             image: image || null,
    //         })

    //         const { error, value } = createThreadSchema.validate(data);
    //         if(error) return res.status(400).json(error.details[0].message)

    //         cloudinary.upload()
    //         const cloudinaryRes = await cloudinary.destination(value.image)

    //         const thread = {
    //             ...value,
    //             image: cloudinaryRes.secure_url,
    //             user: {
    //                 id: userId.user.id
    //             }
    //         }
    //           console.log("ini adalah", thread)
        
    //           const insertData = await this.ThreadRepository.save(thread)
    //           return res.status(200).json({
    //             message: "success create thread",
    //             insertData: insertData,
    //           })
    //     } catch(error) {
    //         console.error("Error creating thread:", error);
    //         return res.status(500).json({ message: "Internal server error", error: error.message });
    //     }
    // }

    async deleteThread(req: Request, res: Response): Promise<Response> {
      try {
        const id: number = parseInt(req.params.id,10);
        const response = await this.ThreadRepository.delete(id);
  
        return res
          .status(200)
          .json({ message: "succes deleting thread", data: response });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error while deleting thread" });
      }
    }
}

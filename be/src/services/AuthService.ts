import { Repository  } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User"
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

export default new class AuthService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async findAll(req: Request, res: Response) {
        try {
            const dataResponse = await this.UserRepository.find()
            return res.status(200).json({ message: "Success", data: dataResponse})
        } catch(err) {
            return res.status(500).json({ message: "Error"})
        }
    }

    async login(reqBody: any): Promise<object | string> {
        try {
            const checkEmail = await this.UserRepository.findOne({
                where: {
                    email: reqBody.email
                }
            })
            if (!checkEmail) return `message: ${reqBody.email} not found`;

            const comparePassword = await bcrypt.compare(reqBody.password, checkEmail.password);
            if (!comparePassword) return `message: password not match`;

            const user = {
                id: checkEmail.id,
                email: checkEmail.email
            }

            const token = jwt.sign({user}, "whatever", { expiresIn: "1h" });

            return {
                message: "login success",
                data: token
            }
            
        } catch (error) {
            return "message: something error while login"
        }
    }

    async register(reqBody: any): Promise<object | string> {
        try {
            const checkEmail = await this.UserRepository.count({
                where: {
                    email: reqBody.email
                }
            })
            if(checkEmail > 0) return `message: username ${reqBody.email} already exist`;

            const hashPassword = await bcrypt.hash(reqBody.password, 10);

            const obj = this.UserRepository.create({
                ...reqBody,
                password: hashPassword,
                role: reqBody.role || "ghost",
            })

            const resRegist = await this.UserRepository.save(obj)

            return {
                message: "register success",
                data: resRegist
            }
        }   catch (error) {
                console.log(error)
                return "message: something error while register"
        }
    }
} 
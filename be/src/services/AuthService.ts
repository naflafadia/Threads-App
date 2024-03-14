import { Repository  } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User"
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import { loginSchema } from "../utils/validator/authValidator";

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

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const {error, value} = loginSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            const checkEmail = await this.UserRepository.findOne({
                where: {
                    email: value.email
                },
                relations: ["followers", "following"]
            })
            if (!checkEmail) return res.status(400).json({ error: `Email ${value.email} is not registered` });

            const comparePassword = await bcrypt.compare(
                value.password,
                checkEmail.password);
            if (!comparePassword) return res.json({ message:`password is not match!` });

            const userForToken = {
                id: checkEmail.id,
                email: checkEmail.email,
                userName: checkEmail.userName,
                fullName: checkEmail.fullName,
                profil_picture: checkEmail.profil_picture,
                profil_description: checkEmail.profil_description
            }

            const user = this.UserRepository.create ({
                id: checkEmail.id,
                email: checkEmail.email,
                fullName: checkEmail.fullName,
                userName: checkEmail.userName
            })

            const token = jwt.sign({user}, "whatever", { expiresIn: "5h" });
            res.locals.loginSession = userForToken

            return res.status(200).json ({
                message: "login success",
                token,
                user: {
                    id: checkEmail.id,
                    email: checkEmail.email,
                    fullName: checkEmail.fullName,
                    userName: checkEmail.userName,
                    followers_count: checkEmail.followers.length,
                    following_count: checkEmail.following.length
                }
            })
            
        } catch (error) {
            return res.status(500).json({message: "something error while login"})
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

    async check(req: Request, res: Response) : Promise<Response> {
        try {
            const userLogin = res.locals.loginSession

            const user = await this.UserRepository.findOne({
                where : {
                    id: userLogin.user.id
                },
                relations: ["followers", "following"]
            })

            return res.status(200).json({ message: "Token is valid", user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                userName: user.userName,
                profil_picture: user.profil_picture,
                followers_count: user.followers.length,
                following_count: user.following.length
            }})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
} 
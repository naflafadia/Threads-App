import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../utils/validator/authValidator";
import AuthService from "../services/AuthService";

export default new class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data = req.body
            const {error} = registerSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)

            const response = await AuthService.register(data)
            return res.status(201).json(response)
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    async login(req: Request, res: Response) {
        try {
            await AuthService.login(req, res)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // async findAll(req: Request, res: Response) {
    //     try {
    //         const response = await AuthService.findAll();
    //         return res.status(201).json(response);
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }

    async check(req: Request, res: Response) {
        try {
            await AuthService.check(req, res)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
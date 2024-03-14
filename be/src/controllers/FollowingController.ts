import { Request, Response } from "express";
import FollowService from "../services/FollowingService";

class FollowingController {
    async followUser(req: Request, res: Response) {
        await FollowService.followUser(req, res);
    }

    async unfollowUser(req: Request, res: Response) {
        await FollowService.unfollowUser(req, res);
    }

    async getFollowers(req: Request, res: Response) {
        await FollowService.getFollowers(req, res);
    }

    async getFollowing(req: Request, res: Response) {
        await FollowService.getFollowing(req, res);
    }

    async find(req: Request, res: Response) {
        try {
          const userId = res.locals.loginSession
          const type = (req.query.type ?? "") as string
          const limit = (req.query.limit ?? 0) as number
    
          const followService = await FollowService.find(userId, type, limit)
          return res.status(200).json(followService)
        } catch (error) {
          return res.status(500).json({ error: error.message })
        }
      }
    
}

export default new FollowingController();

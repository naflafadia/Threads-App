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
}

export default new FollowingController();

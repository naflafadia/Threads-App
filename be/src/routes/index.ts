import * as express from "express";
import ThreadsControllers from "../controllers/ThreadsController";
import AuthController from "../controllers/AuthController";
import RepliesController from "../controllers/RepliesController";
import LikesController from "../controllers/LikesController";
import FollowingController from "../controllers/FollowingController";
import authMiddleware from "../middlewares/authMiddleware";
import UploadFile from "../middlewares/UploadFile";

const routes = express.Router()

// Route Thread
routes.get("/threads", ThreadsControllers.findAllThreads)
routes.get("/thread/:id", ThreadsControllers.findOneThread)
routes.post("/thread", authMiddleware.Auth, UploadFile.upload("image"), ThreadsControllers.createThread)

// Route Auth
routes.post("/auth/register", AuthController.register)
routes.post("/auth/login", AuthController.login)

// Route Replies
routes.post("/reply", authMiddleware.Auth, RepliesController.createReply)
routes.get("/reply/:id", RepliesController.createRepliesForThread)

// Route Likes
routes.post("/like", LikesController.createLike);
routes.get("/like/:threadId", LikesController.getLikesForThread);

// Route Following
routes.post("/follow", authMiddleware.Auth, FollowingController.followUser);
routes.delete("/follow", FollowingController.unfollowUser);
routes.get("/followers", authMiddleware.Auth, FollowingController.getFollowers);
routes.get("/following", authMiddleware.Auth, FollowingController.getFollowing);

export default routes
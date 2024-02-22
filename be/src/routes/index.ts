import * as express from "express";
import ThreadsController from "../controllers/ThreadsController";
import AuthController from "../controllers/AuthController";
import RepliesController from "../controllers/RepliesController";
import LikesController from "../controllers/LikesController";
import FollowingController from "../controllers/FollowingController";
import authMiddleware from "../middlewares/authMiddleware";
import UploadFile from "../middlewares/UploadFile";

const routes = express.Router()

// Route Thread
routes.get("/threads", ThreadsController.findAllThreads)
routes.get("/thread/:id", ThreadsController.findOneThread)
routes.post("/thread", authMiddleware.Auth, UploadFile.upload("image"), ThreadsController.createThread)
routes.delete("/thread/:id", authMiddleware.Auth, ThreadsController.deleteThread)

// Route Auth
routes.post("/auth/register", AuthController.register)
routes.post("/auth/login", AuthController.login)

// Route Replies
routes.post("/reply/:id", authMiddleware.Auth, UploadFile.upload("image"), RepliesController.createReply)
routes.get("/reply/:id", RepliesController.getOneReplies)
routes.get("/replies/:id", RepliesController.getAllReplies)
routes.delete("/reply/:id", authMiddleware.Auth, RepliesController.deleteReply)

// Route Likes
routes.post("/like/:id", authMiddleware.Auth, LikesController.createLike);
routes.get("/like/:threadId", LikesController.getLikesForThread);
routes.get("/likes", LikesController.getAllLike);
routes.delete("/like/:id", authMiddleware.Auth, LikesController.unLike);

// Route Following
routes.post("/follow", authMiddleware.Auth, FollowingController.followUser);
routes.delete("/follow/:id", authMiddleware.Auth, FollowingController.unfollowUser);
routes.get("/followers", authMiddleware.Auth, FollowingController.getFollowers);
routes.get("/following", authMiddleware.Auth, FollowingController.getFollowing);

export default routes
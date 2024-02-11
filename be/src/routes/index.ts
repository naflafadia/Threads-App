import * as express from "express";
import ThreadsControllers from "../controllers/ThreadsController";

const routes = express.Router()

routes.get("/thread", ThreadsControllers.getAllThreads)
routes.get("/thread/:id", ThreadsControllers.getOneThread)

export default routes
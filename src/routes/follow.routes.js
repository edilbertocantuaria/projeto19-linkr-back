import { Router } from "express";
import { userFollow, userUnfollow } from "../controllers/follow.controllers.js"

const followRouter = Router();

followRouter.post("/follow/:followedId", userFollow)
followRouter.post("/unfollow/:followedId", userUnfollow)

export default followRouter;
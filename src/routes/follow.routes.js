import { Router } from "express";
import { getFollowersAndUsers, userFollow, userUnfollow } from "../controllers/follow.controllers.js"

const followRouter = Router();

followRouter.post("/follow/:followedId", userFollow)
followRouter.post("/unfollow/:followedId", userUnfollow)
followRouter.get("/followers/:userId", getFollowersAndUsers)

export default followRouter;
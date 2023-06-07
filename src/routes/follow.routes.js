import { Router } from "express";
import { userFollow, userUnfollow, getFollowsUser, getFollowedPosts} from "../controllers/follow.controllers.js"

const followRouter = Router();

followRouter.post("/follow/:followedId", userFollow)
followRouter.post("/unfollow/:followedId", userUnfollow)
followRouter.get("/follow/:followerId", getFollowedPosts)
followRouter.get("/followers/:followerId", getFollowsUser)

export default followRouter;
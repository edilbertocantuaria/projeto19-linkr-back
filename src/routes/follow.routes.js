import { Router } from "express";
import { userFollow, userUnfollow, getFollowersAndUsers, getFollowedPosts} from "../controllers/follow.controllers.js"


const followRouter = Router();

followRouter.post("/follow/:followedId", userFollow)
followRouter.post("/unfollow/:followedId", userUnfollow)
followRouter.get("/followers/:followerId", getFollowersAndUsers)
followRouter.get("/follow/:followerId", getFollowedPosts)


export default followRouter;